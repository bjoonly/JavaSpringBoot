import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { LoginSchema } from "./validation";
import { useActions } from "../../../hooks/useActions";
import { ILoginModel } from "../types";


const Login = () => {
    const { LoginUser } = useActions();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const loginModel: ILoginModel = { email: '', password: '' };

    useEffect(() => {
        document.title = "Login";
    }, []);

    const formik = useFormik({
        initialValues: loginModel,
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                await LoginUser(values);
                navigate("/");
                toast.success('Login Success!');
            }
            catch (exception) {
                let message = "Login failed! \n";
                if (exception === 401)
                    message += "The user with the entered data does not exist.";
                toast.error(message);
            }

        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <Grid container component="main" pt={1}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/featured/?nature)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "84.9vh",
                    }}
                >
                    <Typography component="h1" variant="h4" mt={1.5} >
                        Log in
                    </Typography>
                    <Box sx={{ mt: 1 }} >
                        <FormikProvider value={formik} >
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit} >

                                <Grid sx={{ p: 5, }} container spacing={4}>
                                    <Grid item xs={8} mx="auto">
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            autoComplete="username"
                                            type="email"
                                            label="Email address"
                                            variant="outlined"
                                            {...getFieldProps('email')}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={8} mx="auto">
                                        <TextField
                                            fullWidth
                                            autoComplete="current-password"
                                            type={showPassword ? 'text' : 'password'}
                                            label="Password"
                                            variant="outlined"
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
                                            Sign In
                                        </LoadingButton>
                                    </Grid>
                                    <Grid item xs={10} mt={3} display="flex" justifyContent="flex-end">
                                        <Typography >
                                            Don’t have an account? <Typography component={Link} variant="h6" style={{ textDecoration: 'none', color: '#6690fc' }} to="/auth/register">Sign Up.</Typography>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Form>
                        </FormikProvider>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;