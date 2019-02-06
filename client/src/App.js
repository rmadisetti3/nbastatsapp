import React, { Component } from "react";
import { Button } from "reactstrap";
import * as $ from "axios";
import "./App.css";
var unirest = require("unirest");

const Player = props => (
  <div>
    <img alt="" className="playerPic" src={props.playerPic} />
    <h4 className="playerName">{props.content}</h4>
    <p className="playerInfo">
      #{props.jersey} | {props.pos} | {props.playerTeamName} | {props.college} |{" "}
      {props.country} | {props.yearsPro} Years Pro
    </p>
    <table className="playerStats">
      <tr>
        <th>Points Per Game</th>
        <th>Assists Per Game</th>
        <th>Rebounds Per Game</th>
        <th>Steals Per Game</th>
        <th>Blocks Per Game</th>
        <th>Turnovers Per Game</th>
        <th>Field Goal %</th>
        <th>Three Point %</th>
        <th>Free Throw %</th>
      </tr>
      <tr>
        <td>{props.ppg}</td>
        <td>{props.apg}</td>
        <td>{props.rpg}</td>
        <td>{props.spg}</td>
        <td>{props.bpg}</td>
        <td>{props.tpg}</td>
        <td>{props.fgp}%</td>
        <td>{props.tpp}%</td>
        <td>{props.ftp}%</td>
      </tr>
    </table>
    <Button
      className="deleteBtn"
      color="danger"
      onClick={() => props.deleteHandler(props.id)}
    >
      Remove
    </Button>{" "}
  </div>
);

const PlayerList = props => (
  <div>
    {props.players.map((player, i) => (
      <Player
        id={player._id}
        key={i}
        content={player.content}
        jersey={player.jersey}
        pos={player.pos}
        playerTeamName={player.playerTeamName}
        college={player.college}
        country={player.country}
        yearsPro={player.yearsPro}
        ppg={player.ppg}
        apg={player.apg}
        rpg={player.rpg}
        fgp={player.fgp}
        ftp={player.ftp}
        tpp={player.tpp}
        spg={player.spg}
        tpg={player.tpg}
        bpg={player.bpg}
        playerPic={player.playerPic}
        deleteHandler={props.deleteHandler}
      />
    ))}
  </div>
);

const PlayerSelector = props => (
  <div>
    <h2>Player Search</h2>
    <form>
      <input
        className="inputPlayerName"
        value={props.value}
        onChange={props.changePlayerHandler}
        placeholder="Enter the full name of a current NBA player"
      />
      <Button
        className="submitBtn"
        color="primary"
        onClick={props.submitHandler}
      >
        Search
      </Button>
    </form>
  </div>
);

const TeamSelector = props => (
  <div>
    <h2>Team Search</h2>
    <input
      className="inputTeam"
      value={props.value}
      onChange={props.changeTeamhandler}
      placeholder="Enter the three letter acronym of an NBA team"
    />
    <Button
      className="submitBtn"
      color="primary"
      onClick={props.handleSubmitTeam}
    >
      Search
    </Button>
  </div>
);

const TeamInfo = props => (
  <div className="teamData">
  <img alt="" className="logo" src={props.logo} />
    <h3 className="teamName">
      {props.fullName}
    </h3>
    <h4 className="record">
      Record: <h3 className="recordNum">{props.wins}</h3>W-
      <h3 className="recordNum">{props.losses}</h3>L Per:{" "}
      <h3 className="recordNum">{props.winPer}</h3>
    </h4>
    <p>
      <h4 className="rankNum">{props.confRank}</h4> in the {props.conf}ern
      Conference
    </p>
    <p>
      <h4 className="rankNum">{props.divRank}</h4> in the {props.div} Division
    </p>
  </div>
);

const LastGame = props => (
  <div className="lastGameDiv">
  <h3 className="lastGameTitle">Last Game</h3>
  <div className="lastGame">
      <img alt="" className="v smalllogo" src={props.vTeamLogo} />
      <img alt="" className="h smalllogo" src={props.hTeamLogo} />
      <h4 className="vName last">{props.vTeamName} @ <h4 className="hName last">{props.hTeamName}</h4></h4>
      <h3 className="vScore">{props.vTeamScore} -  <h3 className="hScore">{props.hTeamScore}</h3></h3>
      <h3 className={props.lastGameResultColor}>{props.lastGameResult}</h3>
  </div>
  </div>
);

class App extends Component {
  state = {
    playerList: [],
    newPlayer: "",
    firstName: "",
    lastName: "",
    playerID: "",
    playerTeamID: "",
    playerTeamName: "",
    playerPic: "",
    yearsPro: "",
    college: "",
    country: "",
    jersey: "",
    pos: "",
    ppg: "",
    apg: "",
    rpg: "",
    fgp: "",
    ftp: "",
    tpp: "",
    spg: "",
    tpg: "",
    bpg: "",
    newTeam: "",
    fullTeamName: "",
    displayTeamInfo: false,
    logo: "",
    teamID: "",
    conf: "",
    div: "",
    confRank: "",
    divRank: "",
    wins: "",
    losses: "",
    winPer: "",
    vTeamName: "",
    hTeamName: "",
    vTeamScore: "",
    hTeamScore: "",
    vTeamLogo: "",
    hTeamLogo: "",
    lastGameResult: "",
    lastGameResultColor: ""
  };

  handleChangePlayer = event => {
    this.setState({ newPlayer: event.target.value });
  };

  handleChangeTeam = event => {
    this.setState({ newTeam: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const separateName = this.state.newPlayer.split(" ");
    const firstName =
      separateName[0].substring(0, 1).toUpperCase() +
      separateName[0].substring(1);
    const lastName =
      separateName[1].substring(0, 1).toUpperCase() +
      separateName[1].substring(1);
    this.setState({ firstName: firstName });
    this.setState({ lastName: lastName });
    let playerTeamID, yearsPro, college, country, playerID, jersey, pos;
    var that = this;
    unirest
      .get(`https://api-nba-v1.p.rapidapi.com/players/lastName/${lastName}`)
      .header(
        "X-RapidAPI-Key",
        "35739969eemshc4877dfb06a9598p136aeajsnb7b81f41c3c0"
      )
      .end(function(result) {
        let index = 0;
        for (let i = 0; i < result.body.api.players.length; i++) {
          if (result.body.api.players[i].firstName === firstName) {
            index = i;
          }
        }
        playerTeamID = result.body.api.players[index].teamId;
        yearsPro = result.body.api.players[index].yearsPro;
        college = result.body.api.players[index].collegeName;
        country = result.body.api.players[index].country;
        playerID = result.body.api.players[index].playerId;
        jersey = result.body.api.players[index].leagues.standard.jersey;
        pos = result.body.api.players[index].leagues.standard.pos;
        setTimeout(function() {
          that.setState({ playerTeamID: playerTeamID });
          that.setState({ yearsPro: yearsPro });
          that.setState({ college: college });
          that.setState({ country: country });
          that.setState({ playerID: playerID });
          that.setState({ jersey: jersey });
          that.setState({ pos: pos });
          that.setState({
            playerPic: `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`
          });
          that.getPlayerTeamInfo();
        }, 5);
      });
  };

  getPlayerTeamInfo = () => {
    var that = this;
    const playerTeamID = this.state.playerTeamID;
    unirest
      .get(`https://api-nba-v1.p.rapidapi.com/teams/teamId/${playerTeamID}`)
      .header(
        "X-RapidAPI-Key",
        "35739969eemshc4877dfb06a9598p136aeajsnb7b81f41c3c0"
      )
      .end(function(result) {
        const playerTeamName = result.body.api.teams[0].fullName;
        that.setState({ playerTeamName: playerTeamName });
        that.getPlayerStats();
      });
  };

  getPlayerStats = () => {
    var that = this;
    const playerID = that.state.playerID;
    unirest
      .get(
        `https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/${playerID}`
      )
      .header(
        "X-RapidAPI-Key",
        "35739969eemshc4877dfb06a9598p136aeajsnb7b81f41c3c0"
      )
      .end(function(result) {
        const arrStats = result.body.api.statistics;
        let points = 0,
          assists = 0,
          rebounds = 0,
          fgm = 0,
          fga = 0,
          ftm = 0,
          fta = 0,
          tpm = 0,
          tpa = 0,
          steals = 0,
          turnovers = 0,
          blocks = 0,
          games = 0;
        for (let i = 0; i < arrStats.length; i++) {
          if (
            parseInt(arrStats[i].gameId) >= 4400 &&
            arrStats[i].points !== ""
          ) {
            // Note: first game of 2018 season has gameID 4308
            points = points + parseInt(arrStats[i].points);
            assists = assists + parseInt(arrStats[i].assists);
            rebounds = rebounds + parseInt(arrStats[i].totReb);
            fgm = fgm + parseInt(arrStats[i].fgm);
            fga = fga + parseInt(arrStats[i].fga);
            ftm = ftm + parseInt(arrStats[i].ftm);
            fta = fta + parseInt(arrStats[i].fta);
            tpm = tpm + parseInt(arrStats[i].tpm);
            tpa = tpa + parseInt(arrStats[i].tpa);
            steals = steals + parseInt(arrStats[i].steals);
            turnovers = turnovers + parseInt(arrStats[i].turnovers);
            blocks = blocks + parseInt(arrStats[i].blocks);
            games = games + 1;
          }
        }
        const ppg = (Math.round((points / games) * 100) / 100).toString();
        const apg = (Math.round((assists / games) * 100) / 100).toString();
        const rpg = (Math.round((rebounds / games) * 100) / 100).toString();
        const fgp = (Math.round((fgm / fga) * 1000) / 10).toString();
        const ftp = (Math.round((ftm / fta) * 1000) / 10).toString();
        const tpp = (Math.round((tpm / tpa) * 1000) / 10).toString();
        const spg = (Math.round((steals / games) * 100) / 100).toString();
        const tpg = (Math.round((turnovers / games) * 100) / 100).toString();
        const bpg = (Math.round((blocks / games) * 100) / 100).toString();
        that.setState({ ppg: ppg });
        that.setState({ apg: apg });
        that.setState({ rpg: rpg });
        that.setState({ fgp: fgp });
        that.setState({ ftp: ftp });
        that.setState({ tpp: tpp });
        that.setState({ spg: spg });
        that.setState({ tpg: tpg });
        that.setState({ bpg: bpg });
      });
    const upperName =
      that.state.firstName.toUpperCase() +
      " " +
      that.state.lastName.toUpperCase();

    setTimeout(function() {
      $.post("/api/player", {
        content: upperName,
        jersey: that.state.jersey,
        pos: that.state.pos,
        playerTeamName: that.state.playerTeamName,
        college: that.state.college,
        country: that.state.country,
        yearsPro: that.state.yearsPro,
        ppg: that.state.ppg,
        apg: that.state.apg,
        rpg: that.state.rpg,
        fgp: that.state.fgp,
        ftp: that.state.ftp,
        tpp: that.state.tpp,
        spg: that.state.spg,
        tpg: that.state.tpg,
        bpg: that.state.bpg,
        playerPic: that.state.playerPic
      }).then(result => {
        that.renderPlayers();
      });
    }, 5700);
  };

  getTeamInfo = event => {
    event.preventDefault();
    const acronym = this.state.newTeam.toUpperCase();
    unirest
      .get(`https://api-nba-v1.p.rapidapi.com/teams/shortName/${acronym}`)
      .header(
        "X-RapidAPI-Key",
        "35739969eemshc4877dfb06a9598p136aeajsnb7b81f41c3c0"
      )
      .end(result => {
        const teamID = result.body.api.teams[0].teamId;
        const fullName = result.body.api.teams[0].fullName;
        const logoTeam = result.body.api.teams[0].logo;
        const conf = result.body.api.teams[0].leagues.standard.confName;
        const div = result.body.api.teams[0].leagues.standard.divName;
        this.setState({ fullTeamName: fullName });
        this.setState({ logo: logoTeam });
        this.setState({ teamID: teamID });
        this.setState({ conf: conf });
        this.setState({ div: div });
        setTimeout(this.getStandingsInfo, 5);
      });
  };

  getStandingsInfo = event => {
    const teamID = this.state.teamID;
    unirest
      .get(
        `https://api-nba-v1.p.rapidapi.com/standings/standard/2018/teamId/${teamID}`
      )
      .header(
        "X-RapidAPI-Key",
        "35739969eemshc4877dfb06a9598p136aeajsnb7b81f41c3c0"
      )
      .end(result => {
        let confRank = result.body.api.standings[0].conference.rank;
        let divRank = result.body.api.standings[0].division.rank;
        const wins = result.body.api.standings[0].win;
        const losses = result.body.api.standings[0].loss;
        const winPer = result.body.api.standings[0].winPercentage;
        confRank = this.handleRank(confRank);
        divRank = this.handleRank(divRank);
        this.setState({ confRank: confRank });
        this.setState({ divRank: divRank });
        this.setState({ wins: wins });
        this.setState({ losses: losses });
        this.setState({ winPer: winPer });
        setTimeout(this.getLastGameInfo, 0);
      });
  };

  getLastGameInfo = () => {
    const that = this;
    const teamID = this.state.teamID;
    unirest
      .get(`https://api-nba-v1.p.rapidapi.com/games/teamId/${teamID}`)
      .header(
        "X-RapidAPI-Key",
        "35739969eemshc4877dfb06a9598p136aeajsnb7b81f41c3c0"
      )
      .end(function(result) {
        const gamesArrLength = result.body.api.games.length;
        let lastGameNumber;
        for (let i = 0; i < gamesArrLength; i++) {
          if (
            result.body.api.games[i].statusGame === "Scheduled" ||
            result.body.api.games[i].statusGame === "In Play"
          ) {
            lastGameNumber = i - 1;
            i = gamesArrLength;
          }
        }
        const lastGame = result.body.api.games[lastGameNumber];
        const vTeamID = lastGame.vTeam.teamId;
        const vTeam = lastGame.vTeam.shortName;
        const vTeamLogo = lastGame.vTeam.logo;
        const vTeamScore = lastGame.vTeam.score.points;
        const hTeamID = lastGame.hTeam.teamId;
        const hTeam = lastGame.hTeam.shortName;
        const hTeamLogo = lastGame.hTeam.logo;
        const hTeamScore = lastGame.hTeam.score.points;
        let lastGameResultColor = "";
        let lastGameResult = "";
        if (
          (vTeamID === teamID && vTeamScore > hTeamScore) ||
          (hTeamID === teamID && hTeamScore > vTeamScore)
        ) {
          lastGameResult = "W";
          lastGameResultColor = 'green';
        } else {
          lastGameResult = "L";
          lastGameResultColor = 'red';
        }
        that.setState({ vTeamName: vTeam });
        that.setState({ vTeamLogo: vTeamLogo });
        that.setState({ vTeamScore: vTeamScore });
        that.setState({ hTeamName: hTeam });
        that.setState({ hTeamLogo: hTeamLogo });
        that.setState({ hTeamScore: hTeamScore });
        that.setState({ lastGameResult: lastGameResult });
        that.setState({ lastGameResultColor: lastGameResultColor });
        that.setState({ displayTeamInfo: true });
      });
  };

  handleDelete = id => {
    $.delete(`/api/player/${id}`).then(result => {
      this.renderPlayers();
    });
  };

  handleRank = rank => {
    const rankNum = parseInt(rank);
    if (rankNum > 3) {
      return `${rankNum}th`;
    } else if (rankNum === 3) {
      return "3rd";
    } else if (rankNum === 2) {
      return "2nd";
    } else {
      return "1st";
    }
  };

  renderPlayers = () => {
    $.get("/api/player").then(result => {
      this.setState({ playerList: result.data });
    });
  };

  componentDidMount() {
    this.renderPlayers();
  }

  render() {
    return (
      <div>
        <h1 className="title">
          <img
            alt=""
            className="nbaImage"
            src="https://seeklogo.com/images/N/nba-logo-20AFA6E832-seeklogo.com.png"
          />
          NBA Analytics
        </h1>
        <div className="searchSection">
          <div className="playerSearch">
            <PlayerSelector
              value={this.state.newPlayer}
              changePlayerHandler={this.handleChangePlayer}
              submitHandler={this.handleSubmit}
            />
            <PlayerList
              players={this.state.playerList}
              jersey={this.state.jersey}
              pos={this.state.pos}
              playerTeamName={this.state.playerTeamName}
              college={this.state.college}
              country={this.state.country}
              yearsPro={this.state.yearsPro}
              ppg={this.state.ppg}
              apg={this.state.apg}
              rpg={this.state.rpg}
              fgp={this.state.fgp}
              ftp={this.state.ftp}
              tpp={this.state.tpp}
              spg={this.state.spg}
              tpg={this.state.tpg}
              bpg={this.state.bpg}
              playerPic={this.state.playerPic}
              deleteHandler={this.handleDelete}
            />
          </div>
          <div className="teamSearch">
            <TeamSelector
              value={this.state.newTeam}
              changeTeamhandler={this.handleChangeTeam}
              handleSubmitTeam={this.getTeamInfo}
            />
            {this.state.displayTeamInfo ? (
              <div>
                <TeamInfo
                  fullName={this.state.fullTeamName}
                  logo={this.state.logo}
                  conf={this.state.conf}
                  confRank={this.state.confRank}
                  div={this.state.div}
                  divRank={this.state.divRank}
                  wins={this.state.wins}
                  losses={this.state.losses}
                  winPer={this.state.winPer}
                />
                <LastGame
                  vTeamName={this.state.vTeamName}
                  vTeamLogo={this.state.vTeamLogo}
                  vTeamScore={this.state.vTeamScore}
                  hTeamName={this.state.hTeamName}
                  hTeamLogo={this.state.hTeamLogo}
                  hTeamScore={this.state.hTeamScore}
                  lastGameResult={this.state.lastGameResult}
                  lastGameResultColor={this.state.lastGameResultColor}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
