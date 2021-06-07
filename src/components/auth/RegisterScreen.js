import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui);// Extrae el estado

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            dispatch(setError('El nombre es requerido'));
            return false;

        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email no válido'))
            return false;

        } else if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
            dispatch(setError('El password no es válido, mínimo 6 caracteres'))
            return false;

        } else if (validator.isEmpty(password) || !validator.isLength(confirmPassword, { min: 6 })) {
            dispatch(setError('El confirm password no es válido, mínimo 6 caracteres'))
            return false;

        } else if (!validator.equals(password, confirmPassword)) {
            dispatch(setError('Los passwords no coincide'))
            return false;
        }

        dispatch(removeError());
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn"
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    className="auth__input"
                    value={confirmPassword}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={loading}
                >
                    Register
            </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already register?
                </Link>
            </form>
        </>
    )
}
