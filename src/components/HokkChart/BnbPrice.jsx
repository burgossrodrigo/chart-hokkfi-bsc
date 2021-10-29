import { gql, useQuery  } from '@apollo/client';

const BnbPrice = () => {

const BNB_DATA =  gql`
query chart{
    ethereum(network: bsc) {
    dexTrades(
      options: {desc: ["block.height","tradeIndex"], limit: 1}
      exchangeName: {in: ["Pancake", "Pancake v2"]}
      baseCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
      quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
      date: {after: "2021-10-28"}
    ) {
      transaction {
        hash
      }
      tradeIndex
      smartContract {
        address {
          address
        }
        contractType
        currency {
          name
        }
      }
      tradeIndex
      block {
        height
      }
      baseCurrency {
        symbol
        address
      }
      quoteCurrency {
        symbol
        address
      }
      quotePrice
   
    }
  }
}
`;

const { loadingBNB, dataBNB } = useQuery(BNB_DATA);

    if(loadingBNB)
    return 1;
    
    return dataBNB;

}

export default BnbPrice;