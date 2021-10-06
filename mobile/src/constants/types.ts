export interface Indexable {
  [key: string]: any;
}
export interface ApiGeoLocation {
  results: [
    {
      components: {
        'ISO_3166-1_apha-2': string;
        city: string;
        country: string;
        neighbourhood: string;
        postcode: string;
        region: string;
        road: string;
        // eslint-disable-next-line camelcase
        state_code: string;
        suburb: string;
        // eslint-disable-next-line camelcase
        country_code: string;
        state: string;
      };
      formatted: string;
    }
  ];
}

// eslint-disable-next-line no-unused-vars
export type FunctionVoid = (...params: any[]) => void | Promise<void>;

// eslint-disable-next-line no-unused-vars
export type FunctionAny = (...params: any[]) => any | Promise<any>;

// eslint-disable-next-line no-unused-vars
export type FunctionUnknown = (...params: any[]) => unknown | Promise<unknown>;
