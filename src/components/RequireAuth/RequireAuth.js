import { getAuth } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {

    const [logInUser, setLogInUser] = useContext(UserContext);

    var location = useLocation();
    var navigate = useNavigate();
    const auth = getAuth()

    return auth ? children : <Navigate to="/login" state={{ from: location }} replace/>;

    
}
export default PrivateRoute;