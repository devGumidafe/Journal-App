import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom";
import { firebase } from '../../firebase/firebaseConfig';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { login } from '../../actions/auth';
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const override = css`
                display: block;
                margin: 0 auto;
                border-color: #5C62C5;
            `;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid))

            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, [dispatch, setChecking, setIsLoggedIn])

    return (
        <Router>
            <ClipLoader loading={checking} css={override} size={100} />

            <Switch>
                <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn} />
                <PrivateRoute exact path="/" component={JournalScreen} isAuthenticated={isLoggedIn} />

                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
