/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleApi, Places } from '../../services/google';

class MockGoogleApiServices implements GoogleApi {
  places({ radius = 10000 }: Places): Promise<any[]> {
    if (radius && radius > 5000) {
      return new Promise<any[]>((resolve) => {
        resolve(['Florianópolis', 'São José, Santa Catarina']);
      });
    }

    return new Promise<any[]>((resolve) => {
      resolve(['Florianópolis']);
    });
  }
}

export { MockGoogleApiServices };
