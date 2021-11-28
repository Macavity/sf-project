import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import { ZoneList } from './zones/components/ZoneList';
import { ZoneDetail } from './zones/components/ZoneDetail';
// import ReactAdmin from './admin/adminApp';
import { BossList } from './bosses/components/BossList';
import { BossDetail } from './bosses/components/BossDetail';
import { TeamList } from './teams/components/TeamList';
import { AddPartySetupForm } from './party-setups/components/AddPartySetupForm';

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

function App() {
    return (
        <Router>
            <div className="app">
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
            </div>
        </Router>
    );
}


export default App;
