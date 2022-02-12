import { Container } from '@mui/material';
import * as React from 'react';
import { Outlet } from "react-router";
import Breadcrumbs from '../../comon/Breadcrumbs';
import Header from './Header';



const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Container>
                <Breadcrumbs />
                <Outlet />
            </Container>
        </>
    );
}
export default DefaultLayout;