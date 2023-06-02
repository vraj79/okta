import React from 'react'
import "./App.css";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-j2pnvmh8jgytdqvk.us.auth0.com";
  const clientId = "Vwc1W1JY7eQgIx8I4F8SkYI7hhG8sxp9";

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  console.log(user);
  
  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};



const App = () => {

  return (
    <div className='App'>
      <Auth0ProviderWithHistory>
        <AuthButton />
      </Auth0ProviderWithHistory>
    </div>
  )
}

export default App