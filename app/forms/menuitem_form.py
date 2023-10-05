from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class MenuItemForm(FlaskForm):
    restaurant_id = IntegerField('restaurant', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    preview_image = StringField("preview_image", validators=[DataRequired()])
