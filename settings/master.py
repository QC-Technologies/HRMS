"""
For local development copy this file and name it local.py and unstage
this file from git.
Then to run development server on local run command
python manage.py runserver --settings=settings.local
"""
from .base import *
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django_secret_key_here'

# SECURITY  n with debug turned on in production!
DEBUG = False

AWS_ACCESS_KEY_ID = 'aws_access_key_id_here'
AWS_SECRET_ACCESS_KEY = 'aws_secret_access_key_here'
