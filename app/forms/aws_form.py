from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_routes import ALLOWED_EXTENSIONS


class ImageForm(FlaskForm):
    url = FileField("url", validators=[
        FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
