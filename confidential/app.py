import os
import json

from authlib.client import OAuth2Session
from flask import (Flask, render_template, request, redirect, url_for, flash)


GOOGLE_CLIENT_ID = "617942122008-09p80iqquja3pgjm0q61qd7o4rsj2j1a.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "YYi8-8m1md7xuFw1Cr1pYpw4"
GOOGLE_REDIRECT_URI = "http://localhost:5000/oauth/google-callback"

GOOGLE_SCOPE = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]


client_id = 'client_id_1'
client_secret = 'client_secret_1'
redirect_uri = 'http://localhost:3000/callback'
scope = ['openid', 'profile']


auth_url = "http://localhost:5000/oauth/authorize"
token_url = "http://localhost:5000/oauth/token"
refresh_url = token_url  # True for Google but not all providers.

# authorization_base_url = 'https://accounts.google.com/o/oauth2/v2/auth'
# token_url = "https://www.googleapis.com/oauth2/v4/token"
# refresh_url = token_url  # True for Google but not all providers.

session = {}  # temporary session


def save_access_token(token):
    session['token'] = token


os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app = Flask(__name__)
app.secret_key = 'secret_key'


def save_new_state(state):
    if state is not None:
        session['oauth_state'] = state


def detele_state_from_session():
    if session.get('oauth_state') is not None:
        session.pop('oauth_state', None)


@app.route('/callback')
def callback():
    state = request.args.get('state')
    if session['oauth_state'] == state:
        oauth_client = OAuth2Session(
            client_id, state=session['oauth_state'], redirect_uri=redirect_uri)
        token = oauth_client.fetch_token(token_url, client_secret=client_secret,
                                         authorization_response=request.url)
        save_access_token(token)
        return json.dumps(token), 200
    else:
        detele_state_from_session()
        flash('Some thing went wrong. Please try again')
        redirect(url_for('.index'))


@app.route('/')
def index():
    oauth_client = OAuth2Session(client_id=client_id,
                                 redirect_uri=redirect_uri, scope=scope, token_endpoint_auth_method='client_secret_post')

    authorization_url, state = oauth_client.create_authorization_url(
        auth_url, access_type="offline", prompt="select_account")
    save_new_state(state)
    return render_template('index.html', authorization_url=authorization_url)
