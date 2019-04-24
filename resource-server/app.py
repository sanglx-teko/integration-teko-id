import os

import requests
from flask import Flask, current_app, g

from flask_httpauth import HTTPTokenAuth
from jose import JWTError, jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret key here'
app.config['OAUTH_CLIENT_ID'] = 'your-registered-client-id'
app.config['OAUTH_CLIENT_SECRET'] = 'client-secret-returned-by-oauth-server'
app.config['OAUTH_JWT_PUB_KEY'] = os.environ.get('OAUTH_JWT_PUB_KEY')

jwt_auth = HTTPTokenAuth('Bearer')
introspect_auth = HTTPTokenAuth('Bearer')


@jwt_auth.verify_token
def verify_jwt_token(token):
    g.user = None
    try:
        claims = jwt.decode(token, current_app.config['OAUTH_JWT_PUB_KEY'],
                            algorithms=['RS256'])
        g.user = claims['user']
        return True
    except JWTError:
        return False
    return False


@introspect_auth.verify_token
def introspect_token(token):
    g.user = None
    client_id = current_app.config['OAUTH_CLIENT_ID']
    client_secret = current_app.config['OAUTH_CLIENT_SECRET']
    res = requests.post(
        'https://id.teko.vn/oauth/introspect',
        auth=(client_id, client_secret),
        data=dict(token=token))
    if res.status != 200:
        return False
    res_json = res.json()
    if not res_json['active']:
        return False
    g.user = res_json['user']
    return True


@app.route('/protected-endpoint')
@jwt_auth.login_required
def protected_endpoint():
    return 'Hello, %s. You have accessed protected endpoint!' % g.user


@app.route('/very-important-endpoint')
@introspect_auth.login_required
def very_important_endpoint():
    return 'Hello, %s. You have accessed high-secure endpoint!' % g.user
