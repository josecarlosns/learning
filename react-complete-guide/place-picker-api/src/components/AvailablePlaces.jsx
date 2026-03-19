import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import { BASE_URL } from '../data/constants.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAvailablePlaces(data.places);
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
