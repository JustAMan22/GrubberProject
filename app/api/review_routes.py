from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import db, Restaurant, Review, User
from app.forms.review_form import ReviewForm


review_routes = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all Reviews
@review_routes.route('/')
def get_all_reviews():
    results = []
    reviews = Review.query.all()
    for review in reviews:
        results.append(review.to_dict())
    return results


# Delete a specific review
@review_routes.route('<int:id>/delete', methods=['DELETE'])
@login_required
def delete_one_review(id):

    review = Review.query.get(id)
    if review:
        if review.user_id == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review successfully deleted.'}
        return {"errors": "You must own the review to complete this action."}, 401
    return {'error': 'No review found'}, 404
