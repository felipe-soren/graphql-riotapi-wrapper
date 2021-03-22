const { ApolloServer } = require("apollo-server");
const summonerResolvers = require("./resolvers/summonerResolvers");
const RiotSummonersAPI = require("./datasources/summoner");
const summonerSchema = require("./schemas/summoner.graphql");

const typeDefs = [summonerSchema];
const resolvers = [summonerResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      riotSummonerAPI: new RiotSummonersAPI(),
    };
  },
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Servidor rodando na porta ${url}`);
});
