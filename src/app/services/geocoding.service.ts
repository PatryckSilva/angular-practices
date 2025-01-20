import { Injectable } from '@angular/core';
import { googleApiKey } from '../../utils/constants';
import { Observable } from 'rxjs';
import { httpClient } from '../../infra/http-client';
import { HttpResponse } from '../../@types/httpTypes';
import { GoogleResponse } from '../../@types';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiKey = googleApiKey;

  constructor() {}

  geocodeAddress(address: string): Promise<HttpResponse<GoogleResponse>> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;

    return httpClient.request({ method: 'get', url });
  }
}
