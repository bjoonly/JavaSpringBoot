import * as React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Container,
    Typography,
    Button,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';

const Header: React.FC = () => {
    const { user, isAuth } = useTypedSelector((state) => state.auth);
    const { LogoutUser } = useActions();
    const navigate = useNavigate();

    const onLogout = async () => {
        await LogoutUser();
        navigate("/");
    }
    return (

        <Box sx={{ flexGrow: 1 }} mb={{ xs: 9, sm: 11 }}  >
            <AppBar sx={{ background: "#18181b", borderBottom: 1, borderColor: '#45A29E' }} position="fixed" >
                <Container >
                    <Toolbar >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/" style={{ textDecoration: 'none' }}>
                                Hotel
                            </Typography>
                            <Typography variant="body1" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/users" style={{ textDecoration: 'none' }}>
                                Users
                            </Typography>
                            <Typography variant="body1" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/regions/create" style={{ textDecoration: 'none' }}>
                                Regions
                            </Typography>
                            <Typography variant="body1" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/hotels" style={{ textDecoration: 'none' }}>
                                Hotels
                            </Typography>
                        </Box>


                        {(!isAuth) ?
                            <>
                                <Typography variant="body1" sx={{ pl: 5 }} noWrap color="inherit" component={Link} to="/auth/login" style={{ textDecoration: 'none' }}>
                                    Login
                                </Typography>
                                <Typography variant="body1" sx={{ pl: 5 }} noWrap color="inherit" component={Link} to="/auth/register" style={{ textDecoration: 'none' }}>
                                    Register
                                </Typography>
                            </>
                            :
                            <>
                                <Typography variant="body1" sx={{ pr: 1 }}>{user.fullName}</Typography>
                                <Button onClick={onLogout} >Logout</Button>
                            </>
                        }


                    </Toolbar>
                </Container>
            </AppBar >
        </Box >

    );
};

export default Header;