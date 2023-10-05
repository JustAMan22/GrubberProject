from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    restaurant_id = IntegerField('restaurant', validators=[DataRequired()])
    review_text = StringField('review', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired()])
    preview_image = StringField("preview_image", validators=[DataRequired()])
