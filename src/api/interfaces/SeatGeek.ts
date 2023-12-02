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
  type?: string;
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
  taxonomies?: object;
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
