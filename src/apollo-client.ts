import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({

  
        uri: "https://graphql.bitquery.io",
        cache: new InMemoryCache(),
        headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYTYsxZMZA47wBr1PvuU8jYWieM3HSd"
        },  



})

export default client;