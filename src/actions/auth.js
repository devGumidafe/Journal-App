import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(error => {
                messageError(error.message);
            }).finally(() => {
                dispatch(finishLoading());
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading());

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(error => {
                messageError(error.message);
            }).finally(() => {
                dispatch(finishLoading());
            })
    }

}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(error => {
                messageError(error.message);
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                dispatch(logout());

                dispatch(noteLogout());

            }).catch(error => {
                messageError(error.message);
            })
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}

export const messageError = (error) => {
    Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}