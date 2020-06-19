import { IRequestErrorConfiguration } from './requestErrorConfiguration';

export interface IRequestConfiguration {
  headers?:
    | undefined
    | {
        [key: string]: string;
      };
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | undefined;
  errorConfiguration?: IRequestErrorConfiguration;
}
