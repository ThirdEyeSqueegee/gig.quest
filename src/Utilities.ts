import { SGEventType, SGPerformer, isSG1v1SportsEventType } from "./api/interfaces/SeatGeek.ts";

const regex = /(?:vs\.|\/\/)$/gu;

export const tokenizePerformers = (performers?: SGPerformer[], eventType?: SGEventType) => {
  let is1v1 = false;
  let str = "";

  if (performers && performers.length > 0 && eventType) {
    if (isSG1v1SportsEventType(eventType)) {
      is1v1 = true;
      for (const p of performers) {
        if (p.name) {
          const teamName = p.name.replaceAll("FC", "").replaceAll("Football Club", "").trim();
          const nbaTeamIdx = NBATeams.indexOf(teamName);
          const nflTeamIdx = NFLTeams.indexOf(teamName);
          const nhlTeamIdx = NHLTeams.indexOf(teamName);
          const mlbTeamIndex = MLBTeams.indexOf(teamName);
          const mlsTeamIdx = MLSTeams.indexOf(teamName);
          if (nbaTeamIdx !== -1) {
            str += `${NBATeams[nbaTeamIdx]}`;
          } else if (nflTeamIdx !== -1) {
            str += `${NFLTeams[nflTeamIdx]}`;
          } else if (nhlTeamIdx !== -1) {
            str += `${NHLTeams[nhlTeamIdx]}`;
          } else if (mlbTeamIndex !== -1) {
            str += `${MLBTeams[mlbTeamIndex]}`;
          } else if (mlsTeamIdx !== -1) {
            str += `${MLSTeams[mlsTeamIdx]}`;
          } else if (!teamName.includes("Playoffs") && !teamName.includes("Final")) {
            str += `${p.name}`;
          }
          str += "vs.";
        }
      }
    } else if (performers.length > 1) {
      for (const p of performers) {
        str += `${p.name}//`;
      }
    } else {
      str += performers[0].name;
    }
  }

  str = str
    .replace(regex, "")
    .replaceAll(" Womens Volleyball", "")
    .replaceAll(" Mens Basketball", "")
    .replaceAll(" Womens Basketball", "")
    .replaceAll(" Womens National Hockey", "");

  return {
    is1v1,
    tokens: str
      .split(is1v1 ? "vs." : "//")
      .filter((e) => e.length > 0)
      .map((e) => e.trim()),
  };
};

export const lerp = (start: number, end: number, amount: number) => {
  return start + amount * (end - start);
};

const NBATeams = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "Los Angeles Clippers",
  "Los Angeles Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Orleans Pelicans",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards",
];

const NFLTeams = [
  "Arizona Cardinals",
  "Atlanta Falcons",
  "Baltimore Ravens",
  "Buffalo Bills",
  "Carolina Panthers",
  "Chicago Bears",
  "Cincinnati Bengals",
  "Cleveland Browns",
  "Dallas Cowboys",
  "Denver Broncos",
  "Detroit Lions",
  "Green Bay Packers",
  "Houston Texans",
  "Indianapolis Colts",
  "Jacksonville Jaguars",
  "Kansas City Chiefs",
  "Las Vegas Raiders",
  "Los Angeles Chargers",
  "Los Angeles Rams",
  "Miami Dolphins",
  "Minnesota Vikings",
  "New England Patriots",
  "New Orleans Saints",
  "New York Giants ",
  "New York Jets",
  "Philadelphia Eagles",
  "Pittsburgh Steelers",
  "San Francisco 49ers",
  "Seattle Seahawks",
  "Tampa Bay Buccaneers",
  "Tennessee Titans",
  "Washington Commanders",
];

const NHLTeams = [
  "Anaheim Ducks",
  "Arizona Coyotes",
  "Boston Bruins",
  "Buffalo Sabres",
  "Calgary Flames",
  "Carolina Hurricanes",
  "Chicago Blackhawks",
  "Colorado Avalanche",
  "Columbus Blue Jackets",
  "Dallas Stars",
  "Detroit Red Wings",
  "Edmonton Oilers",
  "Florida Panthers",
  "Los Angeles Kings",
  "Minnesota Wild",
  "Montreal Canadiens",
  "Nashville Predators",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Ottawa Senators",
  "Philadelphia Flyers",
  "Pittsburgh Penguins",
  "San Jose Sharks",
  "Seattle Kraken",
  "St. Louis Blues",
  "Tampa Bay Lightning",
  "Toronto Maple Leafs",
  "Vancouver Canucks",
  "Vegas Golden Knights",
  "Washington Capitals",
  "Winnipeg Jets",
];

const MLBTeams = [
  "Arizona Diamondbacks",
  "Atlanta Braves",
  "Baltimore Orioles",
  "Boston Red Sox",
  "Chicago Cubs",
  "Chicago White Sox",
  "Cincinnati Reds",
  "Cleveland Guardians",
  "Colorado Rockies",
  "Detroit Tigers",
  "Houston Astros",
  "Kansas City Royals",
  "Los Angeles Angels",
  "Los Angeles Dodgers",
  "Miami Marlins",
  "Milwaukee Brewers",
  "Minnesota Twins",
  "New York Mets",
  "New York Yankees",
  "Oakland Athletics",
  "Philadelphia Phillies",
  "Pittsburgh Pirates",
  "San Diego Padres",
  "San Francisco Giants",
  "Seattle Mariners",
  "St. Louis Cardinals",
  "Tampa Bay Rays",
  "Texas Rangers",
  "Toronto Blue Jays",
  "Washington Nationals",
];

const MLSTeams = [
  "Atlanta United",
  "Austin",
  "Montréal",
  "Charlotte",
  "Chicago Fire",
  "Colorado Rapids",
  "Columbus Crew",
  "D.C. United",
  "Cincinnati",
  "Dallas",
  "Houston Dynamo",
  "Inter Miami",
  "LA Galaxy",
  "Los Angeles",
  "Minnesota United",
  "Nashville",
  "New England Revolution",
  "New York City",
  "New York Red Bulls",
  "Orlando City",
  "Philadelphia Union",
  "Portland Timbers",
  "Real Salt Lake",
  "San Jose Earthquakes",
  "Seattle Sounders",
  "Sporting Kansas City",
  "St. Louis City",
  "Toronto",
  "Vancouver Whitecaps",
];
