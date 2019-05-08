import time

from requests_oauthlib import OAuth2Session
import jwt


class IdentityClient(object):
    def __init__(self,
                 client_id=None,
                 client_secret=None,
                 auth_url=None,
                 token_url=None,
                 redirect_uri=None,
                 refresh_url=None,
                 scope=['profile']):
        self.client_id = client_id
        self.client_secret = client_secret
        self.auth_url = auth_url
        self.token_url = token_url
        self.refresh_url = refresh_url
        self.redirect_uri = redirect_uri
        self.scope = scope

    def save_state(self, state):
        """
        We need to implement this function
        """
        raise NotImplementedError

    def save_token(self, userid, token):
        """
        We need to implement this function
        """
        raise NotImplementedError

    def get_state(self):
        """
        We need to implement this function
        """
        raise NotImplementedError

    def get_user_id(self, token):
        """
        We need to implement this function
        """
        raise NotImplementedError

    def get_expires(self, token):
        raise NotImplementedError

    def is_login(self, token):
        _expires = self.get_expires(token)
        if token is None:
            return False
        if _expires is None:
            return False
        if time.time() >= _expires:
            return False
        return True

    def logout(self, userid):
        self.save_token(userid, None, None)

    def authorization_url(self):
        """
        return authorization_url and state
        """
        _client = OAuth2Session(
            client_id=self.client_id, scope=self.scope, redirect_uri=self.redirect_uri)
        authorization_url, state = _client.authorization_url(
            self.auth_url)
        self.save_state(state)
        return authorization_url, state

    def fetch_token(self, redirect_response_url):
        """
        return access_token, id_token refresh_token
        """
        state = self.get_state()
        _client = OAuth2Session(client_id=self.client_id,
                                redirect_uri=self.redirect_uri, state=state)
        token = _client.fetch_token(self.token_url, client_secret=self.client_secret,
                                    authorization_response=redirect_response_url)
        access_token = token.get('access_token')
        userid = jwt.decode(jwt=access_token, verify=False,
                            algorithms=['HS256'])
        expires_at = token.get('expires_at')
        return userid, token, expires_at

    def refresh_token(self, old_token):
        extra = {
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        _client = OAuth2Session(client_id=self.client_id,
                                token=old_token)
        token = _client.refresh_token(
            refresh_url=self.refresh_url, **extra)
        return token
