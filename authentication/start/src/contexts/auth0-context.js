import React, { createContext, useContext, useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

export const Auth0Context = createContext();
export const useAuth0 = () => useContext(Auth0Context);

export function Auth0Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initAuth0();

    async function initAuth0() {
      const auth0 = await createAuth0Client({
        domain: "dev-eallen.auth0.com",
        client_id: "zZgZv5LzuQbzeyRQEbf447fx3J8ZVFcU",
        redirect_uri: window.location.origin,
      });

      setAuth0Client(auth0);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        try {
          await auth0.handleRedirectCallback();
        } catch (err) {
          alert(err);
        }

        window.location.replace(window.location.pathname);
      }

      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user);
      }

      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login: (...p) => auth0Client.loginWithRedirect(...p),
        logout: (...p) => auth0Client.logout(),
        getToken: (...p) => auth0Client.getTokenSilently(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
