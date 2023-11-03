export type ArtistDetails = {
  genres: string[];
  url: string;
  followers: number;
  popularity: number;
};

export interface Events {
  events?: IEvent[];
  meta?: Meta;
}

export interface IEvent {
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
  taxonomies?: Taxonomy[];
  url?: string;
  score?: number;
  announce_date?: string;
  created_at?: string;
  date_tbd?: boolean;
  title?: string;
  popularity?: number;
  description?: string;
  status?: string;
  access_method?: AccessMethod;
  event_promotion?: null;
  announcements?: Announcements;
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

export interface AccessMethod {
  method?: string;
  created_at?: string;
  employee_only?: boolean;
}

export interface Announcements {}

export interface Performer {
  type?: string;
  name?: string;
  image?: string;
  id?: number;
  images?: PerformerImages;
  divisions?: Division[];
  has_upcoming_events?: boolean;
  primary?: boolean;
  stats?: PerformerStats;
  taxonomies?: Taxonomy[];
  image_attribution?: string;
  url?: string;
  score?: number;
  slug?: string;
  home_venue_id?: number;
  short_name?: string;
  num_upcoming_events?: number;
  colors?: Colors;
  image_license?: string;
  popularity?: number;
  location?: Location;
  image_rights_message?: string;
  home_team?: boolean;
  away_team?: boolean;
  genres?: Genre[];
}

export interface Colors {
  all?: string[];
  iconic?: string;
  primary?: string[];
}

export interface Division {
  taxonomy_id?: number;
  short_name?: null | string;
  display_name?: string;
  display_type?: string;
  division_level?: number;
  slug?: null | string;
}

export interface Genre {
  id?: number;
  name?: string;
  slug?: string;
  primary?: boolean;
  images?: GenreImages;
  image?: string;
  document_source?: DocumentSource;
}

export interface DocumentSource {
  source_type?: string;
  generation_type?: string;
}

export interface GenreImages {
  "1200x525"?: string;
  "1200x627"?: string;
  "136x136"?: string;
  "500_700"?: string;
  "800x320"?: string;
  banner?: string;
  block?: string;
  criteo_130_160?: string;
  criteo_170_235?: string;
  criteo_205_100?: string;
  criteo_400_300?: string;
  fb_100x72?: string;
  fb_600_315?: string;
  huge?: string;
  ipad_event_modal?: string;
  ipad_header?: string;
  ipad_mini_explore?: string;
  mongo?: string;
  square_mid?: string;
  triggit_fb_ad?: string;
}

export interface PerformerImages {
  huge?: string;
}

export interface Location {
  lat?: number;
  lon?: number;
}

export interface PerformerStats {
  event_count?: number;
}

export interface Taxonomy {
  id?: number;
  name?: string;
  parent_id?: number;
  document_source?: DocumentSource;
  rank?: number;
  seo_event_type?: string;
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
  access_method?: AccessMethod;
  metro_code?: number;
  capacity?: number;
  display_location?: string;
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
