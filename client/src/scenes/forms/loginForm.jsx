import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

// Define the login schema
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

// Define initial values for the login form
const initialValuesLogin = {
    email: "",
    password: "",
};

// Define the LoginForm component
const LoginForm = ({ setPageType }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

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
        await login(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box textAlign="center">
                        <Typography variant="h1" fontSize='62px' fontWeight='bold' marginBottom="3px">
                            Welcome Back!
                        </Typography>
                        <Typography variant="h4" marginBottom='1.5rem' fontFamily="Roboto" color={palette.neutral.medium}>
                            Login to continue your Climb
                        </Typography>
                    </Box>
                    <Box
                        display="grid"
                        gap="20px"
                        sx={{
                            width: isNonMobile ? "500px" : "100%",
                        }}
                    >
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
                                borderRadius: "50px",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    fontSize: '20px', // Change the font size for the input text
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.2rem', // Change the font size for the label
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: '0.9rem', // Change the font size for the helper text
                                },
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
                                borderRadius: "50px",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    fontSize: '20px', // Change the font size for the input text
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.2rem', // Change the font size for the label
                                },
                                '& .MuiFormHelperText-root': {
                                    fontSize: '0.9rem', // Change the font size for the helper text
                                },
                            }}
                        />
                    </Box>
                    <Box width="100%" textAlign="center">
                        <Button
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                borderRadius: "50px",
                                width: "100%",
                                height: '56px', // Match the height of the TextFields
                                fontSize: '20px', // Match the font size of the TextFields
                                textTransform: 'none',
                                border: `3px solid ${palette.primary.main}`,
                                '&:hover': {
                                    color: palette.primary.main,
                                    backgroundColor: palette.background.default,
                                    borderColor: palette.primary.main,
                                }
                            }}
                        >
                            Login
                        </Button>
                        <Box display="flex" justifyContent="center">
                            <Typography
                                variant="h4"
                                fontFamily="Roboto" 
                                color={palette.neutral.medium}
                            >
                                Not a climber? </Typography>

                            <Typography
                                variant="h4"
                                fontFamily="Roboto" 
                                fontWeight="bold"
                                color="blue"
                                onClick={() => {
                                    navigate("/register");
                                    resetForm();
                                }}
                                sx={{ml: 1,
                                    '&:hover': {
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }
                                }}
                                
                                >
                                Register
                            </Typography>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
