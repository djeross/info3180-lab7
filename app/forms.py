
from flask_uploads import UploadSet, IMAGES
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired, TextAreaField

images = UploadSet('images', IMAGES)

class UploadForm(FlaskForm):
    description = TextAreaField('Description [500 words max]', validators=[DataRequired()])
    upload = FileField('Photo', validators=[FileRequired(), FileAllowed(images, 'Images only!')])
