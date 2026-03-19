import { useEffect, useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function getStoredPlacesIDs() {
  return JSON.parse(localStorage.getItem("selectedPlaces")) || [];
}

function saveStoredPlacesIDs(ids) {
  localStorage.setItem("selectedPlaces", JSON.stringify(ids));
}

const pickedPlacesStoredIDs = getStoredPlacesIDs();

const storedPickedPlaces = pickedPlacesStoredIDs.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function getFilteredPlaces() {
  return AVAILABLE_PLACES.filter(
    (place) => !storedPickedPlaces.some((storedPlace) => storedPlace.id === place.id)
  );
}

let geoPosition;

function App() {
  const filteredAvailablePlaces = getFilteredPlaces();

  const selectedPlace = useRef();
  const [isModalOpen, setModalOpen] = useState();
  const [availablePlaces, setAvailsablePlaces] = useState(filteredAvailablePlaces);
  const [pickedPlaces, setPickedPlaces] = useState(storedPickedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      geoPosition = position;

      const {
        coords: { latitude, longitude }
      } = geoPosition;

      const filteredAvailablePlaces = getFilteredPlaces();

      const sortedPlaces = sortPlacesByDistance(filteredAvailablePlaces, latitude, longitude);

      setAvailsablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      let pickedPlace;
      let newAvailablePlaces = availablePlaces.filter((place) => {
        if (place.id === id) {
          pickedPlace = place;
          return false;
        } else return true;
      });

      if (!pickedPlace) return prevPickedPlaces;
      else {
        if (geoPosition) {
          const {
            coords: { latitude, longitude }
          } = geoPosition;

          newAvailablePlaces = sortPlacesByDistance(newAvailablePlaces, latitude, longitude);
        }

        setAvailsablePlaces(newAvailablePlaces);

        const newPickedPlaces = [pickedPlace, ...prevPickedPlaces];
        saveStoredPlacesIDs(newPickedPlaces.map((place) => place.id));

        return newPickedPlaces;
      }
    });
  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) => {
      let removedPlace;
      const newPickedPlaces = prevPickedPlaces.filter((place) => {
        if (place.id === selectedPlace.current) {
          removedPlace = place;
          return false;
        } else return true;
      });

      if (removedPlace) {
        let newAvailablePlaces = [...availablePlaces, removedPlace];

        if (geoPosition) {
          const {
            coords: { latitude, longitude }
          } = geoPosition;

          newAvailablePlaces = sortPlacesByDistance(newAvailablePlaces, latitude, longitude);
          setAvailsablePlaces(newAvailablePlaces);
        }

        saveStoredPlacesIDs(newPickedPlaces.map((place) => place.id));
      }

      return newPickedPlaces;
    });
    setModalOpen(false);
  }, [availablePlaces]);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
          fallbackText={"Sorting places by distance..."}
        />
      </main>
    </>
  );
}

export default App;
