import { getRandomLatLong } from './randomLatLong';
import { getSunsetSunriseTimes } from './sunriseSunsetApi';
import { throttlePromises } from './throttlePromises';
import { ParsedSunriseSunsetResult } from './@types/SunriseSunset';
import moment from 'moment';

// Config
const CONCURRENT_REQUESTS = 5;
const LAT_LONGS_TO_GENERATE = 100;

/**
 * Builds an array of promises wrapped in anonymous functions to allow later execution
 */
const getDeferredPromiseArray = (): (() => Promise<
  ParsedSunriseSunsetResult
>)[] => {
  const deferredPromiseArray = [];
  for (let i = 0; i < LAT_LONGS_TO_GENERATE; i++) {
    deferredPromiseArray.push(() => getSunsetSunriseTimes(getRandomLatLong()));
  }
  return deferredPromiseArray;
};

/**
 * Sorts sunrise sunset results by earliest start time/date
 *
 * @param sunriseResult
 */
const sortByEarliestStart = (
  sunriseResult: ParsedSunriseSunsetResult[],
): ParsedSunriseSunsetResult[] => {
  return [...sunriseResult].sort((resultA, resultB) => {
    if (resultA.sunrise < resultB.sunrise) {
      return -1;
    }
    if (resultA.sunrise > resultB.sunrise) {
      return 1;
    }
    return 0;
  });
};

/**
 * Main execution thread, wrapped in an IIFE to allow async execution
 */
(async () => {
  const deferredPromises = getDeferredPromiseArray();
  const sunriseSunsets = await throttlePromises<ParsedSunriseSunsetResult>(
    deferredPromises,
    CONCURRENT_REQUESTS,
  );

  const [earliestSunrise] = sortByEarliestStart(sunriseSunsets);

  console.log(
    `The earliest sunrise is ${earliestSunrise.sunrise.format(
      'YYYY-MM-DD HH:mm:ss',
    )} and lasts for ${moment
      .utc(earliestSunrise.day_length.asMilliseconds())
      .format('H [hours] m [minutes and] s [seconds]')}`,
  );
})();
