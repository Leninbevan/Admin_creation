import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from "react";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { registerDetails } from './service/action';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { REGISTER } from './service/actiontypes';
import Logo from "./icons8-form-96.png"

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your First Name')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^([a-zA-Z])*$/, 'Enter valid  First Name')
        .required('First Name is required'),
    lastName: yup
        .string('Enter your Last Name')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^([a-zA-Z])*$/, 'Enter valid  Last Name')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Enter valid Email'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


export const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const registeredResponse = useSelector((state) => state.registeredResponse);
    useEffect(() => {

        if (registeredResponse === "Admin created successfully") {
            setTimeout(() => {
                history.push('/login');
                dispatch({
                    type:REGISTER,
                    payload:""
                })
            
            }, 2000)
        }
        if(registeredResponse === "Please check email"){
            setTimeout(() => {
                dispatch({
                    type:REGISTER,
                    payload:""
                })
            
            }, 2000)
        }
    }, [registeredResponse])
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(registerDetails(values, history))
        },
    });


    return (
        <Box sx={{ bgcolor: '#482880', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ bgcolor: 'black', borderRadius: '4%', width: '30%' }}>
                <Box className="logo"><img src={Logo} alt="Logo" /></Box>
                <form onSubmit={formik.handleSubmit} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                        <Box className="head" style={{ color: 'white', textAlign: 'center' }}>Register User</Box>
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}

                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
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
                        <div className="footerText">{registeredResponse}</div>
                        <Button color="primary" variant="contained" type="submit" sx={{ margin: 2, color: 'white' }}>
                            Register
                        </Button>
                        <div className="footerSection">
                            <div className="footerText">Already a member?</div>
                            <Link to="/login" className='link'>Login</Link>
                        </div>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}


