import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authenticationService } from '../services'


const PrivateRoute = ({component:Component , ...rest}) =>(
    <Route {...rest} render={props => {
        if(authenticationService.isAuthenticated){
            return <Component {...props} />
        }else{
            return <Redirect to='/login'/>
        }

    }} />

)

export default PrivateRoute