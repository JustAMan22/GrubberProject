from flask import Blueprint, request
from flask_login import login_required
from app.api.aws_routes import upload_file_to_s3, get_unique_filename
from app.forms.aws_form import ImageForm

image_routes = Blueprint("images", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@image_routes.route("/get-aws-url", methods=["POST"])
@login_required
def create_aws_image():
    form = ImageForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        image = form.data["url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            return {"errors": [upload]}
        url = upload["url"]
        return {"url": url}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
