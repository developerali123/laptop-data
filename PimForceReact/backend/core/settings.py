"""
Django settings for core project.
"""

import os
from pathlib import Path
from datetime import timedelta

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY', default='django-insecure-change-this-in-production-58we^yr+v9@nd+24sl6_(tjga661g*9+wk34d2bfjk=f8&d^n')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=True)

# Logging: toggle file logging in production via env
USE_FILE_LOG = env.bool('USE_FILE_LOG', default=False)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1', 'backend'])

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    'drf_spectacular',
    
    # Local apps
    'api',
    'tasks',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database
DATABASES = {
    'default': env.db('DATABASE_URL', default='postgresql://pimforce_user:pimforce_password@postgres:5432/pimforce_db')
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://frontend:3000",
    "http://localhost:3001",
    "https://leenweb.katanapim.com"
])

CORS_ALLOW_CREDENTIALS = True

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
    ),
}

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

# API Documentation
SPECTACULAR_SETTINGS = {
    'TITLE': 'PimForce API',
    'DESCRIPTION': 'Modern fullstack application API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
    'SCHEMA_PATH_PREFIX': '/api/',
}

# Redis settings
REDIS_URL = env('REDIS_URL', default='redis://redis:6379/0')

# Celery settings
CELERY_BROKER_URL = env('CELERY_BROKER_URL', default='redis://redis:6379/0')
CELERY_RESULT_BACKEND = env('CELERY_RESULT_BACKEND', default='redis://redis:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60

# Celery Beat schedule for periodic tasks
CELERY_BEAT_SCHEDULE = {
    'run-test-periodic-task-every-15-minutes': {
        'task': 'tasks.tasks.test_periodic_task',
        'schedule': 900,  # 900 seconds = 15 minutes
    },
}
CELERY_BEAT_SCHEDULE.update({
    'run-katana-to-woo-sync-every-15-minutes': {
        'task': 'tasks.tasks.run_katana_to_woo_sync',
        'schedule': 900,  # 900 seconds = 15 minutes
    },
})

# Cache settings
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': REDIS_URL,
    }
}

# Logging
# Build logging configuration conditionally to avoid configuring unwritable file handlers in containers
LOGGING_FORMATTERS = {
    'verbose': {
        'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
        'style': '{',
    },
    'simple': {
        'format': '{levelname} {message}',
        'style': '{',
    },
}

LOGGING_HANDLERS = {
    'console': {
        'level': 'INFO',
        'class': 'logging.StreamHandler',
        'formatter': 'simple',
    },
}

if USE_FILE_LOG:
    LOGGING_HANDLERS['file'] = {
        'level': 'INFO',
        'class': 'logging.FileHandler',
        'filename': os.path.join(BASE_DIR, 'logs', 'django.log'),
        'formatter': 'verbose',
    }

LOGGING_ROOT_HANDLERS = ['console'] + (['file'] if USE_FILE_LOG else [])

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': LOGGING_FORMATTERS,
    'handlers': LOGGING_HANDLERS,
    'root': {
        'handlers': LOGGING_ROOT_HANDLERS,
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': LOGGING_ROOT_HANDLERS,
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# Create logs directory only if file logging is enabled
if USE_FILE_LOG:
    os.makedirs(os.path.join(BASE_DIR, 'logs'), exist_ok=True)

