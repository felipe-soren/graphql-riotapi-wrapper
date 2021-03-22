const summonerResolvers = {
  Query: {
    summoner: (root, { name }, { dataSources }) =>
      dataSources.riotSummonerAPI.getSummoner(name),
  },
};

module.exports = summonerResolvers;
