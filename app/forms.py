
from flask_wtf import FlaskForm
from wtforms import TextAreaField,SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired


class UploadForm(FlaskForm):
    description = TextAreaField('Description', validators=[DataRequired()])
    photo = FileField('Photo', validators=[FileRequired(),FileAllowed(['png','jpg'], "Images only!")])
    submit = SubmitField('Upload')
