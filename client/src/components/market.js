import React, {Component} from 'react';
import Header from './header';
import EOS from './Home/eosMarket';
import Callaction from './callAction';
import Footer from './footer';

class Home extends Component{
    render(){
       
        return(
            <div className="marketPage">
                <div className="wellcomBanner">
                    <Header />
                </div>
                <EOS />
                <Callaction />
                <Footer />
            </div>
        )
    }
}

export default Home;