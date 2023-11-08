export interface Events {
  events?: Event[];
  meta?: Meta;
}

export interface Meta {
  total?: number;
  took?: number;
  page?: number;
  per_page?: number;
  geolocation?: Geolocation;
}

export interface Geolocation {
  lat?: number;
  lon?: number;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  display_name?: string;
  metro_code?: string;
  range?: string;
}

export interface Venue {
  state?: string;
  name_v2?: string;
  postal_code?: string;
  name?: string;
  links?: string[];
  timezone?: string;
  url?: string;
  score?: number;
  location?: Location;
  address?: string;
  country?: string;
  has_upcoming_events?: boolean;
  num_upcoming_events?: number;
  city?: string;
  slug?: string;
  extended_address?: string;
  id?: number;
  popularity?: number;
  access_method?: object;
  metro_code?: number;
  capacity?: number;
  display_location?: string;
}

export interface Performer {
  type?: string;
  name?: string;
  image?: string;
  id?: number;
  images?: object;
  divisions?: object[];
  has_upcoming_events?: boolean;
  primary?: boolean;
  stats?: object;
  taxonomies?: object;
  image_attribution?: string;
  url?: string;
  score?: number;
  slug?: string;
  home_venue_id?: number;
  short_name?: string;
  num_upcoming_events?: number;
  colors?: object;
  image_license?: string;
  popularity?: number;
  location?: object;
  image_rights_message?: string;
  home_team?: boolean;
  away_team?: boolean;
  genres?: object;
}

export interface EventStats {
  listing_count?: number;
  average_price?: number;
  lowest_price_good_deals?: number;
  lowest_price?: number;
  highest_price?: number;
  visible_listing_count?: number;
  dq_bucket_counts?: number[];
  median_price?: number;
  lowest_sg_base_price?: number;
  lowest_sg_base_price_good_deals?: number;
}

export interface Event {
  type?: string;
  id?: number;
  datetime_utc?: string;
  venue?: Venue;
  datetime_tbd?: boolean;
  performers?: Performer[];
  is_open?: boolean;
  links?: string[];
  datetime_local?: string;
  time_tbd?: boolean;
  short_title?: string;
  visible_until_utc?: string;
  stats?: EventStats;
  taxonomies?: object[];
  url?: string;
  score?: number;
  announce_date?: string;
  created_at?: string;
  date_tbd?: boolean;
  title?: string;
  popularity?: number;
  description?: string;
  status?: string;
  access_method?: object;
  event_promotion?: null;
  announcements?: object;
  conditional?: boolean;
  enddatetime_utc?: null;
  visible_at?: string;
  is_visible_override?: string;
  tdc_pvo_id?: number;
  tdc_pv_id?: number;
  is_visible?: boolean;
  themes?: string[];
  domain_information?: string[];
}

export interface Location {
  lat: number | null;
  lon: number | null;
}

export interface SpotifyArtistDetails {
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total?: number;
  items?: Item[];
}

export interface SpotifyArtistResult {
  artists: SpotifyArtistDetails;
}

export interface Item {
  external_urls?: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
}

export interface ExternalUrls {
  spotify?: string;
}

export interface Followers {
  href?: string;
  total?: number;
}

export interface Image {
  url?: string;
  height?: number;
  width?: number;
}

export interface ArtistDetails {
  name: string;
  result: Item;
}

export interface EventDetails {
  event: Event;
  is1v1: boolean;
  artistDetails: ArtistDetails[];
}
