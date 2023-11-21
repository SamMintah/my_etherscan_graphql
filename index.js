const { ApolloServer } = require('apollo-server'); 
// Import Apollo Server to set up GraphQL server

const { importSchema } = require('graphql-import');
// Import graphql-import to load schema from .graphql file 

const EtherDataSource = require('./datasource/ethDatasource');
// Import data source class to interface with Etherscan APIs

const typeDefs = importSchema('./schema.graphql'); 
// Load schema from schema.graphql file

require('dotenv').config(); 
// Load environment variables from .env file

const resolvers = {
 Query: {
   etherBalanceByAddress: (root, _args, { dataSources }) =>  
     dataSources.ethDataSource.etherBalanceByAddress(),
     // Resolver to call etherBalanceByAddress API

   totalSupplyOfEther: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.totalSupplyOfEther(),  
     // Resolver to call totalSupplyOfEther API

   latestEthereumPrice: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getLatestEthereumPrice(),
     // Resolver to call getLatestEthereumPrice API

   blockConfirmationTime: (root, _args, { dataSources }) =>  
     dataSources.ethDataSource.getBlockConfirmationTime(),
     // Resolver to call getBlockConfirmationTime API
 },
};

const server = new ApolloServer({
 typeDefs,
 resolvers,
 dataSources: () => ({
   ethDataSource: new EtherDataSource() 
 })
});

// Create Apollo Server instance

server.timeout = 0; 
// Disable response timeout

server.listen('9000').then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`);
});
// Start Apollo Server on port 9000
