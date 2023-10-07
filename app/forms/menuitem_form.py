from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired


class MenuItemForm(FlaskForm):
    restaurant_id = IntegerField('restaurant')
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    preview_image = StringField("preview_image", validators=[DataRequired()])
