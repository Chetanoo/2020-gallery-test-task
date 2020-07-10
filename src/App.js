import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header";
import About from "./components/About";
import Main from "./containers/Main";
import User from "./containers/User";
import Album from "./containers/Album";

function App() {
  return (
    <div className="App">
        <Header />
        <div className="container">
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/user/:userId">
                    <User />
                </Route>
                <Route exact path="/user/:userId/:albumId">
                    <Album />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Switch>
        </div>
    </div>
  );
}

export default App;
