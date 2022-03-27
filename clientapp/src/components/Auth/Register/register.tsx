import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
    TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { useActions } from "../../../hooks/useActions";
import { IRegisterModel } from "../types";
import { RegisterSchema } from "./validation";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const { RegisterUser } = useActions();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const registerModel: IRegisterModel = { fullName: '', email: '', password: '', reCaptchaToken: '' };
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        document.title = "Register";
    }, []);

    const formik = useFormik({
        initialValues: registerModel,
        validationSchema: RegisterSchema,
        onSubmit: async (values: IRegisterModel) => {
            try {
                if (!executeRecaptcha) {
                    toast.error("Failed reCAPTCHA check")
                    return;
                }
                const reCaptchaToken = await executeRecaptcha();
                values.reCaptchaToken = reCaptchaToken;
                await RegisterUser(values);
                navigate("/");
                toast.success('Register success!');
            }
            catch (exception) {
                var message = "Something went wrong.\n" + exception;
                toast.error(message)
            }

        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <>
            <Grid container component="main" pt={1}>
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={5}
                    lg={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/featured/?nature)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '84.9vh'
                    }}
                />
                <Grid item xs={12} sm={12} md={7} lg={5}>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '84vh'
                        }}
                    >
                        <Typography component="h1" variant="h4" mt={1.5} >
                            Register
                        </Typography>
                        <Box sx={{ mt: 1 }} >
                            <FormikProvider value={formik} >
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >

                                    <Grid sx={{ p: 5, }} container spacing={4}>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                autoComplete="fullName"
                                                type="text"
                                                label="Full name"
                                                {...getFieldProps('fullName')}
                                                error={Boolean(touched.fullName && errors.fullName)}
                                                helperText={touched.fullName && errors.fullName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                autoComplete="email"
                                                type="text"
                                                label="Email"
                                                {...getFieldProps('email')}
                                                error={Boolean(touched.email && errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                autoComplete="password"
                                                type={showPassword ? 'text' : 'password'}
                                                label="Password"
                                                {...getFieldProps('password')}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleShowPassword} edge="end">
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                error={Boolean(touched.password && errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12} mt={3} display="flex" justifyContent="center" >
                                            <LoadingButton
                                                sx={{ paddingX: "35px" }}
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                loading={isSubmitting}

                                            >
                                                Register
                                            </LoadingButton>
                                        </Grid>
                                        <Grid item xs={12} mt={3} display="flex" justifyContent="flex-end">
                                            <Typography >
                                                Already have an account? <Typography component={Link} variant="h6" style={{ textDecoration: 'none', color: '#6690fc' }} to="/auth/login">Log in.</Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Form>
                            </FormikProvider>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default RegisterPage;