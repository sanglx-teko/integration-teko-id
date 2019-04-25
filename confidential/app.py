import os
import json
from requests_oauthlib import OAuth2Session
from flask import (Flask, render_template, request,
                   redirect, url_for, flash, jsonify)


GOOGLE_CLIENT_ID = "617942122008-09p80iqquja3pgjm0q61qd7o4rsj2j1a.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "YYi8-8m1md7xuFw1Cr1pYpw4"
GOOGLE_REDIRECT_URI = "http://localhost:5000/oauth/google-callback"

GOOGLE_SCOPE = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]


# 'client_id': 'sample-client'
# 'client_secret': 'qqw7u7qdEq4rFRLQzVhT'
# 'scope': 'openid profile'
# 'grant_type': 'authorization_code\nrefresh_token
# 'redirect_uri': 'http://localhost:5000/callback'
# 'token_endpoint_auth_method': 'client_secret_basic'

client_id = 'sample-client'
client_secret = 'qqw7u7qdEq4rFRLQzVhT'
redirect_uri = 'http://localhost:5000/callback'
scope = 'openid profile'


auth_url = "https://id.teko.vn/oauth/authorize"
token_url = "https://id.teko.vn/oauth/token"
refresh_url = token_url  # True for Google but not all providers.

# authorization_base_url = 'https://accounts.google.com/o/oauth2/v2/auth'
# token_url = "https://www.googleapis.com/oauth2/v4/token"
# refresh_url = token_url  # True for Google but not all providers.

session = {}  # temporary session


def save_access_token(token):
    session['oauth_token'] = token


os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
os.environ["AUTHLIB_INSECURE_TRANSPORT"] = "1"
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
    session_state = session.pop('oauth_state', None)
    if session_state is not None and session_state == state:
        client = OAuth2Session(
            client_id, state=session_state, redirect_uri=redirect_uri)
        token = client.fetch_token(token_url, client_secret=client_secret,
                                   authorization_response=request.url)
        save_access_token(token)
        return json.dumps(token), 200
    else:
        flash('Some thing went wrong. Please try again')
        redirect(url_for('index'))


@app.route('/profile')
def profile():
    oauth_client = OAuth2Session(
        client_id=client_id, token=session['oauth_token'])
    return jsonify(oauth_client.get('http://localhost:5000/oauth/profile').json())


@app.route('/')
def index():
    oauth_client = OAuth2Session(client_id=client_id,
                                 redirect_uri=redirect_uri, scope=scope)
    authorization_url, state = oauth_client.authorization_url(auth_url)
    save_new_state(state)
    return render_template('index.html', authorization_url=authorization_url)
