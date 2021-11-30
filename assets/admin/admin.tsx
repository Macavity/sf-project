import React, { forwardRef } from 'react';
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
import { AppBar, Layout, UserMenu } from 'react-admin';
import { MenuItem } from '@mui/material';

const entrypoint = '/api';

const useEmbedded = true;
const dataProvider = hydraDataProvider(
    entrypoint,
    fetchHydra,
    parseHydraDocumentation,
    useEmbedded
);
const ConfigurationMenu = forwardRef(({}) => (
    <MenuItem onClick={() => {
        window.location.href = '/admin';
    }}>Backoffice</MenuItem>
));
ConfigurationMenu.displayName = 'ConfigurationMenu';

const MyUserMenu = (props: any) => (
    <UserMenu {...props}>
        <ConfigurationMenu/>
    </UserMenu>
);
const MyAppBar = (props: any) => <AppBar {...props} userMenu={<MyUserMenu/>}/>;
const CustomLayout = (props: any) => <Layout
    {...props}
    appBar={MyAppBar}
/>;

const Admin = () => (
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

export default Admin;
