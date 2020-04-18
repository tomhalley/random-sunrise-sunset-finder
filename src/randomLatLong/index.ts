import { LatLong } from '../@types/LatLong';

/**
 * Generates a random number between a range
 *
 * @param rangeLower
 * @param rangeUpper
 * @param decimalPlaces
 */
const getRandomNumberBetweenRange = (
  rangeLower: number,
  rangeUpper: number,
  decimalPlaces = 4,
): number => {
  const exactNumber = Math.random() * (rangeLower - rangeUpper) + rangeUpper;

  return parseFloat(exactNumber.toFixed(decimalPlaces));
};

/**
 * Returns a random valid latitude longitude object
 *
 * @param decimalPlaces
 */
export const getRandomLatLong = (decimalPlaces = 4): LatLong => ({
  lat: getRandomNumberBetweenRange(-90, 90, decimalPlaces),
  long: getRandomNumberBetweenRange(-180, 180, decimalPlaces),
});
