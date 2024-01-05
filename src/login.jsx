import { Box, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from "react";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { LOGIN } from './service/actiontypes';
import { isLogin, loginDetails } from './service/action';
import Logo from "./icons8-form-96.png"

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Enter valid Email'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    login: yup
        .string()
        .required('Select type')
});

export const Login = () => {
    // console.log("login");
    const history = useHistory();
    const dispatch = useDispatch();
    const loginResponse=useSelector((state)=>state.loginResponse)

    if(loginResponse==="User not found"){
       setTimeout(()=>{
        dispatch({
            type:LOGIN,
            payload:""
        })
       },2000)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            login: ''

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(loginDetails(values, history))
        },
    });
    return (
        <Box sx={{ bgcolor: '#482880', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ bgcolor: '#191919', borderRadius: '4%', width: '30%' }}>
            <Box className="logo"><img src={Logo} alt="Logo" /></Box>
                <form onSubmit={formik.handleSubmit} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                        <Box className="head" style={{ color: 'white', textAlign: 'center' }}>Login User</Box>
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <RadioGroup className="radio"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="login"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            error={formik.touched.login && Boolean(formik.errors.login)}
                            sx={{ margin: 2 }}
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                        </RadioGroup>
                        <div className='genderError'>{formik.touched.login && formik.errors.login}</div>
                        <div className="footerText">{loginResponse}</div>
                        <Button color="primary" variant="contained" type="submit" sx={{ margin: 2 }}>
                            Login
                        </Button>
                        <div className="footerSection input">
                            <div className="footerText">Don't have an account?</div>
                            <Link to="/" className='link'>Register</Link>
                        </div>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}


