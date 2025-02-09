export type TPlaceLocation = {
  lat: number;
  lng: number;
};

export type TPlaceData = {
  placeId: number;
  placeLocation: TPlaceLocation;
  address: string;
  totalSpace: number;
  freeSpace: number;
  rate: number;
  paymentType: string[];
  opens: string;
  closes: string;
};

export type TQueryResult = {
  shortAddress: string;
  longAddress: string;
  placeLocation: TPlaceLocation;
};
