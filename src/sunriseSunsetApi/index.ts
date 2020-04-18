import axios, { AxiosResponse } from 'axios';
import moment, { Moment } from 'moment';
import { LatLong } from '../@types/LatLong';
import {
  ParsedSunriseSunsetResult,
  SunriseSunsetResponse,
} from '../@types/SunriseSunset';

/**
 * Constructs GET URL for the sunrise sunset API
 *
 * @param latLng
 * @param date
 */
const buildApiUrl = (latLng: LatLong, date: Moment): string => {
  let apiUrl = `https://api.sunrise-sunset.org/json?formatted=0&lat=${latLng.lat}&lng=${latLng.long}`;
  apiUrl += `&date=${date.format('YYYY-MM-DD')}`;

  return apiUrl;
};

/**
 * Parses response from the sunrise sunset API into a usable object
 *
 * @param results
 * @param latLng
 */
const parseSunriseSunsetResult = (
  { data: { results } }: AxiosResponse<SunriseSunsetResponse>,
  latLng: LatLong,
): ParsedSunriseSunsetResult => {
  if (results.day_length === 0) {
    throw new Error(`Invalid 'day_length' of 0 returned from API`);
  }

  return {
    lat_lng: latLng,
    day_length: moment.duration(results.day_length, 'seconds'),
    sunrise: moment(results.sunrise),
    sunset: moment(results.sunset),
  };
};

/**
 * Function to get the sunrise and sunset times for a latitude/longitude
 *
 * @param latLng
 * @param date
 */
export const getSunsetSunriseTimes = async (
  latLng: LatLong,
  date: Moment = moment(),
): Promise<ParsedSunriseSunsetResult> => {
  let response;
  try {
    response = await axios.get(buildApiUrl(latLng, date));
  } catch (err) {
    throw new Error(
      `Failed to get sunrise/sunset for ${JSON.stringify(latLng)}: ${
        err.message
      }`,
    );
  }

  let parsedResults;
  try {
    parsedResults = parseSunriseSunsetResult(response, latLng);
  } catch (err) {
    throw new Error(
      `Failed to parse sunrise/sunset for ${JSON.stringify(latLng)}: ${
        err.message
      }`,
    );
  }

  return parsedResults;
};
