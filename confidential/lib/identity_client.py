from requests_oauthlib import OAuth2Session
import requests


class IdentityClient(OAuth2Session):
    def __init__(self, client_id=None, client=None, auto_refresh_url=None,
                 auto_refresh_kwargs=None, scope=None, redirect_uri=None, token=None,
                 state=None, token_updater=None, **kwargs):
        """Construct a new OAuth 2 client session.

        :param client_id: Client id obtained during registration
        :param client: :class:`oauthlib.oauth2.Client` to be used. Default is
                       WebApplicationClient which is useful for any
                       hosted application but not mobile or desktop.
        :param scope: List of scopes you wish to request access to
        :param redirect_uri: Redirect URI you registered as callback
        :param token: Token dictionary, must include access_token
                      and token_type.
        :param state: State string used to prevent CSRF. This will be given
                      when creating the authorization url and must be supplied
                      when parsing the authorization response.
                      Can be either a string or a no argument callable.
        :auto_refresh_url: Refresh token endpoint URL, must be HTTPS. Supply
                           this if you wish the client to automatically refresh
                           your access tokens.
        :auto_refresh_kwargs: Extra arguments to pass to the refresh token
                              endpoint.
        :token_updater: Method with one argument, token, to be used to update
                        your token database on automatic token refresh. If not
                        set a TokenUpdated warning will be raised when a token
                        has been refreshed. This warning will carry the token
                        in its token argument.
        :param kwargs: Arguments to pass to the Session constructor.
        """
        super.__init__(client_id=client_id,
                       client=client,
                       auto_refresh_url=auto_refresh_url,
                       auto_refresh_kwargs=auto_refresh_kwargs,
                       scope=scope,
                       redirect_uri=redirect_uri,
                       token=token, state=state,
                       token_updater=token_updater,
                       kwargs=kwargs)
        self._requests = requests

    def authorization_url(self, auth_url):
        """
        return authorization_url and state
        """
        authorization_url, state = super.authorization_url(auth_url)
        return authorization_url, state

    def fetch_token(self, token_url, client_secret, authorization_response):
        """
        return access_token, id_token refresh_token
        """
        token = super.fetch_token(
            token_url, client_secret=client_secret, authorization_response=authorization_response)
        return token

    def refresh_token(self, refresh_url, client_id, client_secret):
        extra = {
            'client_id': client_id,
            'client_secret': client_secret
        }
        r_token = super.refresh_token(refresh_url, **extra)
        return r_token

    def introspect(self):
        pass
