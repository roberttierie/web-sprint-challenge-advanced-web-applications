import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component:  Component, ...rest}) {
    const token = window.localStorage.getItem('token');
    return (
        <div>
            <Route 
            
            {...rest}
            render = {(props) => {
                if (token) {
                    return <Component {...props} />
                } else 
                {
                    return <Redirect to ="/login" />
                }
            }}
            />
            
        </div>
    )
}

export default PrivateRoute;
