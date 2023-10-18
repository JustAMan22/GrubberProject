from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Restaurant, Review, User, MenuItem, ShoppingCartItem, ShoppingCart
from app.forms.restaurant_form import RestaurantForm
from app.forms.review_form import ReviewForm
from app.forms.menuitem_form import MenuItemForm
from app.forms.shoppingcartitem import ShoppingCartItemForm
from statistics import mean

shopping_cart_routes = Blueprint('shoppingcart', __name__)

# Get all cart items for current user


@shopping_cart_routes.route("/cart-items")
@login_required
def get_user_cart_items():
    user_cart = ShoppingCart.query.filter(
        ShoppingCart.user_id == current_user.id).first()
    results = []
    if user_cart:
        cart_items = ShoppingCartItem.query.filter(
            ShoppingCartItem.cart_id == user_cart.id)
        if cart_items:
            for cart_item in cart_items:
                results.append(cart_item.to_dict())
            return results
        return {"errors": "This user has no cart items."}
    return {"errors": "This user does not have a shopping cart."}


# Clear your shopping cart (delete it)
@shopping_cart_routes.route('/delete', methods=['DELETE'])
@login_required
def clear_shopping_cart():

    cart = ShoppingCart.query.filter(
        ShoppingCart.user_id == current_user.id).first()

    if cart:
        if cart.user_id == current_user.id:
            db.session.delete(cart)
            db.session.commit()
            return {'message': 'Cart successfully cleared.'}
        return {"errors": "You must own the cart to complete this action."}, 401
    return {'error': 'No cart found'}, 404


# Delete (clear) a shopping cart item
@shopping_cart_routes.route('/cart-item/<int:cartId>', methods=['DELETE'])
@login_required
def clear_one_cart_item(cartId):

    cart = ShoppingCart.query.filter(
        ShoppingCart.user_id == current_user.id).first()

    if cart:
        if cart.user_id == current_user.id:
            cart_item = ShoppingCartItem.query.get(cartId)
            if cart_item:
                db.session.delete(cart_item)
                db.session.commit()
                return {'message': 'Cart item successfully removed.'}
            return {"errors": "Cart item not found."}, 401
        return {'error': 'You must own the cart to complete this action.'}, 401
    return {'error': 'No cart found.'}, 404


#Get a user cart
@shopping_cart_routes.route("/")
@login_required
def get_user_cart():
    userCart = ShoppingCart.query.filter(
        ShoppingCart.user_id == current_user.id).first()
    if userCart:
        return userCart.to_dict()
    return {"errors": "User has no cart!"}, 404
