export interface ESPNTeam {
  team?: ESPNTeamTeam;
}

export interface ESPNTeamTeam {
  abbreviation?: string;
  alternateColor?: string;
  color?: string;
  displayName?: string;
  franchise?: object;
  groups?: object;
  id?: string;
  isActive?: boolean;
  links?: object[];
  location?: string;
  logos?: object[];
  name?: string;
  nextEvent?: object[];
  record?: ESPNRecord;
  shortDisplayName?: string;
  slug?: string;
  standingSummary?: string;
  uid?: string;
}

export interface ESPNRecord {
  items?: ESPNRecordItem[];
}

export interface ESPNRecordItem {
  description?: string;
  stats?: ESPNRecordStat[];
  summary?: string;
  type?: string;
}

export interface ESPNRecordStat {
  name?: string;
  value?: number;
}
