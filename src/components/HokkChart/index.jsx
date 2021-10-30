
import React, { useState, useEffect } from 'react';
import { gql, useQuery  } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import Grid from '@mui/material/Grid';
import hokklogo from '../../assets/images/hokklogo.png';
import usdclogo from '../../assets/images/usdclogo.png';
import styled from 'styled-components';
import { curveCardinal } from 'd3-shape';
import { Typography } from '@mui/material';

const HokkChart = () =>{

  const cardinal = curveCardinal.tension(0.01);

const [bnbData, setBnbData] = useState({});
const [hokkPrice, setHokkPrice] = useState();



useEffect(() => {
  // GET request using fetch inside useEffect React hook
  fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT', {cache: "force-cache"})
      .then(response => response.json())
      .then(fetchData => setBnbData(fetchData));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

useEffect(() => {
  // GET request using fetch inside useEffect React hook
  fetch('https://api.pancakeswap.info/api/v2/tokens/0x36a92f809da8c2072b090a9e3322226c5376b207', {cache: "force-cache"})
      .then(response => response.json())
      .then(fetchData => setHokkPrice(fetchData.data.price));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

  const CHART_DATA =  gql`
  query chart{
ethereum(network: bsc) {
dexTrades(
options: {limit: 1000, asc: "timeInterval.minute"}
date: {since: "2021-04-27"}
exchangeName: {in:["Pancake","Pancake v2"]}
baseCurrency: {is: "0x36a92f809da8c2072b090a9e3322226c5376b207"}
quoteCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
) {
timeInterval {
  minute(count: 5)
}
baseCurrency {
  symbol
  address
}
baseAmount
quoteCurrency {
  symbol
  address
}
quoteAmount
trades: count
quotePrice
maximum_price: quotePrice(calculate: maximum)
minimum_price: quotePrice(calculate: minimum)
open_price: minimum(of: block, get: quote_price)
close_price: maximum(of: block, get: quote_price)
}
}
}
`;
  
  const { loading, data } = useQuery(CHART_DATA);
  
  let changedData = [];

  
  

  
  while (loading || bnbData === undefined)
  
  return < CircularProgress />



  data.ethereum.dexTrades.map(chart_ => {

    const usdPrice = bnbData.price
    const time = chart_.timeInterval.minute;
    const price = chart_.maximum_price * Math.pow(10,2) * usdPrice;

    changedData.push({
      time: time,
      price: price
    });

    return changedData;

    
});


  
  return (
          
      <>   <Grid conteiner>
            <Grid conteiner>
                <Grid item>
                    <b>HOKK</b> / USDC    
                </Grid>
                <Grid item>
                    <h2>$ {Number(hokkPrice).toFixed(13)}</h2>
                </Grid>
            </Grid>
            <Grid item> 
                <ResponsiveContainer width='100%' height={400} >    
                    <AreaChart data={changedData} >
                        <Area type={cardinal} dataKey="price" label="price" />
                        <Tooltip />
                    </AreaChart>
                </ResponsiveContainer>
            </Grid>
          </Grid>
      </>
      
  
      );


}


export default HokkChart;

