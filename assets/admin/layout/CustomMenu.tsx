import { MenuItemLink, UserMenu } from 'react-admin';
import { forwardRef } from 'react';
import { ExitToApp } from '@mui/icons-material';

const ConfigurationMenu = forwardRef(({ children }, ref) => (
    <MenuItemLink
        ref={ref}
        to="/admin"
        primaryText="Backoffice"
        leftIcon={<ExitToApp />}
    />
));

const CustomMenu = (props:any) => (
    <UserMenu {...props}>
        <ConfigurationMenu />
    </UserMenu>
);

export default CustomMenu;
