import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { validata } from './validata';
import { notify } from './toast';
import styles from "./SignUp.module.css"
import { Link } from 'react-router-dom';



const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",

    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setErrors(validata(data, "login"))
    }, [data])

    const focusHandler = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const changeHandler = event => {
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify("You loged in succesfully", "succes")
        } else {
            notify("Invalid data!", "error")
            setTouched({
                email: true,
                password: true,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formFiled}>
                    <label>email</label>
                    <input className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name='email'
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formFiled}>
                    <label>password</label>
                    <input className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                        type='password'
                        name='password'
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>

                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;