import { Layout, UserMenu } from 'react-admin';
import CustomMenu from './CustomMenu';

const CustomLayout = (props: any) => <Layout
    {...props}
    menu={UserMenu}
    appBar={CustomMenu}
/>;

export default CustomLayout;
