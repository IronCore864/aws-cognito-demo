import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from '@aws-amplify/auth';
import { awsExports } from './aws-exports';


Amplify.configure(awsExports);

function App({ signOut, user }) {
  Auth.currentSession().then(data => console.log(data.idToken));

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App, { hideSignUp: true });
