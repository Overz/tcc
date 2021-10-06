/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export interface Places {
  latitude: number | string;
  longitude: number | string;
  type: 'locality' | 'sublocality';
  radius?: number;
}

export interface GoogleApi {
  places(places: Places): Promise<any[]>;
}

const baseURL = 'https://maps.googleapis.com/maps/api';
const PLACES = '/place/nearbysearch/json';

let google: GoogleApi;

export class GoogleApiImpl implements GoogleApi {
  private key!: string;

  constructor(key: string) {
    this.key = key;
  }

  private api = () => axios.create({ baseURL });

  // https://console.cloud.google.com/apis/credentials?project=tcc-senac-2021
  // https://developers.google.com/maps/documentation/places/web-service/supported_types
  // https://www.outsystems.com/forums/discussion/45171/javascript-on-google-map-mobile-nearby-places-example/
  async places({
    latitude,
    longitude,
    type,
    radius = 10000,
  }: Places): Promise<any[]> {
    const results = (
      await this.api().post(
        `${PLACES}?key=${this.key}&location=${latitude},${longitude}&type=${type}&radius=${radius}`
      )
    ).data.results;

    return results.map(({ name }: any) => name);
  }
}

export const setupGoogleApiService = (key: string) => {
  google = new GoogleApiImpl(key);
};

export const useGoogleApiServices = (instance: GoogleApi) => {
  google = instance;
};

export const getGoogleApiService = () => google;
