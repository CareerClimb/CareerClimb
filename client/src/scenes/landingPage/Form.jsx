// Import Packages
import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

// Define the register schema
const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm password is required"),
});

// Define the login schema
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

// Define initial values for the register form
const initialValuesRegister = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

// Define initial values for the login form
const initialValuesLogin = {
    email: "",
    password: "",
};

// Define the Form component
const Form = () => {
    const [pageType, setPageType] = useState("register");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture?.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box textAlign="center">
                        <Typography variant="h2" component="h2">
                            {isRegister ? "Register" : "Login"}
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            {isRegister ? "To start your climb today" : "Resume climb"}
                        </Typography>
                    </Box>
                    <Box
                        display="grid"
                        gap="20px"
                        sx={{
                            display:"grid",
                            gap:"20px",
                            width:isNonMobile ? "500px" : "100%" // Add this line to make the box width adaptable to mobile devices
                        }}>
                    
                        {isRegister && (
                            <>
                                <TextField
                                    label="Full Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullName}
                                    name="fullName"
                                    error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                                    helperText={touched.fullName && errors.fullName}
                                    fullWidth
                                    sx={{
                                        borderRadius: "20px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px',
                                        },
                                    }}
                                />
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    fullWidth
                                    sx={{
                                        borderRadius: "20px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    fullWidth
                                    sx={{
                                        borderRadius: "20px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    fullWidth
                                    sx={{
                                        borderRadius: "20px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px'
                                        }
                                    }}
                                />
                            </>
                        )}
                        {isLogin && (
                            <>
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    fullWidth
                                    sx={{
                                        borderRadius: "20px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    fullWidth
                                    sx={{
                                        borderRadius: "20px",
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px'
                                        }
                                    }}
                                />
                            </>
                        )}
                    </Box>
                    <Box width="100%" textAlign="center"> {/* Add this line to make the button full width */}
                        <Button
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                // p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                borderRadius: "20px",
                                "&:hover": { color: palette.primary.main },
                                width: "100%" // Add this line to make the button full width
                            }}
                        >
                            {isLogin ? "LOGIN" : "Create an Account"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "Ready to become a climber? Register."
                                : "Already a climber? Login"}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
