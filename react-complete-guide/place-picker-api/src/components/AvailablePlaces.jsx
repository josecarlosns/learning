import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import { BASE_URL } from '../data/constants.js';
import { sleep } from '../utils/jsUtils.js';

async function fetchPlaces() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  await sleep(2000); // fakke time to load

  return data.places;
}

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlaces().then((data) => {
      setAvailablePlaces(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      loadingText="Loading places"
      isLoading={isLoading}
      onSelectPlace={onSelectPlace}
    />
  );
}
