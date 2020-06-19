import { createApiClient } from '../utils/httpClient';

import { IWeatherForecastResponseModel } from './responseModels/weatherForecast/weatherForecastResponseModel';

async function getWeatherForecast(): Promise<IWeatherForecastResponseModel[]> {
  const apiClient = createApiClient();
  const response = await apiClient.get<IWeatherForecastResponseModel[]>('api/weather-forecast');
  const result = response.data;

  return result;
}

export { getWeatherForecast };
