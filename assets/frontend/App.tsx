import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import { ZoneList } from './zones/components/ZoneList';
import { ZoneDetail } from './zones/components/ZoneDetail';
import { BossList } from './bosses/components/BossList';
import { BossDetail } from './bosses/components/BossDetail';
import { CharacterList } from './teams/components/CharacterList';
import { AddPartySetupForm } from './party-setups/components/AddPartySetupForm';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import NavBar from './components/NavBar';
import { ColorModeContext } from './components/ColorModeSwitcher';

declare let window: IWindow;

function ZoneKeyRoute() {
    const { zoneKey } = useParams<{ zoneKey: string }>();
    return (
        <ZoneDetail key={zoneKey} zoneKey={Number(zoneKey)}/>
    );
}

function BossDetailKeyRoute() {
    const { bossId } = useParams<{ bossId: string }>();
    return (
        <BossDetail bossId={Number(bossId)}/>
    );
}

const basename = window.frontendState.frontController ? '/' + window.frontendState.frontController : '';

function AppRouter() {
    return (
        <Router basename={basename}>
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
                <Route path="/my-characters">
                    <CharacterList/>
                </Route>
                <Route path="/add-setup">
                    <AddPartySetupForm/>
                </Route>
            </Switch>
        </Router>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState('light' as PaletteMode);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const $body = window.document.getElementById('body');

                    if (prevMode === 'light') {
                        if ($body) {
                            $body.classList.add('dark');
                        }

                        return 'dark';
                    } else {
                        if ($body) {
                            $body.classList.remove('dark');
                        }

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
