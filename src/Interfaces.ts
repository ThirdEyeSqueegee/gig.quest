export interface SGEvents {
  events?: SGEvent[];
  meta?: Meta;
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
  performers?: Performer[];
  popularity?: number;
  score?: number;
  short_title?: string;
  stats?: EventStats;
  status?: string;
  taxonomies?: object[];
  tdc_pv_id?: number;
  tdc_pvo_id?: number;
  themes?: string[];
  time_tbd?: boolean;
  title?: string;
  type?: string;
  url?: string;
  venue?: Venue;
  visible_at?: string;
  visible_until_utc?: string;
}

export interface Meta {
  geolocation?: Geolocation;
  page?: number;
  per_page?: number;
  took?: number;
  total?: number;
}

export interface Geolocation {
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

export interface Venue {
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

export interface Performer {
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
  taxonomies?: object;
  type?: string;
  url?: string;
}

export interface EventStats {
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
  lat: null | number;
  lon: null | number;
}

export interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface SpotifyToken {
  expires_at: Date;
  token: string;
}

export interface SpotifyArtistDetails {
  href?: string;
  items?: ArtistItem[];
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total?: number;
}

export interface SpotifyArtistResult {
  artists: SpotifyArtistDetails;
}

export interface ExternalUrls {
  spotify?: string;
}

export interface Followers {
  href?: string;
  total?: number;
}

export interface Image {
  height?: number;
  url?: string;
  width?: number;
}

export interface ArtistItem {
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

export interface EventDetails {
  event: SGEvent;
  is1v1: boolean;
  performers: string[];
}

export interface EventsDetailsAndMeta {
  details: EventDetails[];
  meta: Meta;
}

export interface PaginationState {
  filter: string[];
  page: number;
  range: string;
  rowCountOptions: number[];
  rowsPerPage: number;
  // eslint-disable-next-line perfectionist/sort-interfaces
  firstPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  setFilter: (filter: string[]) => void;
  setPage: (page: number) => void;
  setRange: (range: string) => void;
  setRowCountOptions: (rowCountOptions: number[]) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
}

export interface SortingState {
  sortAvgPrice?: boolean;
  sortDate?: boolean;
  sortHighestPrice?: boolean;
  sortLowestPrice?: boolean;
  sortPopularity?: boolean;
  toggleSortAvgPrice: () => void;
  toggleSortDate: () => void;
  toggleSortHighestPrice: () => void;
  toggleSortLowestPrice: () => void;
  toggleSortPopularity: () => void;
}

export interface ViewState {
  tableView: boolean;
  toggleGridView: () => void;
}

export interface SearchState {
  debSearchTerm: string;
  searchTerm: string;
  setDebSearchTerm: (term: string) => void;
  setSearchTerm: (term: string) => void;
}

export interface LocationState {
  location?: Location;
  setLocation: (location: Location) => void;
}
