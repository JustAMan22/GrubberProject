from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    user_id = IntegerField('user')
    restaurant_id = IntegerField('restaurant')
    review_text = StringField('review_text', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired()])
