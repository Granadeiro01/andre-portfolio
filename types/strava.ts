/**
 * Strava API Response Types
 */

export interface StravaAthlete {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string | null;
  sex: string;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number | null;
  friend: null | boolean;
  follower: null | boolean;
  profile_medium: string;
  profile: string;
  friend_count: number;
  follower_count: number;
  instagram_username: string | null;
  offer_in_progress: boolean;
  global_rank: number | null;
  city_rank: number | null;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number; // in meters
  moving_time: number; // in seconds
  elapsed_time: number; // in seconds
  total_elevation_gain: number;
  type: string; // "Run", "Ride", etc.
  start_date: string; // ISO format
  start_date_local: string;
  timezone: string;
  start_latlng: [number, number] | [];
  end_latlng: [number, number] | [];
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  workout_type: number | null;
  upload_id: number | null;
  external_id: string | null;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number | null;
  average_watts: number | null;
  weighted_average_watts: number | null;
  kilojoules: number | null;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number | null;
  max_heartrate: number | null;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number | null;
  elev_low: number | null;
  pr_count: number;
  all_out: boolean;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  muted: boolean;
  visibility: string;
  gear_id: string | null;
  description: string | null;
  calories: number | null;
}

export interface StravaTokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}

/**
 * Processed data for frontend consumption
 */
export interface AggregatedRunStats {
  totalActivities: number;
  totalKilometers: number;
  totalHours: number;
  totalMinutes: number;
  totalElevationGain: number;
  averagePace: string; // mm:ss per km
  averageDistance: number; // km
  averageMovingTime: number; // minutes
  longestRun: number; // km
  fastestPace: string; // mm:ss per km
  monthlyBreakdown: {
    month: string;
    count: number;
    kilometers: number;
    hours: number;
    minutes: number;
  }[];
}

export interface StravaStats {
  athlete: {
    id: number;
    name: string;
    username: string;
    profile: string;
    city?: string;
    state?: string;
  };
  stats: AggregatedRunStats;
  activities: StravaActivity[];
  lastUpdated: string;
  isAuthenticated: boolean;
}

export interface StravaOAuthState {
  scope: string;
  state: string;
  clientId: string;
}
