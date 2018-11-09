import React, {Component} from 'react';
import Datafeed from '../TVChartContainer/api/index';
import $ from "jquery";
import Eos from 'eosjs';

import data from '../../app.json';
var color = {background: data['theme_color']};
var colors = {color: data['theme_color']};

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function tackerView(e) {
    e.preventDefault();
    var views = e.target.id;
    $('#view'+views).fadeIn();
}
function closeView(e){
    e.preventDefault();
    $('.tradeWrap').fadeOut();
}

// ScatterJS.plugins( new ScatterEOS() );

const network = {
                blockchain:'eos',
                protocol:'https://cors-anywhere.herokuapp.com/http',
                host:'13.52.54.111',
                eosVersion: 'bf28f8bb',
                port:8888,
                chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
                debug: false,
                verbose: false,
                latency: 200,
                sign: true
            }
// const network = { blockchain:'eos',
//             protocol:'https',
//             host:'proxy.eosnode.tools',
//             port:443,
//             chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' }

function handleClick(e) {
    e.preventDefault();
    var amount_two = e.target.nextSibling.id;
    var amount_twos = e.target.nextSibling.nextSibling.id;
    var amount = e.target.id;
  //  console.log(amount_twos);
    document.getElementById('price').value = amount;
    document.getElementById('buyPrices').value = amount_two;
    //document.getElementById('sellPrice').value = amount_twos;
  }



 function handleSell(e)
{
    e.preventDefault();
    
     var url = new URL(window.location.href);
        var c = url.searchParams.get("opt");

            const network = {
                blockchain:'eos',
                protocol:'http',
                host:'13.57.210.230',
                eosVersion: 'bf28f8bb',
                port:8888,
                chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
                debug: false,
            verbose: false,
            latency: 200
            }
            let scatter = this.props.scatterID

            if(scatter.identity) {
                var bprice= parseFloat($('#BuyPricetwo').val());
                var sellPrice= parseFloat($('#sellPricetwo').val());
                
                let hash = scatter.identity.hash;
     
                var tps=1;
                let datas = {
                        "side": "SELL",
                        "assetBuy": "EOS",
                        "assetSell": c,
                        "amountBuy": 0,
                        "amountSell": bprice,
                        "price": sellPrice,
                        "expires": "",
                        "type": tps,
                        "hash": hash,
                        "useraccount": scatter.identity.accounts[0].name
                    };
     fetch('https://api.byzanti.ne/orderMake/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N', {
     method: 'POST',headers: {
    //  'Accept': 'application/json',
    'Content-Type': 'application/json',
  },  body: JSON.stringify(datas)})
        .then(response => {
            response.json();
            console.log(response);
        })
        // .then(data => window.location.reload()
    // );
        
            }
            else
            {
                $('.signInPopup ').fadeIn();
            }
     
    // });
}
function changeSellPrice1(e)
{
     e.preventDefault();
    var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#price').val());
    $('#sellPrice').val(price*sellPrice);
}
function changeSellPrice(e)
{
    e.preventDefault();
    var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#price').val());
    $('#buyPrice').val(price/sellPrice);
    
}
function changeBuyPrice1(e)
{
    e.preventDefault();
     var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#priceTwo').val());
    $('#sellPricetwo').val(price*sellPrice);
}
function changeBuyPrice(e)
{
    e.preventDefault();
     var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#priceTwo').val());
    $('#BuyPricetwo').val(price/sellPrice);
}


function handleClicks(e) {
    e.preventDefault();
    var amount_four = e.target.nextSibling.id;
    var amount_fours = e.target.nextSibling.nextSibling.id;
    var amounts = e.target.id;
    document.getElementById('priceTwo').value = amounts;
    document.getElementById('BuyPricetwos').value = amount_four;
   // document.getElementById('sellPricetwo').value = amount_fours;
  }


 var url = new URL(window.location.href);
var c = url.searchParams.get("opt");
class tradingHead extends Component{
     
	static defaultProps = {
		symbol: 'EOS:'+c+'/USD',
		interval: '15',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
    };
    
    constructor(props) {
        super(props);
    
        this.state = {
          tricker: [],
          orders: [],
          orderBook: [],
          orderBooks: [],
          pairedScatter: false,
          tacker: [],
          apil:'SEED',
        };

        this.signIn = this.signIn.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.registerUser = this.registerUser.bind(this);
      }

      async registerUser() {
        var myBuffer = [];
        var str = 'EOS8JiHBp5d8dwAVWsK4BqWztDxv6YGpL4m5zazcjk5GJ4tX7omjY';
        var buffer = new Buffer(str, 'utf16le');
        for (var i = 0; i < buffer.length; i++) {
            myBuffer.push(buffer[i]);
        }
        const eosOptions = { expireInSeconds:60 }
        const eos = this.props.scatterID.eos(network, Eos, eosOptions);
        const action = [{
            account: 'exchange',
            name: 'registeruser',
            authorization: [{
                actor: 'ideos',
                permission: 'active'
            }], data :
            {
                user: 'ideos',
                publickey: myBuffer
            }
        }]
        let dep = await eos.transaction({ actions: action})
        console.log(dep);

      }

      async deposit() {
          const eosOptions = { expireInSeconds:60 }
          const eos = this.props.scatterID.eos(network, Eos, eosOptions)
          let dep = await eos.transfer('ideos', 'exchange', '0.0001 EOS', 'deposit');
          console.log("dep: ", dep)

      }

      async withdraw() {
        const eosOptions = { expireInSeconds:60 }
        const scatter = this.props.scatterID;
        const eos = scatter.eos(network, Eos, eosOptions);
        const action = {
                from: 'ideos',
                amount: '0.1000 EOS@ideos'
            };
         let acts = [{
            account: 'exchange',
            name: 'withdraw',
            authorization: [{
                actor: 'ideos',
                permission: 'active'
            }],
            action
        }]
        let signature = await scatter.getArbitrarySignature(scatter.identity.publicKey, action.toString(), "test UberDEX withdraw", false);
        // let w = await eos.transaction({ actions: acts});
       
        // action.sig = signature;
        // let withdrawApi = await fetch('https://api.byzanti.ne/exwithdraw/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N', {
        //     method: 'POST',
        //     headers: {
        //  //  'Accept': 'application/json',
        //    'Content-Type': 'application/json'
        // },  
        //     body: JSON.stringify(action)});

         console.log("withdraw ", eos);


      }

      async handleBuy(e) {
        e.preventDefault();
        var url = new URL(window.location.href);
        var c = url.searchParams.get("opt");
        let scatter = this.props.scatterID;
        // let hash = scatter.identity;
        // console.log(hash);
        // let eos = scatter.eos(network, Eos)
        // console.log(ScatterJS);
        
        // let trans = await scatter.eos(network, Eos).transfer('ideos', 'reddy', '0.0001 EOS', 'test uberDEX');
        if(scatter.identity){
           var bprice= parseFloat($('#buyPrice').val());
           var sellPrice= parseFloat($('#sellPrice').val());
           var tps=1;
           let datas = {
              "side": "BUY",
              "assetBuy": c,
              "assetSell": "EOS",
              "amountBuy": bprice,
              "amountSell": 0,
              "price": sellPrice,
              "expires": "",
              "type": tps,
              "useraccount": scatter.identity.accounts[0].name
        };
        let signature = await scatter.getArbitrarySignature(scatter.identity.publicKey, datas.toString(), "test UberDEX buy", false);

        datas.hash = signature;
        console.log("datas: ", datas)
         fetch('https://api.byzanti.ne/orderMake/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N', {
         method: 'POST',headers: {
      //  'Accept': 'application/json',
        'Content-Type': 'application/json',
      },  body: JSON.stringify(datas)})
            .then(response => {
                response.json()
                console.log("response: ", response);
            })
            
                }
                else {
                    $('.signInPopup ').fadeIn();
                    }
         
    }


    
    async componentDidMount() {
        const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				"mainSeriesProperties.showCountdown": true,
				"paneProperties.background": "#fff",
				"paneProperties.vertGridProperties.color": "#363c4e",
				"paneProperties.horzGridProperties.color": "#363c4e",
				"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.textColor" : "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
			}
		};

		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);

			widget.onChartReady(() => {
				console.log('Chart has loaded!')
			});
        });
        
        var url = new URL(window.location.href);
         var c = url.searchParams.get("opt");
      
        var API = 'https://api.byzanti.ne/ticker?symbol='+c+'&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APIS = 'https://api.byzanti.ne/orderBook?symbol='+c+'&side=BUY&size=11&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APISS = 'https://api.byzanti.ne/orders?symbol='+c+'&side=BUY&size=22&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var orderTaker = 'https://api.byzanti.ne/tradebook?symbol='+c+'&size=100&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        fetch(API)
        .then(response => response.json())
        .then(data => {this.setState({ tricker: data }); });
        
        fetch(APISS)
        .then(response => response.json())
        .then(data => {this.setState({ orders: data }); });
        
        fetch(APIS)
        .then(response => response.json())
        .then(data => {
            this.setState({ orderBook: data['asks'], orderBooks: data['bids'] }); });

        fetch(orderTaker)
        .then(response => response.json())
        .then(data => {this.setState({ tacker: data }); });


        // try{f
        console.log("scatterID: ", this.props.scatterID);
        if(this.props.scatterID){
            const scatter = this.props.scatterID;
            await scatter.connect("UberDEX");
            const requiredFields = { accounts:[network] };
            
            await scatter.getIdentity(requiredFields);
            if(scatter.identity.accounts[0].name) this.setState({pairedScatter: true})
            console.log(this.state.pairedScatter);
            // console.log(scatter.eos(network, Eos))
            $('#signin').hide();
            $('#signout').css('display','inline-block');
            $('.bgs').html(scatter.identity.accounts[0].name);

        }
   
        
    }

    async signIn(e){
        e.preventDefault();
        $('.signInPopup ').fadeIn();
    }


    


    render(){
        const { tricker } = this.state;
        const { orders } = this.state;
        const { orderBook } = this.state;
        const { orderBooks } = this.state;
        const { tacker } = this.state;
       
        return(
            <div className="tradingCenter">
                <div className="container clearfix">
                    <div className="lefts">
                        <div id="tabs">
                            <ul>
                                <li><a href="#tabs-1">Depth</a></li>
                                <li><a href="#tabs-2">Buy</a></li>
                                <li><a href="#tabs-3">Sell</a></li>
                            </ul>
                            <div id="tabs-1">
                               <table>
                                    <thead>
                                        <tr>
                                            <th>Price(EOS)</th>
                                            {tricker.map(hit => <th>{hit.symbol} </th>  )}
                                            <th>Total(EOS)</th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {orderBooks.map(bids => 
                                            <tr>
                                                <td className='minus' id={bids.price}  onClick={handleClicks}>{bids.price}</td>
                                                <td id={bids.amountBuy}>{bids.amountBuy}</td>
                                                <td id={bids.amountSell}>{bids.amountSell}</td>
                                            </tr>
                                        )}
                                        {orderBook.map(ask => 
                                            <tr>
                                                <td className='plus' id={ask.price}  onClick={handleClick}>{ask.price}</td>
                                                <td id={ask.amountSell}>{ask.amountSell}</td>
                                                <td id={ask.amountBuy}>{ask.amountBuy}</td>
                                            </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div id="tabs-2">
                            <table>
                                    <thead>
                                        <tr>
                                            <th>Price(EOS)</th>
                                            {tricker.map(hit => <th>{hit.symbol} </th>  )}
                                            <th>Total(EOS)</th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {orderBook.map(ask => 
                                            <tr>
                                                <td className='plus' id={ask.price}  onClick={handleClick}>{ask.price}</td>
                                                <td id={ask.amountSell}>{ask.amountSell}</td>
                                                <td id={ask.amountBuy}>{ask.amountBuy}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div id="tabs-3">
                            <table>
                                    <thead>
                                        <tr>
                                            <th>Price(EOS)</th>
                                            {tricker.map(hit => <th>{hit.symbol} </th>  )}
                                            <th>Total(EOS)</th>
                                    </tr>
                                    </thead>
                                    
                                   
                                    <tbody>
                                        {orderBooks.map(bids => 
                                            <tr>
                                                <td className='minus' id={bids.price}  onClick={handleClicks}>{bids.price}</td>
                                                <td id={bids.amountBuy}>{bids.amountBuy}</td>
                                                <td id={bids.amountSell}>{bids.amountSell}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="center">
                    <div id={ this.props.containerId } className={ 'TVChartContainer' }></div>

                        <div className="clearfix"></div>
                        <div className="calculator">
                            <h4>Limit Order </h4>
                            <div className="clearfix">
                                <div>
                                    {tricker.map(hit =>
                                        <h6>Buy {hit.symbol} <span>Balance:0.0000 EOS</span></h6>
                                    )}
                                    <label>Price <span>EOS</span> </label>
                                    <input type="text" id="price" />
                                    <label>Amount {tricker.map(hit =>
                                        <span>{hit.symbol} </span>
                                    )}</label>
                                     <input type="hidden" id="buyPrices"  />
                                   
                                    <input type="text" id="buyPrice" onChange={changeSellPrice1} />
                                    <label>Total  <span>EOS</span>
                                    </label>
                                    <input type="text"  id="sellPrice" />
                                    {this.props.scatterID ? <input type="submit" value="Buy" onClick={this.handleBuy}/> : <input type="submit" value="Signin to trade" onClick={this.signIn}/>}
                                    {/* <input type="text"  id="sellPrice" onChange={changeSellPrice} /> */}
                                </div> 
                                <div className="red">
                                    {tricker.map(hit =>
                                        <h6>Sell {hit.symbol} <span>Balance:0.0000 EOS</span></h6>
                                    )}
                                    <label>Price <span>EOS</span> </label>
                                    <input type="text"  id="priceTwo" />
                                    <label>Amount {tricker.map(hit =>
                                        <span>{hit.symbol} </span>
                                    )}</label>
                                    <input type="hidden" id="BuyPricetwos"/>
                                    
                                    <input type="text" id="BuyPricetwo"  onChange={changeBuyPrice1} />
                                    <label>Total <span>EOS</span></label>
                                    <input type="text" id="sellPricetwo" />
                                    {this.props.scatterID ? <input type="submit" value="Sell" onClick={this.withdraw}/> : <input type="submit" value="Signin to trade" onClick={this.signIn}/>}
                                    {/* <input type="text" id="sellPricetwo" onChange={changeBuyPrice} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="orderTacker">
                            <h4>Latest transactions</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Price(EOS)</th>
                                        {tricker.map(hit => <th>{'Amount('+hit.symbol+')'} </th>  )}
                                        <th>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tacker.map(tackers => 
                                        <tr>
                                            <td className={'plus '+tackers.assetBuy} id={tackers.tradeId}  onClick={tackerView}>{tackers.price}</td>
                                            <td>{tackers.amountBuy}</td>
                                            <td>{tackers.takerExchange}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {tacker.map(tackers =>
                    
                        <div className="tradeWrap" id={'view'+tackers.tradeId}>
                            <div className="tradeView">
                                <a href="/" className="closeView"  onClick={closeView}><i className="fa fa-times"></i></a>
                                <div className="viewTop">
                                    <ul>
                                        <li><span>Price</span>{tackers.price} EOS</li>
                                        <li><span>Volume</span>{tackers.amountBuy} {tackers.assetBuy}</li>
                                        <li><span>Total</span>{tackers.amountSell} EOS</li>
                                        <li><span>Date</span> {tackers.created}</li>
                                    </ul>
                                </div>
                                <div className="viewBottom clearfix">
                                    <ul>
                                        <li><h3>Maker</h3></li>
                                        <li><span>EOS Account Name</span> <cite>{tackers.maker}</cite> </li>
                                        <li><span>Total</span> <cite>{tackers.amountBuy} {tackers.assetBuy}</cite> </li>
                                        <li><span>Fee</span> <cite>{tackers.makerFee} {tackers.assetBuy}</cite> </li>
                                        <li><span>Maker Exchange</span> {tackers.makerExchange} <cite></cite> </li>
                                        <li><span>Time stamp</span> <cite>{tackers.timestamp}</cite> </li>
                                        <li><span>Trade Id</span> <cite className="tradeId">{tackers.tradeId}</cite> </li>
                                    </ul>
                                    
                                    <ul>
                                        <li><h3>Taker</h3></li>
                                        <li><span>EOS Account Name</span> <cite>{tackers.taker}</cite> </li>
                                        <li><span>Total</span> <cite>{tackers.amountSell} EOS</cite> </li>
                                        <li><span>Fee</span> <cite>{tackers.takerFee} EOS</cite> </li>
                                        <li><span>Taker Exchange</span> <cite>{tackers.takerExchange}</cite> </li>
                                        <li><span>Time stamp</span> <cite>{tackers.timestamp}</cite> </li>
                                        <li><span>Trade Id</span> <cite className="tradeId">{tackers.tradeId}</cite> </li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    )}
                </div>
            </div>
        )
    }
}

export default tradingHead;