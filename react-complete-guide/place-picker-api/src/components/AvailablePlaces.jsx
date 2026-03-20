import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../https.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAvailablePlaces()
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
