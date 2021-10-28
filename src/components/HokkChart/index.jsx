
import React from 'react';
import { gql, useQuery  } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
//import styled from 'styled-components'
/*
const StyledChart = styled.div`
  background-color: red;
`*/



const HokkChart = () =>{

        const CHART_DATA =  gql`
        query chart{
    ethereum(network: bsc) {
    dexTrades(
    options: {limit: 10000, asc: "timeInterval.minute"}
    date: {since: "2021-04-27"}
    exchangeName: {in:["Pancake","Pancake v2"]}
    baseCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
    quoteCurrency: {is: "0x36a92f809da8c2072b090a9e3322226c5376b207"}
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
  

  
  if (loading) 
  
  return < CircularProgress />

  data.ethereum.dexTrades.map((chart_) => {
    changedData.push({
      time: chart_.timeInterval.minute,
      value: chart_.maximum_price*Math.pow(10,12)
    });

    return changedData;
})

  console.log(changedData)
  
  return (
          
      <>
          <ResponsiveContainer width='100%' height={400} >
              <AreaChart data={changedData}>
                  <Area dataKey="value" />
              </AreaChart>
          </ResponsiveContainer>
      </>
      
  
      );

}



export default HokkChart;

