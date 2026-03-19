import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import { BASE_URL } from '../data/constants.js';

async function fetchPlaces() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  return data.places;
}

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetchPlaces().then((data) => {
      setAvailablePlaces(data);
    });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
