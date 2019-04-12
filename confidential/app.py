import os


from requests_oauthlib import OAuth2Session


# GOOGLE_CLIENT_ID = "617942122008-09p80iqquja3pgjm0q61qd7o4rsj2j1a.apps.googleusercontent.com"
# GOOGLE_CLIENT_SECRET = "YYi8-8m1md7xuFw1Cr1pYpw4"
# GOOGLE_REDIRECT_URI = "http://localhost:5000/oauth/google-callback"

client_id = 'client_id_1'
client_secret = 'client_secret_1'
redirect_uri = 'http://example.com'


authorization_base_url = "https://accounts.google.com/o/oauth2/auth"
token_url = "https://accounts.google.com/o/oauth2/token"
refresh_url = token_url  # True for Google but not all providers.


scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]

session = {}


def main():
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = "1"
    google = OAuth2Session(client_id=client_id,
                           redirect_uri=redirect_uri, scope=scope)

    authorization_url, state = google.authorization_url(
        authorization_base_url, access_type="offline", prompt="select_account")
    print('authorization_url:', authorization_url)
    print('state:', state)
    session['oauth_state'] = state
    redirect_response = input('enter full redirect url:')
    token = google.fetch_token(token_url, client_secret=client_secret,
                               authorization_response=redirect_response)
    print(token)


if __name__ == "__main__":
    main()
