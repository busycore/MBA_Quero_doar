import React, { useContext } from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from "react-router-dom";
import AuthContext from "../context/AuthenticationContext";

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useContext(AuthContext);

  const isSigned = signed;

  const rota = rest.path?.toString();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // IsPrivate/isSigned
        // 1 true/true : OK
        // 2 true/false :NOK
        // 3 false/true :NOK
        // 4 false/false :OK

        if (isPrivate === isSigned) {
          // (1) e (4)
          return <Component />;
        } else {
          // Pathname é uma propriedade do Redirect.to e estamos verificando se é privada
          // se true, redirecionar para '/' que é o login(2)
          // senão redirecionar para o dashboard(3)
          return (
            <Redirect
              to={{
                pathname: isPrivate ? "/" : "/Institutions",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default Route;
