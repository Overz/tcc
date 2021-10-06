import axios from 'axios';
import { GOOGLE_KEY_API } from '~/constants/constants';

export interface IbgeApi {
  nome: string;
}

// https://www.gps-coordinates.net/
// https://api.opencagedata.com/geocode/v1/json?q=-27.5859209+-48.5978803&key=641c51bed8ab490184632ad8526e29ad&no_annotations=1&language=en
export const GEO_API_PARAMS =
  'key=641c51bed8ab490184632ad8526e29ad&no_annotations=1&language=en';
export const freeGeoApi = axios.create({
  baseURL: 'https://api.opencagedata.com/geocode/v1/json',
});

// https://maps.googleapis.com/maps/api/geocode/json?
// &key=xxxxxxxxxxxxx
// &address=Rua%20jose%20luiz%20vieira%2C%20florianopolis%2C%20sc%2C%20brasil
export const googleGeoCodeApi = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/geocode/json?&key=${GOOGLE_KEY_API}`,
});

export const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
});

// axios.defaults.headers.[chave] = valor
export const api = axios.create({
  baseURL: 'http://192.168.0.41:3000',
  headers: { 'Content-Type': 'application/json' },
});
