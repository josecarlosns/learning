import { sleep } from './utils/jsUtils';
import { BASE_URL } from './data/constants';

export async function fetchAvailablePlaces() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  await sleep(2000); // fake time to load

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return data.places;
}
