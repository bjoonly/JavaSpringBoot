import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    ListItem,
    ListItemProps,
    ListItemText,
} from "@mui/material";
import {
    Link as RouterLink
} from 'react-router-dom';


interface ListItemLinkProps extends ListItemProps {
    to: string;
    open?: boolean;
}
const breadcrumbNameMap: any = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',
};

export const ListItemLink: React.FC<any> = (props) => {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    let icon = null;
    if (open != null) {
        icon = open ? <ExpandLess /> : <ExpandMore />;
    }

    return (
        <li>
            <ListItem button component={RouterLink as any} to={to} {...other}>
                <ListItemText primary={primary} />
                {icon}
            </ListItem>
        </li>
    );
}