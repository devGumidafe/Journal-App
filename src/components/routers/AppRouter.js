import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom";
import { login } from '../../actions/auth';
import { firebase } from '../../firebase/firebaseConfig';
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return <h1>Espere...</h1>
    }

    return (
        <Router>
            <Switch>
                <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn} />
                <PrivateRoute exact path="/" component={JournalScreen} isAuthenticated={isLoggedIn} />

                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
