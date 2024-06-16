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
                        <Typography variant="h2" component="h2">
                            Login
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            Resume climb
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
                                borderRadius: "20px",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
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
                                borderRadius: "20px",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
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
                                borderRadius: "20px",
                                "&:hover": { color: palette.primary.main },
                                width: "100%",
                            }}
                        >
                            LOGIN
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType("register");
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
                            Ready to become a climber? Register.
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
