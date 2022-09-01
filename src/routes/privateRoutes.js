
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useUserAuth} from "../context"
 
const PrivateRoute = ({component: Component, ...rest}) => {
    const {isUserLoggedIn,userProfile} = useUserAuth();
    return (
        <Route {...rest} render={props => (
            isUserLoggedIn ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;