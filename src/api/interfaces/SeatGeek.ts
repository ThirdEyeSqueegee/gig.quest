export interface SGEvents {
  events?: SGEvent[];
  meta?: SGMeta;
}

export interface SGEvent {
  access_method?: object;
  announce_date?: string;
  announcements?: object;
  conditional?: boolean;
  created_at?: string;
  date_tbd?: boolean;
  datetime_local?: string;
  datetime_tbd?: boolean;
  datetime_utc?: string;
  description?: string;
  domain_information?: string[];
  enddatetime_utc?: null;
  event_promotion?: null;
  id?: number;
  is_open?: boolean;
  is_visible?: boolean;
  is_visible_override?: string;
  links?: string[];
  performers?: SGPerformer[];
  popularity?: number;
  score?: number;
  short_title?: string;
  stats?: SGEventStats;
  status?: string;
  taxonomies?: object[];
  tdc_pv_id?: number;
  tdc_pvo_id?: number;
  themes?: string[];
  time_tbd?: boolean;
  title?: string;
  type?: SGEventType;
  url?: string;
  venue?: SGVenue;
  visible_at?: string;
  visible_until_utc?: string;
}

export interface SGMeta {
  geolocation?: SGGeolocation;
  page?: number;
  per_page?: number;
  took?: number;
  total?: number;
}

export interface SGGeolocation {
  city?: string;
  country?: string;
  display_name?: string;
  lat?: number;
  lon?: number;
  metro_code?: string;
  postal_code?: string;
  range?: string;
  state?: string;
}

export interface SGVenue {
  access_method?: object;
  address?: string;
  capacity?: number;
  city?: string;
  country?: string;
  display_location?: string;
  extended_address?: string;
  has_upcoming_events?: boolean;
  id?: number;
  links?: string[];
  location?: Location;
  metro_code?: number;
  name?: string;
  name_v2?: string;
  num_upcoming_events?: number;
  popularity?: number;
  postal_code?: string;
  score?: number;
  slug?: string;
  state?: string;
  timezone?: string;
  url?: string;
}

export interface SGPerformer {
  away_team?: boolean;
  colors?: object;
  divisions?: object[];
  genres?: object;
  has_upcoming_events?: boolean;
  home_team?: boolean;
  home_venue_id?: number;
  id?: number;
  image?: string;
  image_attribution?: string;
  image_license?: string;
  image_rights_message?: string;
  images?: object;
  location?: object;
  name?: string;
  num_upcoming_events?: number;
  popularity?: number;
  primary?: boolean;
  score?: number;
  short_name?: string;
  slug?: string;
  stats?: object;
  taxonomies?: object[];
  type?: string;
  url?: string;
}

export interface SGEventStats {
  average_price?: number;
  dq_bucket_counts?: number[];
  highest_price?: number;
  listing_count?: number;
  lowest_price?: number;
  lowest_price_good_deals?: number;
  lowest_sg_base_price?: number;
  lowest_sg_base_price_good_deals?: number;
  median_price?: number;
  visible_listing_count?: number;
}

export interface Location {
  lat?: number;
  lon?: number;
}

export interface SGEventDetails {
  event: SGEvent;
  is1v1: boolean;
  performers: string[];
}

export interface SGEventsDetailsAndMeta {
  details: SGEventDetails[];
  meta: SGMeta;
}

export const SGSportsEventTypes = [
  "sports",

  "auto_racing",
  "nascar",
  "nascar_sprintcup",
  "nascar_nationwide",
  "indycar",
  "f1",
  "monster_truck",
  "motocross",

  "golf",
  "pga",
  "lpga",
  "college_golf",
  "womens_college_golf",

  "wwe",

  "animal_sports",
  "horse_racing",
  "rodeo",
  "college_rodeo",

  "extreme_sports",

  "olympic_sports",

  "esports",
  "college_esports",

  "climbing",

  "volleyball",
  "college_volleyball",
  "womens_college_volleyball",

  "gymnastics",
  "college_gymnastics",

  "track_and_field",
  "college_track_and_field",

  "swimming",
  "college_swimming",
] as const;

export const SG1v1SportsEventTypes = [
  "baseball",
  "mlb",
  "ncaa_baseball",
  "minor_league_baseball",
  "college_softball",

  "football",
  "nfl",
  "ncaa_football",
  "xfl",

  "basketball",
  "nba",
  "ncaa_basketball",
  "ncaa_womens_basketball",
  "wnba",
  "nba_dleague",

  "hockey",
  "nhl",
  "ncaa_hockey",
  "womens_college_hockey",
  "minor_league_hockey",
  "national_womens_hockey",

  "soccer",
  "mls",
  "ncaa_soccer",
  "womens_college_soccer",
  "european_soccer",
  "international_soccer",
  "world_cup",
  "united_soccer_league",
  "national_womens_soccer",

  "fighting",
  "boxing",
  "mma",

  "wrestling",
  "college_wrestling",

  "tennis",
  "college_tennis",
  "womens_college_tennis",

  "lacrosse",
  "major_league_lacrosse",
  "womens_professional_league_lacrosse",
  "college_lacrosse",
  "womens_college_lacrosse",

  "rugby",
  "major_league_rugby",
] as const;

export const SGMusicEventTypes = ["concerts", "concert", "music_festival"] as const;

export const SGTheaterEventTypes = [
  "theater",
  "classical",
  "classical_opera",
  "classical_vocal",
  "classical_orchestral_instrumental",
  "cirque_du_soleil",
  "broadway_tickets_national",
  "comedy",
  "family",
  "dance_performance_tour",
  "film",
  "literary",
  "circus",
  "entertainment",
  "addon",
  "parking",
  "club_passes",
  "suite",
] as const;

export type SGMusicEventType = (typeof SGMusicEventTypes)[number];
export type SGSportsEventType = (typeof SGSportsEventTypes)[number];
export type SG1v1SportsEventType = (typeof SG1v1SportsEventTypes)[number];
export type SGTheaterEventType = (typeof SGTheaterEventTypes)[number];

export type SGEventType = SG1v1SportsEventType | SGMusicEventType | SGSportsEventType | SGTheaterEventType;

export const isSGMusicEventType = (eventType: SGEventType): eventType is SGMusicEventType =>
  SGMusicEventTypes.includes(eventType as SGMusicEventType);
export const isSGSportsEventType = (eventType: SGEventType): eventType is SGSportsEventType =>
  SGSportsEventTypes.includes(eventType as SGSportsEventType);
export const isSG1v1SportsEventType = (eventType: SGEventType): eventType is SG1v1SportsEventType =>
  SG1v1SportsEventTypes.includes(eventType as SG1v1SportsEventType);
export const isSGTheaterEventType = (eventType: SGEventType): eventType is SGTheaterEventType =>
  SGTheaterEventTypes.includes(eventType as SGTheaterEventType);
