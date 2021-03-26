const { RESTDataSource } = require("apollo-datasource-rest");

class RiotSummonerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://br1.api.riotgames.com/lol";
    this.token = process.env.RIOT_TOKEN;
  }

  willSendRequest(request) {
    request.headers.set("X-Riot-Token", this.token);
  }

  async _getSummonerLeague(summonerId) {
    return await this.get(`/league/v4/entries/by-summoner/${summonerId}`);
  }

  async _getSummonerHistory(summonerId) {
    return await this.get(`match/v4/matchlists/by-account/${summonerId}?endIndex=10`)
  }

  async getSummoner(name) {
    if (!name) throw new Error("Valid sumonerName not provided");

    const userData = await this.get(`/summoner/v4/summoners/by-name/${name}`);
    const leagueData = await this._getSummonerLeague(userData.id);
    const {matches} = await this._getSummonerHistory(userData.accountId)

    return {
      ...userData,
      leagues: leagueData,
      history: matches,
    };
  }
}

module.exports = RiotSummonerAPI;
