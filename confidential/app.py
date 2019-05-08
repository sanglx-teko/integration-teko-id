import os
import time
import json
from requests_oauthlib import OAuth2Session
from lib.identity_client import IdentityClient
from flask import (Flask, render_template, request,
                   redirect, url_for, flash, jsonify, session)


GOOGLE_CLIENT_ID = "617942122008-09p80iqquja3pgjm0q61qd7o4rsj2j1a.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "YYi8-8m1md7xuFw1Cr1pYpw4"
GOOGLE_REDIRECT_URI = "http://localhost:5000/oauth/google-callback"

GOOGLE_SCOPE = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]


class IClient(IdentityClient):
    def save_state(self, state):
        session['oauth_state'] = state

    def save_token(self, userid, token, expires_at):
        if token is None:
            session['oauth_user_id'] = None
            session['oauth_token'] = None
            session['oauth_expires'] = None
        else:
            session['oauth_user_id'] = userid
            session['oauth_token'] = token
            session['oauth_expires'] = expires_at

    def get_state(self):
        return session.get('oauth_state', None)

    def get_user_id(self, token):
        session_token = session.get('oauth_token', None)
        if session_token is not None and session_token == token:
            return session.get('oauth_user_id', None)
        else:
            return None

    def get_expires(self, token):
        return time.time()


# 'client_id': 'sample-client'
# 'client_secret': 'qqw7u7qdEq4rFRLQzVhT'
# 'scope': 'openid profile'
# 'grant_type': 'authorization_code\nrefresh_token
# 'redirect_uri': 'http://localhost:5000/callback'
# 'token_endpoint_auth_method': 'client_secret_basic'

client_id = 'sample-client'
client_secret = 'qqw7u7qdEq4rFRLQzVhT'
redirect_uri = 'http://localhost:5000/callback'
scope = 'profile'


auth_url = "https://id.teko.vn/oauth/authorize"
token_url = "https://id.teko.vn/oauth/token"
refresh_url = token_url  # True for Google but not all providers.

# authorization_base_url = 'https://accounts.google.com/o/oauth2/v2/auth'
# token_url = "https://www.googleapis.com/oauth2/v4/token"
# refresh_url = token_url  # True for Google but not all providers.


os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
os.environ["AUTHLIB_INSECURE_TRANSPORT"] = "1"
app = Flask(__name__)
app.secret_key = os.urandom(24)
iclient = IClient(client_id, client_secret, auth_url,
                  token_url, redirect_uri, refresh_url, scope)


@app.route('/callback')
def callback():
    state = request.args.get('state')
    session_state = iclient.get_state()
    if session_state is not None and session_state == state:
        userid, token, expires_at = iclient.fetch_token(
            redirect_response_url=request.url)
        iclient.save_token(userid, token, expires_at)
        return json.dumps(token), 200
    else:
        flash('Some thing went wrong. Please try again')
        return redirect(url_for('index'))


@app.route('/')
def index():
    authorization_url, state = iclient.authorization_url()
    iclient.save_state(state)
    return render_template('index.html', authorization_url=authorization_url)
