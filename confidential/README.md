# Identity Client Library Python

## How to use

- First, import `iam.identity_client` into your sourcecode. I.E:

```python
    from iam.identity_client import IdentityClient
```

- Second, extend IdentityClient with and implement all required functions:

```python
class IClient(IdentityClient):
    def save_state(self, state):
        """
        When you get authorization url, you will get the `state` and the `authorization_url`, save `state` and compare with state in `callback` function
        """

    def save_token(self, userid, token, expires_at):
        """
        Save token when you get token from exchange code
        """

    def get_state(self):
        """
        Get state when you need to compare with state in `callback` function
        """

    def get_user_id(self, token):
        """
        Get user id via token
        """

    def get_expires(self, token):
        """
        get expires at via token
        """
```

- Third, you need to instantiate IClient. See example:

```python
iclient = IClient(client_id, client_secret, auth_url,
    token_url, redirect_uri, refresh_url, scope)
```

- Finally, you can see the sample code to know how to use.
https://github.com/sanglx-teko/teko-id-integration/blob/master/confidential/app.py
