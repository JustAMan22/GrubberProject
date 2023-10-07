from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class ShoppingCartItemForm(FlaskForm):
    quantity = IntegerField('quantity')
