import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import { BASE_URL } from '../data/constants.js';
import { sleep } from '../utils/jsUtils.js';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';

async function fetchPlaces() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    await sleep(2000); // fake time to load

    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }

    return data.places;
  } catch (error) {
    throw error;
  }
}

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPlaces()
      .then((places) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const {
            coords: { latitude, longitude }
          } = position;

          const sortedPlaces = sortPlacesByDistance(
            places,
            latitude,
            longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

        setAvailablePlaces(places);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    const { message } = error;

    return <ErrorPage title="An error ocurred" message={message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      loadingText="Loading places"
      isLoading={isLoading}
      error={error}
      onSelectPlace={onSelectPlace}
    />
  );
}
