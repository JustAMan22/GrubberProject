from flask import Blueprint, jsonify, request, abort
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Restaurant, Review, User, MenuItem, ShoppingCartItem, ShoppingCart
from app.forms.restaurant_form import RestaurantForm
from app.forms.review_form import ReviewForm
from app.forms.menuitem_form import MenuItemForm
from app.forms.shoppingcartitem import ShoppingCartItemForm
from statistics import mean
from base64 import b64encode

restaurant_routes = Blueprint('restaurant', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all restaurants
@restaurant_routes.route("/")
def get_all_restaurants():

    restaurants = Restaurant.query.all()
    results = []
    for restaurant in restaurants:
        id = restaurant.id
        reviews = Review.query.filter(Review.restaurant_id == id)
        ratings = []
        if reviews:
            for review in reviews:
                ratings.append(review.stars)
                if len(ratings) > 0:
                    avgRating = mean(ratings)
                    restaurant.avg_rating = round(avgRating, 2)
        results.append(restaurant.to_dict())
    return results


# Create a restaurant
@restaurant_routes.route("/create", methods=["POST"])
@login_required
def create_reastaurant():
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        restaurant = Restaurant(
            user_id=current_user.id,
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            price_range=form.data['price_range'],
            avg_rating=0,
            preview_image=form.data["preview_image"]
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# View Details of A specific restaurant by Id
@restaurant_routes.route('/<int:id>')
def get_one_restaurant(id):

    restaurant = Restaurant.query.filter(Restaurant.id == id)
    for res in restaurant:
        reviews = Review.query.filter(Review.restaurant_id == id)
        ratings = []
        if reviews:
            for review in reviews:
                ratings.append(review.stars)
                if len(ratings) > 0:
                    avgRating = mean(ratings)
                    res.avg_rating = round(avgRating, 2)
        return res.to_dict()
    return {"errors": "No restaurant found."}


@restaurant_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_one_restaurant(id):

    form = RestaurantForm()

    restaurant = Restaurant.query.get(id)

    if restaurant:
        if restaurant.user_id == current_user.id:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                restaurant.name = form.data['name']
                restaurant.address = form.data['address']
                restaurant.city = form.data['city']
                restaurant.state = form.data['state']
                restaurant.country = form.data['country']
                restaurant.price_range = form.data['price_range']
                restaurant.preview_image = form.data["preview_image"]
                reviews = Review.query.filter(Review.restaurant_id == id)
                ratings = []
                if reviews:
                    for review in reviews:
                        ratings.append(review.stars)
                        if len(ratings) > 0:
                            avgRating = mean(ratings)
                            restaurant.avg_rating = round(avgRating, 2)
                db.session.commit()
                return restaurant.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        abort(401)  # Unauthorized: The user doesn't own this restaurant
    abort(404)  # Not Found: No restaurant found


# Delete a Restaurant
@restaurant_routes.route('<int:id>/delete', methods=['DELETE'])
@login_required
def delete_one_restaurant(id):

    restaurant = Restaurant.query.get(id)
    if restaurant:
        if restaurant.user_id == current_user.id:
            db.session.delete(restaurant)
            db.session.commit()
            return {'message': 'Restaurant successfully deleted.'}
        return {"errors": "You must own the restaurant to complete this action."}, 401
    return {'error': 'No restaurant not found.'}, 404


# View reviews of a specific restaurant
@restaurant_routes.route("/<int:id>/reviews")
def get_reviews(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        reviews = Review.query.filter(Review.restaurant_id == restaurant.id)
        results = []
        if reviews:
            for review in reviews:
                results.append(review.to_dict())
            return results
        else:
            return {"errors": "No reviews found."}, 404
    return {"errors": "No restaurant found."}, 404


# Create review for a specific restaurant
@restaurant_routes.route("/<int:id>/reviews/create", methods=["POST"])
@login_required
def create_review(id):
    restaurant = Restaurant.query.get(id)

    if restaurant:
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            review = Review(
                user_id=current_user.id,
                restaurant_id=restaurant.id,
                review_text=form.data["review_text"],
                stars=form.data["stars"]
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

 # Update a specific review for a specific restaurant
@restaurant_routes.route("/<int:id>/review/<int:reviewId>", methods=["PUT"])
@login_required
def update_review(id, reviewId):

    restaurant = Restaurant.query.get(id)

    if restaurant:
        review = Review.query.get(reviewId)
        if review:
            if review.user_id == current_user.id:
                form = ReviewForm()
                form['csrf_token'].data = request.cookies['csrf_token']
                if form.validate_on_submit():
                    review.review_text = form.data["review_text"]
                    review.stars = form.data["stars"]
                    db.session.commit()
                    return review.to_dict()
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401
            return {"errors": "You must be the creator of this review to complete this action."}, 401
        return {"errors": "Review not found."}, 404
    return {"errors": "Restaurant not found."}, 404


# View menu items of a specific restaurant
@restaurant_routes.route("/<int:id>/menu-items")
def get_menu_items(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        menu_items = MenuItem.query.filter(
            MenuItem.restaurant_id == restaurant.id)
        results = []
        if menu_items:
            for menu_item in menu_items:
                results.append(menu_item.to_dict())
            return results
        else:
            return {"errors": "No menu items found."}, 404
    return {"errors": "No restaurant found."}, 404


# Create a menu item for a specific restaurant
@restaurant_routes.route("/<int:id>/menu-item/create", methods=["POST"])
@login_required
def create_menu_item(id):
    restaurant = Restaurant.query.get(id)

    if restaurant:
        if restaurant.user_id == current_user.id:
            form = MenuItemForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                menu_item = MenuItem(
                    restaurant_id=restaurant.id,
                    name=form.data["name"],
                    description=form.data["description"],
                    price=form.data["price"],
                    preview_image=form.data["preview_image"]
                )
                db.session.add(menu_item)
                db.session.commit()
                return menu_item.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must be the creator of this restaurant to complete this action."}, 401
    return {"errors": "Restaurant not found."}, 404

 # Update a specific menu item for a specific restaurant
@restaurant_routes.route("/<int:id>/menu-item/<int:menuItemId>", methods=["PUT"])
@login_required
def update_menu_item(id, menuItemId):

    restaurant = Restaurant.query.get(id)

    if restaurant:
        menu_item = MenuItem.query.get(menuItemId)
        if menu_item:
            if restaurant.user_id == current_user.id:
                form = MenuItemForm()
                form['csrf_token'].data = request.cookies['csrf_token']
                if form.validate_on_submit():
                    menu_item.name = form.data["name"]
                    menu_item.description = form.data["description"]
                    menu_item.price = form.data["price"]
                    menu_item.preview_image = form.data["preview_image"]
                    db.session.commit()
                    return menu_item.to_dict()
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401
            return {"errors": "You must be the creator of this restaurant to complete this action."}, 401
        return {"errors": "Menu item not found."}, 404
    return {"errors": "Restaurant not found."}, 404


# Delete a specific menu item
@restaurant_routes.route('<int:id>/menu-item/<int:menuItemId>/delete', methods=['DELETE'])
@login_required
def delete_one_menu_item(id, menuItemId):

    restaurant = Restaurant.query.get(id)
    if restaurant:
        menu_item = MenuItem.query.get(menuItemId)
        if restaurant.user_id == current_user.id:
            if menu_item:
                db.session.delete(menu_item)
                db.session.commit()
                return {'message': 'Menu item successfully deleted.'}
        return {"errors": "You must own the restaurant to complete this action."}, 401
    return {'error': 'No restaurant found'}, 404


# Create Shopping cart and Shopping cart item.
@restaurant_routes.route("/<int:id>/menu-item/<int:menuItemId>/create-cart-item", methods=["POST"])
@login_required
def create_item_and_cart(id, menuItemId):
    restaurant = Restaurant.query.get(id)

    if restaurant:
        menu_item = MenuItem.query.get(menuItemId)
        if menu_item:
            if menu_item.restaurant_id == id:
                shopping_cart = ShoppingCart.query.filter(
                    ShoppingCart.user_id == current_user.id).first()

                if shopping_cart is None:
                    user_cart = ShoppingCart(
                        user_id=current_user.id,
                    )
                    db.session.add(user_cart)
                    db.session.commit()
                    shopping_cart = user_cart

                cart_item = ShoppingCartItem.query.filter_by(
                    cart_id=shopping_cart.id, menu_item_id=menu_item.id).first()

                if cart_item:
                    form = ShoppingCartItemForm()
                    form['csrf_token'].data = request.cookies['csrf_token']
                    if form.validate_on_submit():
                        cart_item.quantity += form.data["quantity"]
                        db.session.commit()
                        return shopping_cart.to_dict()
                    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
                else:
                    form = ShoppingCartItemForm()
                    form['csrf_token'].data = request.cookies['csrf_token']

                    if form.validate_on_submit():
                        cart_item = ShoppingCartItem(
                            cart_id=shopping_cart.id,
                            menu_item_id=menu_item.id,
                            quantity=form.data["quantity"]
                        )
                        db.session.add(cart_item)
                        db.session.commit()
                        return shopping_cart.to_dict()
                    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
            return {"errors": "You cannot add menu items from multiple restaurants."}, 401
        return {"errors": "Menu item not found."}, 404
    return {"errors": "Restaurant not found."}, 404
