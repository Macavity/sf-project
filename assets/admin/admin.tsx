import React, { forwardRef } from 'react';
// @ts-ignore
import { fetchHydra, HydraAdmin, hydraDataProvider, ResourceGuesser } from '@api-platform/admin';
import { parseHydraDocumentation } from '@api-platform/api-doc-parser';
import continents from './components/Continents';
import partySetups from './components/PartySetups';
import zones from './components/Zones';
import bosses from './components/Bosses';
import stages from './components/stages';
import jobs from './components/Jobs';
import skills from './components/Skills';
import jobRotations from './components/JobRotation';
import { AppBar, Layout, Menu, MenuItemLink, MenuProps, UserMenu } from 'react-admin';
import { MenuItem } from '@mui/material';

const entrypoint = '/api';

const useEmbedded = true;
const dataProvider = hydraDataProvider(
    entrypoint,
    fetchHydra,
    parseHydraDocumentation,
    useEmbedded
);
const ConfigurationMenu = forwardRef(({}, ref) => (
    <MenuItem onClick={() => {
        window.location.href = '/admin';
    }}>Backoffice</MenuItem>
));
const MyUserMenu = (props: any) => (
    <UserMenu {...props}>
        <ConfigurationMenu/>
    </UserMenu>
);
const MyMenu = (props: MenuProps) => (
    <Menu {...props}>
        <MenuItemLink to="/admin" primaryText="Backoffice"/>
        {props.children}
    </Menu>
);
const MyAppBar = (props: any) => <AppBar {...props} userMenu={<MyUserMenu/>}/>;
const CustomLayout = (props: any) => <Layout
    {...props}
    appBar={MyAppBar}
/>;

export default () => (
    <HydraAdmin dataProvider={dataProvider}
                layout={CustomLayout}
                entrypoint={entrypoint}>
        <ResourceGuesser name="continents" {...continents} />
        <ResourceGuesser name="zones" {...zones} />
        <ResourceGuesser name="bosses" {...bosses} />
        <ResourceGuesser name="stages" {...stages} />

        <ResourceGuesser name="jobs" {...jobs} />
        <ResourceGuesser name="job_rotations" {...jobRotations} />
        <ResourceGuesser name="skills" {...skills}/>
        <ResourceGuesser name="party_setups" {...partySetups} />
    </HydraAdmin>
);
