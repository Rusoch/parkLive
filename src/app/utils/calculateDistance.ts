import { TPlaceLocation } from "../types/place";

export function calculateDistanceInKm(destination: TPlaceLocation) {
  return new Promise((resolve, reject) => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng),
            destination: new window.google.maps.LatLng(destination.lat, destination.lng),
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              // Assuming a single route with one leg
              const leg = result?.routes[0].legs[0];
              const distanceInMeters = leg?.distance?.value;
              const distanceInKilometers = distanceInMeters ? distanceInMeters / 1000 : "--";
              resolve(distanceInKilometers);
            } else if (status === "ZERO_RESULTS") {
              // If no route is found, resolve with '--'
              resolve("--");
            } else {
              reject(new Error(`Directions request failed due to ${status}`));
            }
          },
        );
      },
      (error) => {
        reject(error);
      },
    );
  });
}
