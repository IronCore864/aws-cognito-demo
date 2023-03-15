import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from '@aws-amplify/auth';

const awsconfig = {
  region: process.env.REACT_APP_AUTH_REGION,
  userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
  cookieStorage: {
      domain: process.env.REACT_APP_AUTH_COOKIE_STORAGE_DOMAIN,
      path: "/",
      expires: 365,
      sameSite: "strict",
      secure: true,
  },
  authenticationFlowType: "USER_SRP_AUTH",
};


Amplify.configure(awsconfig);

function App({ signOut, user }) {
  Auth.currentSession().then(data => console.log(data.idToken));

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
