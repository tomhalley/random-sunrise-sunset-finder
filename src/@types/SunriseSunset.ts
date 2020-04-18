import { Duration, Moment } from 'moment';
import { LatLong } from './LatLong';

export interface SunriseSunsetResponse {
  results: SunriseSunsetResult;
  status: string;
}

export interface SunriseSunsetResult {
  sunrise: string;
  sunset: string;
  solar_noon: string;
  day_length: number;
  civil_twilight_begin: string;
  civil_twilight_end: string;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
  astronomical_twilight_begin: string;
  astronomical_twilight_end: string;
}

export interface ParsedSunriseSunsetResult {
  sunrise: Moment;
  sunset: Moment;
  day_length: Duration;
  lat_lng: LatLong;
}
