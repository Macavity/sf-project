import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import { ZoneList } from './zones/components/ZoneList';
import { ZoneDetail } from './zones/components/ZoneDetail';
import { BossList } from './bosses/components/BossList';
import { BossDetail } from './bosses/components/BossDetail';
import { TeamList } from './teams/components/TeamList';
import { AddPartySetupForm } from './party-setups/components/AddPartySetupForm';
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './components/NavBar';
import { ColorModeContext } from './components/ColorModeSwitcher';

function ZoneKeyRoute() {
    let { zoneKey } = useParams() as any;
    return (
        <ZoneDetail key={zoneKey} zoneKey={Number(zoneKey)}/>
    );
}

function BossDetailKeyRoute() {
    let { bossId } = useParams() as any;
    return (
        <p><BossDetail bossId={Number(bossId)}/></p>
    );
}

function AppRouter() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <ZoneList key="zone-list"/>
                </Route>
                <Route path="/boss-list">
                    <BossList/>
                </Route>
                <Route path="/zone/:zoneKey">
                    <ZoneKeyRoute/>
                </Route>
                <Route path="/boss/:bossId">
                    <BossDetailKeyRoute/>
                </Route>
                <Route path="/my-teams">
                    <TeamList/>
                </Route>
                <Route path="/add-setup">
                    <AddPartySetupForm/>
                </Route>
            </Switch>
        </Router>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const $body = document.getElementById('body')!;

                    if (prevMode === 'light') {
                        $body.classList.add('dark');

                        return 'dark';
                    } else {
                        $body.classList.remove('dark');

                        return 'light';
                    }
                });
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    // @ts-ignore
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppRouter/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
