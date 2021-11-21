import React from 'react';
import { NavLink, Route, BrowserRouter as Router, Switch, useParams } from 'react-router-dom';
import './App.css';
import { ZoneList } from './zones/components/ZoneList';
import { ZoneDetail } from './zones/components/ZoneDetail';
// import ReactAdmin from './admin/adminApp';
import { BossList } from './bosses/components/BossList';
import { BossDetail } from './bosses/components/BossDetail';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function ZoneKeyRoute(){
  let { zoneKey } = useParams() as any;
  return (
    <ZoneDetail key={zoneKey} zoneKey={Number(zoneKey)} />
  );
}

function BossDetailKeyRoute(){
  let { bossId } = useParams() as any;
  return (
    <p><BossDetail bossId={Number(bossId)}/></p>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Ulala Rotation Tool</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/zones" className="nav-link" activeClassName="active">Zones</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/boss-list" className="nav-link" activeClassName="active">Bosses</NavLink>
                </li>
              </ul>
              <form className="d-flex disabled">
                <input className="form-control me-2 disabled" disabled type="search" placeholder="Search"
                       aria-label="Search" />
                <button className="btn btn-outline-success" type="submit" disabled>Search</button>
              </form>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            Nothing here
          </Route>
          <Route path="/zones">
            <ZoneList key="zone-list" />
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
        </Switch>
      </div>
    </Router>
  );
}


export default App;
