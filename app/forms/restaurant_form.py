from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class RestaurantForm(FlaskForm):
    user_id = IntegerField('user')
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    price_range = IntegerField('price_range', validators=[DataRequired()])
    preview_image = StringField("preview_image", validators=[DataRequired()])
