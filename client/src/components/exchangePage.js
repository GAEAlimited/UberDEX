import React, {Component} from 'react';
import Header from './header';
import Trading from './Exchange/trading';
import TradingCenter from './Exchange/tradingPlatform';
import Order from './Exchange/order';
import Callaction from './callAction';
import Footer from './footer';

class Home extends Component{
    render(){
       
        return(
            <div className="marketPage">
                <div className="wellcomBanner">
                    <Header />
                </div>
                <Trading />
                <TradingCenter />
                <Order />
                <Callaction />
                <Footer />
            </div>
        )
    }
}

export default Home;