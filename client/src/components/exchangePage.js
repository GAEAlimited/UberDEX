import React, {Component} from 'react';
import Datafeed from './TVChartContainer/api/index';
import TradingCenter from './Exchange/tradingPlatform2';
import Callaction from './callAction';
import Footer from './footer';
import Header from './header';
import Order from './Exchange/order.js';
import Trading from './Exchange/trading.js';
import data from '../app.json';

var color = {background: data['theme_color']};

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openOrders : false,
        }

        this.updateOpenOrders = this.updateOpenOrders.bind(this);

    }

    updateOpenOrders(newOrders){
        this.setState({openOrders: newOrders})

    }
    render(){
     
        return(
            <div className="marketPage">
                {/* <div className="wellcomBanner background" style={color}>
                    <Header updateScatterID={this.props.updateScatterID} scatterID={this.props.scatterID}/>
                </div> */}
                {/* <Trading /> */}
                <TradingCenter updateOpenOrders={this.updateOpenOrders} scatterID={this.props.scatterID} updateScatterID={this.props.updateScatterID}/>
                {/* <Order scatterID={this.props.scatterID} updateScatterID={this.props.updateScatterID} openOrders={this.state.openOrders}/> */}
            </div>
        )
    }
}

export default Home;