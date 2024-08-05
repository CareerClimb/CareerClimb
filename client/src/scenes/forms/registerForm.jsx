import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// read env variables
const env = process.env.REACT_APP_ENV || '';

// Define the register schema
const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm password is required"),
});

// Define initial values for the register form
const initialValuesRegister = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};


// Define the RegisterForm component
const RegisterForm = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // read env variables
    const env = process.env.REACT_APP_ENV || '';

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }

        const savedUserResponse = await fetch(
            env+"/auth/register",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }   
        );
        
        if (savedUserResponse.status === 400) {
            alert("User already exists");
            onSubmitProps.resetForm();
            return;
        } else if (savedUserResponse.status !== 201) {
            alert("An error occurred. Please try again.");
            onSubmitProps.resetForm();
            return;
        } 

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        

        if (savedUser) {
            navigate(env+"/login");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await register(values, onSubmitProps);  
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
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
                            Register
                        </Typography>
                        <Typography variant="h4" marginBottom='1.5rem' fontFamily="Roboto" color={palette.neutral.medium}>
                            To start your climb today, create an account
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
                            label="Full Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fullName}
                            name="fullName"
                            error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
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
                                Create an Account
                            </Button>
                        
                        <Box display="flex" justifyContent="center">
                            <Typography
                                variant="h4"
                                fontFamily="Roboto" 
                                color={palette.neutral.medium}
                            >
                                Already a climber? </Typography>

                            <Typography
                                variant="h4"
                                fontFamily="Roboto" 
                                fontWeight="bold"
                                color="blue"
                                onClick={() => {
                                    navigate("/login");
                                    resetForm();
                                }}
                                sx={{ml: 1,
                                    '&:hover': {
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }
                                }}
                                
                                >
                                Login
                            </Typography>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default RegisterForm;
