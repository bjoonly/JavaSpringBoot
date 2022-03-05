import { Typography, Breadcrumbs } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const LinkRouter = (props: any) => (
    <Link {...props} component={RouterLink as any} />
);


const breadcrumbNameMap: { [key: string]: string } = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',
    '/users': 'Users',
    '/regions': 'Regions',
    '/regions/create': "Create",
    '/hotels': 'Hotels',
    '/hotels/create': "Create",
    '/hotels/edit': "Edit"
};

const BreadcrumbsMenu: React.FC = () => {


    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);


    return (
        <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter underline="none" color="inherit" to="/">
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                    <Typography color="text.primary" key={to}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter underline="none" color="inherit" to={to} key={to}>
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
}
export default BreadcrumbsMenu;