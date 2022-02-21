import * as React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Container,
    Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

    return (
        <Box sx={{ flexGrow: 1 }} mb={{ xs: 9, sm: 11 }}  >
            <AppBar sx={{ background: "#18181b", borderBottom: 1, borderColor: '#45A29E' }} position="fixed" >
                <Container >
                    <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Box sx={{ flexGrow: 1 }} >

                            <Typography variant="h6" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/" style={{ textDecoration: 'none' }}>
                                Hotel
                            </Typography>

                            <Typography variant="body1" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/users" style={{ textDecoration: 'none' }}>
                                Users
                            </Typography>
                            <Typography variant="body1" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/regions/create" style={{ textDecoration: 'none' }}>
                                Regions
                            </Typography>
                            <Typography variant="body1" sx={{ mr: 3 }} noWrap color="inherit" component={Link} to="/hotels/create" style={{ textDecoration: 'none' }}>
                                Hotels
                            </Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        </Box >

    );
};

export default Header;