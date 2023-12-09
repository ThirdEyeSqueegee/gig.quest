import type { SGPerformer } from "./api/interfaces/SeatGeek.ts";

export const tokenizeConcertPerformers = (performers: SGPerformer[]) => {
  let tokens: string[] = [];

  if (performers.length > 0) {
    for (const p of performers) {
      if (p.name) {
        tokens.push(p.name);
      }
    }
  }

  tokens = tokens.filter((e) => e && e.length > 0).map((e) => (e ? e.trim() : e));

  return tokens;
};

export const tokenizeNBAGame = (title: string) => {
  let split = title.split(" at ");
  if (split.length === 2) {
    return { inSeason: false, teams: [split[1].trim(), split[0].trim()] };
  }
  if (split[0].includes("NBA In-Season Tournament: Championship - ")) {
    split = split[0].replace("NBA In-Season Tournament: Championship - ", "").split(" vs ");
    return { inSeason: true, teams: [split[0].trim(), split[1].trim()] };
  }
  return { inSeason: false, teams: [] };
};

export const tokenizeNFLGame = (title: string) => {
  const split = title.split(" at ");
  if (split[0].includes("AFC") || split[0].includes("NFC")) {
    return [split[1].trim(), "TBA"];
  }
  if (split.length === 2) {
    return [split[1].trim(), split[0].trim()];
  }
  return [];
};

export const tokenizeNHLGame = (title: string) => {
  const split = title.split(" at ").map((t) => t.replace("NHL Winter Classic: ", ""));
  if (split.length === 2) {
    return [split[1].trim(), split[0].trim()];
  }
  return [];
};

export const tokenizeMLBGame = (title: string) => {
  const split = title
    .replace("Premium Seating", "")
    .replace("Opening Day", "")
    .replace("Home Opener", "")
    .replace("Pinstripe Pass", "")
    .replace("Game 1", "")
    .replace("Spring Training (Split Squad): ", "")
    .replace("Spring Training: ", "")
    .replace("-", "")
    .split(" at ");
  if (split.length === 2) {
    return [split[1].trim(), split[0].trim()];
  }
  return [];
};

export const lerp = (start: number, end: number, amount: number) => {
  return start + amount * (end - start);
};

export const NBATeamsMap = new Map([
  ["Atlanta Hawks", 1],
  ["Boston Celtics", 2],
  ["Brooklyn Nets", 17],
  ["Charlotte Hornets", 30],
  ["Chicago Bulls", 4],
  ["Cleveland Cavaliers", 5],
  ["Dallas Mavericks", 6],
  ["Denver Nuggets", 7],
  ["Detroit Pistons", 8],
  ["Golden State Warriors", 9],
  ["Houston Rockets", 10],
  ["Indiana Pacers", 11],
  ["Los Angeles Clippers", 12],
  ["Los Angeles Lakers", 13],
  ["Memphis Grizzlies", 29],
  ["Miami Heat", 14],
  ["Milwaukee Bucks", 15],
  ["Minnesota Timberwolves", 16],
  ["New Orleans Pelicans", 3],
  ["New York Knicks", 18],
  ["Oklahoma City Thunder", 25],
  ["Orlando Magic", 19],
  ["Philadelphia 76ers", 20],
  ["Phoenix Suns", 21],
  ["Portland Trail Blazers", 22],
  ["Sacramento Kings", 23],
  ["San Antonio Spurs", 24],
  ["Toronto Raptors", 28],
  ["Utah Jazz", 26],
  ["Washington Wizards", 27],
]);

export const WNBATeamsMap = new Map([
  ["Atlanta Dream", 20],
  ["Chicago Sky", 19],
  ["Connecticut Sun", 18],
  ["Dallas Wings", 3],
  ["Indiana Fever", 5],
  ["Las Vegas Aces", 17],
  ["Los Angeles Sparks", 6],
  ["Minnesota Lynx", 8],
  ["New York Liberty", 9],
  ["Phoenix Mercury", 11],
  ["Seattle Storm", 14],
  ["Washington Mystics", 16],
]);

export const CollegeBasketballTeamsMap = new Map([
  ["American University Eagles", 44],
  ["Arizona State Sun Devils", 9],
  ["Arizona Wildcats", 12],
  ["Arkansas Razorbacks", 8],
  ["Auburn Tigers", 2],
  ["Bellarmine Knights", 91],
  ["Boise State Broncos", 68],
  ["Bradley Braves", 71],
  ["Cal Poly Mustangs", 13],
  ["California Golden Bears", 25],
  ["Colorado Buffaloes", 38],
  ["Colorado State Rams", 36],
  ["Delaware Blue Hens", 48],
  ["Florida A&M Rattlers", 50],
  ["Florida Gators", 57],
  ["Florida State Seminoles", 52],
  ["George Washington Revolutionaries", 45],
  ["Georgetown Hoyas", 46],
  ["Georgia Lady Bulldogs", 61],
  ["Georgia Tech Yellow Jackets", 59],
  ["Hawai'i Rainbow Wahine", 62],
  ["Howard Bison", 47],
  ["IUPUI Jaguars", 85],
  ["Idaho Vandals", 70],
  ["Indiana Hoosiers", 84],
  ["Iowa State Cyclones", 66],
  ["Jacksonville State Gamecocks", 55],
  ["Kentucky Wildcats", 96],
  ["Louisville Cardinals", 97],
  ["Murray State Racers", 93],
  ["Northern Kentucky Norse", 94],
  ["Northwestern Wildcats", 77],
  ["Notre Dame Fighting Irish", 87],
  ["Sacramento State Hornets", 16],
  ["San Diego State Aztecs", 21],
  ["San José State Spartans", 23],
  ["South Alabama Jaguars", 6],
  ["South Florida Bulls", 58],
  ["Southern Illinois Salukis", 79],
  ["Southern Indiana Screaming Eagles", 88],
  ["Stanford Cardinal", 24],
  ["Stetson Hatters", 56],
  ["UAB Blazers", 5],
  ["UC Riverside Highlanders", 27],
  ["UC San Diego Tritons", 28],
  ["UCLA Bruins", 26],
  ["UConn Huskies", 41],
  ["UIC Flames", 82],
  ["USC Trojans", 30],
  ["Yale Bulldogs", 43],
]);

export const NFLTeamsMap = new Map([
  ["Arizona Cardinals", 22],
  ["Atlanta Falcons", 1],
  ["Baltimore Ravens", 33],
  ["Buffalo Bills", 2],
  ["Carolina Panthers", 29],
  ["Chicago Bears", 3],
  ["Cincinnati Bengals", 4],
  ["Cleveland Browns", 5],
  ["Dallas Cowboys", 6],
  ["Denver Broncos", 7],
  ["Detroit Lions", 8],
  ["Green Bay Packers", 9],
  ["Houston Texans", 34],
  ["Indianapolis Colts", 11],
  ["Jacksonville Jaguars", 30],
  ["Kansas City Chiefs", 12],
  ["Las Vegas Raiders", 13],
  ["Los Angeles Chargers", 24],
  ["Los Angeles Rams", 14],
  ["Miami Dolphins", 15],
  ["Minnesota Vikings", 16],
  ["New England Patriots", 17],
  ["New Orleans Saints", 18],
  ["New York Giants", 19],
  ["New York Jets", 20],
  ["Philadelphia Eagles", 21],
  ["Pittsburgh Steelers", 23],
  ["San Francisco 49ers", 25],
  ["Seattle Seahawks", 26],
  ["Tampa Bay Buccaneers", 27],
  ["Tennessee Titans", 10],
  ["Washington Commanders", 28],
]);

export const NCAAFootballTeamsMap = new Map([
  ["Amherst Mammoths", 7],
  ["Anna Maria College Amcats", 15],
  ["Arizona State Sun Devils", 9],
  ["Arizona Wildcats", 12],
  ["Arkansas Razorbacks", 8],
  ["Auburn Tigers", 2],
  ["Birmingham-Southern Panthers", 3],
  ["Boise State Broncos", 68],
  ["Bridgewater (MA) Bears", 18],
  ["Buena Vista Beavers", 63],
  ["Cal Poly Mustangs", 13],
  ["California Golden Bears", 25],
  ["Carroll University (WI) Pioneers", 32],
  ["Claremont-Mudd-Scripps College Stags", 17],
  ["Colby College White Mules", 33],
  ["Colorado Buffaloes", 38],
  ["Colorado Mesa Mavericks", 11],
  ["Colorado State Rams", 36],
  ["Curry College Colonels", 40],
  ["Delaware Fightin' Blue Hens", 48],
  ["Dubuque Spartans", 49],
  ["Elmhurst Bluejays", 72],
  ["Florida A&M Rattlers", 50],
  ["Florida Gators", 57],
  ["Florida State Seminoles", 52],
  ["Georgetown Hoyas", 46],
  ["Georgia Bulldogs", 61],
  ["Georgia Tech Yellow Jackets", 59],
  ["Grinnell Pioneers", 65],
  ["Hawai'i Rainbow Warriors", 62],
  ["Howard Bison", 47],
  ["Idaho Vandals", 70],
  ["Iowa State Cyclones", 66],
  ["Jacksonville State Gamecocks", 55],
  ["Luther Norse", 67],
  ["Millikin Big Blue", 74],
  ["Morehouse College Maroon Tigers", 60],
  ["Redlands Bulldogs", 29],
  ["Sacramento State Hornets", 16],
  ["San Diego State Aztecs", 21],
  ["San José State Spartans", 23],
  ["South Alabama Jaguars", 6],
  ["South Florida Bulls", 58],
  ["Stanford Cardinal", 24],
  ["Stetson Hatters", 56],
  ["UAB Blazers", 5],
  ["UCLA Bruins", 26],
  ["UConn Huskies", 41],
  ["USC Trojans", 30],
  ["Yale Bulldogs", 43],
]);

export const NHLTeamsMap = new Map([
  ["Anaheim Ducks", 25],
  ["Arizona Coyotes", 24],
  ["Boston Bruins", 1],
  ["Buffalo Sabres", 2],
  ["Calgary Flames", 3],
  ["Carolina Hurricanes", 7],
  ["Chicago Blackhawks", 4],
  ["Colorado Avalanche", 17],
  ["Columbus Blue Jackets", 29],
  ["Dallas Stars", 9],
  ["Detroit Red Wings", 5],
  ["Edmonton Oilers", 6],
  ["Florida Panthers", 26],
  ["Los Angeles Kings", 8],
  ["Minnesota Wild", 30],
  ["Montreal Canadiens", 10],
  ["Nashville Predators", 27],
  ["New Jersey Devils", 11],
  ["New York Islanders", 12],
  ["New York Rangers", 13],
  ["Ottawa Senators", 14],
  ["Philadelphia Flyers", 15],
  ["Pittsburgh Penguins", 16],
  ["San Jose Sharks", 18],
  ["Seattle Kraken", 124292],
  ["St. Louis Blues", 19],
  ["Tampa Bay Lightning", 20],
  ["Toronto Maple Leafs", 21],
  ["Vancouver Canucks", 22],
  ["Vegas Golden Knights", 37],
  ["Washington Capitals", 23],
  ["Winnipeg Jets", 28],
]);

export const MLBTeamsMap = new Map([
  ["Arizona Diamondbacks", 29],
  ["Atlanta Braves", 15],
  ["Baltimore Orioles", 1],
  ["Boston Red Sox", 2],
  ["Chicago Cubs", 16],
  ["Chicago White Sox", 4],
  ["Cincinnati Reds", 17],
  ["Cleveland Guardians", 5],
  ["Colorado Rockies", 27],
  ["Detroit Tigers", 6],
  ["Houston Astros", 18],
  ["Kansas City Royals", 7],
  ["Los Angeles Angels", 3],
  ["Los Angeles Dodgers", 19],
  ["Miami Marlins", 28],
  ["Milwaukee Brewers", 8],
  ["Minnesota Twins", 9],
  ["New York Mets", 21],
  ["New York Yankees", 10],
  ["Oakland Athletics", 11],
  ["Philadelphia Phillies", 22],
  ["Pittsburgh Pirates", 23],
  ["San Diego Padres", 25],
  ["San Francisco Giants", 26],
  ["Seattle Mariners", 12],
  ["St. Louis Cardinals", 24],
  ["Tampa Bay Rays", 30],
  ["Texas Rangers", 13],
  ["Toronto Blue Jays", 14],
  ["Washington Nationals", 20],
]);

export const MLSTeamsMap = new Map([
  ["Atlanta United", 18418],
  ["Austin", 20906],
  ["Charlotte", 21300],
  ["Chicago Fire", 182],
  ["Cincinnati", 18267],
  ["Colorado Rapids", 184],
  ["Columbus Crew", 183],
  ["D.C. United", 193],
  ["Dallas", 185],
  ["Houston Dynamo", 6077],
  ["Inter Miami", 20232],
  ["LA Galaxy", 187],
  ["Los Angeles", 18966],
  ["Minnesota United", 17362],
  ["Montréal", 9720],
  ["Nashville", 18986],
  ["New England Revolution", 189],
  ["New York City", 17606],
  ["New York Red Bulls", 190],
  ["Orlando City", 12011],
  ["Philadelphia Union", 10739],
  ["Portland Timbers", 9723],
  ["Real Salt Lake", 4771],
  ["San Jose Earthquakes", 191],
  ["Seattle Sounders", 9726],
  ["Sporting Kansas City", 186],
  ["St. Louis City", 21812],
  ["Toronto", 7318],
  ["Vancouver Whitecaps", 9727],
]);
