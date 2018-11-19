import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';
import Home from './home';
import Exchange from './exchangePage';
import Market from './market';
import Support from './support';
import About from './about';
import Useragreement from './userAgreement';
import Contact from './contact';
import trade from './trade';
import traderule from './tradeRule';
import announcements from './announcements';
import failannouncement from './failAnnouncement';
import TransactionPage from './transactionPage';
import Account from './account';

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        return (
        <Switch>
            <Route exact path='/' render={(props) => {return <Home updateScatterID={this.updateScatterID} scatterID={this.state.scatterID}/>}} />
            <Route path='/exchange' render={(props) => {return <Exchange updateScatterID={this.updateScatterID} scatterID={this.state.scatterID}/>}}/>
            <Route path='/market' component={(props) => {return <Market updateScatterID={this.updateScatterID} scatterID={this.state.scatterID}/>}} />
            <Route path='/support' component={(props) => {return <Support updateScatterID={this.updateScatterID} scatterID={this.state.scatterID}/>}} />
            <Route path='/about' component={ About } />
            <Route path='/user_agreement' component={ Useragreement } />
            <Route path='/contact' component={(props) => {return <Contact updateScatterID={this.updateScatterID} scatterID={this.state.scatterID}/>}} />
            <Route path='/trade' component={ trade } />
            <Route path='/trade_rule' component={ traderule } />
            <Route path='/announcements' component={ announcements } />
            <Route path='/failannouncement' component={ failannouncement } />
            <Route path='/transaction' component={ TransactionPage } />
            <Route path='/account' component={(props) => {return <Account updateScatterID={this.updateScatterID} scatterID={this.state.scatterID}/>}} />
        </Switch>

  
        )
    }
}


export default Main;