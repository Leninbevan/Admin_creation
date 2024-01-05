import { Box, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { adduserDetails, getuserDetails } from './service/action';
import { ADDUSER } from './service/actiontypes';


const validationSchema = yup.object({
    name: yup
        .string('Enter your Name')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^([a-zA-Z])*$/, 'Enter valid  Name')
        .required('Name is required'),
    image: yup
        .string('Enter your Image Url')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Image Url is required'),
    job: yup
        .string('Enter your job')
        .required('Email is required'),
    gender: yup
        .string()
        .required('Select Gender')
});


export const Adduser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token')
    // console.log(token);
    const addedResponse = useSelector((state) => state.addedResponse);
    console.log(addedResponse);
   

    // useEffect(() => {
    //     if (addedResponse === "User created successfully") {
    //         setTimeout(() => {
    //             history.push('/userlist');

                // dispatch({
                //     type:ADDUSER,
                //     payload:""
                // })
    //             // dispatch(getuserDetails(token))
    //         }, 2000)
    //     }
    // }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            job: '',
            gender: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(adduserDetails(values, token));
            history.push('/userlist');
        },
    });

    return (
        <Box sx={{ bgcolor: '#482880', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ bgcolor: 'black', borderRadius: '4%', width: '30%' }}>
                <form onSubmit={formik.handleSubmit} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                        <Box className="head" style={{ color: 'white', textAlign: 'center' }}>Add User</Box>
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}

                            id="image"
                            name="image"
                            label="Image Url"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                        />
                        <TextField sx={{
                            "& .MuiInputLabel-root": { color: 'white' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "blue" },
                            }, margin: 2
                        }}

                            id="job"
                            name="job"
                            label="Job"
                            value={formik.values.job}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.job && Boolean(formik.errors.job)}
                            helperText={formik.touched.job && formik.errors.job}
                        />
                        <RadioGroup className="radio"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            sx={{ margin: 2 }}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                        <div className='genderError'>{formik.touched.gender && formik.errors.gender}</div>
                        {/* <div className="footerText">{addedResponse}</div> */}
                        <Button color="primary" variant="contained" type="submit" sx={{ margin: 2, color: 'white' }}>
                            Add user
                        </Button>

                    </Box>
                </form>
            </Box>
        </Box>

    )
}


