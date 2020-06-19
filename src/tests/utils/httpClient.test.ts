import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

import { IRequestErrorConfiguration } from '../../domain/models/requestErrorConfiguration';
import { IResponse } from '../../domain/models/response';
import { createApiClient } from '../../utils/httpClient';
import { NotificationHelper } from '../../utils/notificationHelper';

const mockRequestUse = jest.fn();
const mockResponseUse = jest.fn();
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();
const mockInstance = {
  interceptors: {
    request: {
      use: mockRequestUse,
      interceptors: {
        onFulfilled: [] as any[],
        onRejected: [] as any[]
      }
    },
    response: {
      use: mockResponseUse,
      interceptors: {
        onFulfilled: [] as any[],
        onRejected: [] as any[]
      }
    }
  },
  defaults: {
    headers: {}
  },
  get: mockGet,
  post: mockPost,
  put: mockPut,
  delete: mockDelete
};

jest.mock('../../store/appStore');
jest.mock('retry-axios');
jest.mock('axios', () => {
  return {
    create: jest.fn(() => mockInstance)
  };
});

const expectedResponse: IResponse<string> = {
  data: 'TEST',
  status: 200,
  statusText: 'Ok'
};

const notificationErrorSpy = jest.spyOn(NotificationHelper, 'error');

describe('httpClient tests', () => {
  afterEach(() => {
    mockRequestUse.mockClear();
    mockResponseUse.mockClear();
    mockGet.mockClear();
    mockPost.mockClear();
    mockPut.mockClear();
    mockDelete.mockClear();
    mockInstance.defaults.headers = {};
    mockInstance.interceptors.request.interceptors = {
      onFulfilled: [] as any[],
      onRejected: [] as any[]
    };
    mockInstance.interceptors.response.interceptors = {
      onFulfilled: [] as any[],
      onRejected: [] as any[]
    };
    notificationErrorSpy.mockClear();
  });

  it('creates client and sets interceptors', () => {
    const client = createApiClient();

    expect(client).toHaveProperty('get');
    expect(client).toHaveProperty('post');
    expect(client).toHaveProperty('put');
    expect(client).toHaveProperty('delete');
    expect(mockRequestUse).toHaveBeenCalledTimes(1);
    expect(mockResponseUse).toHaveBeenCalledTimes(1);
  });

  it('calls get', async () => {
    mockGet.mockReturnValue(expectedResponse);

    const client = createApiClient();
    const result = await client.get<string>('test');

    expect(result).toStrictEqual(expectedResponse);
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockPost).not.toHaveBeenCalled();
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('calls post', async () => {
    mockPost.mockReturnValue(expectedResponse);

    const client = createApiClient();
    const result = await client.post<string>('test');

    expect(result).toStrictEqual(expectedResponse);
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('calls put', async () => {
    mockPut.mockReturnValue(expectedResponse);

    const client = createApiClient();
    const result = await client.put<string>('test');

    expect(result).toStrictEqual(expectedResponse);
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockPost).not.toHaveBeenCalled();
    expect(mockPut).toHaveBeenCalledTimes(1);
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('calls delete', async () => {
    mockDelete.mockReturnValue(expectedResponse);

    const client = createApiClient();
    const result = await client.delete<string>('test');

    expect(result).toStrictEqual(expectedResponse);
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockPost).not.toHaveBeenCalled();
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  describe('interceptors tests', () => {
    it('checks requestInterceptor - token exists', async () => {
      const token = 'TEST';
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => token);
      mockRequestUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.request.interceptors.onFulfilled.push(interceptors[0]);
      });
      const config = { headers: {} };

      createApiClient();
      mockInstance.interceptors.request.interceptors.onFulfilled[0](config);

      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(config.headers).toHaveProperty('Authorization');
      expect((config.headers as any)['Authorization']).toBe(`Bearer ${token}`);

      getItemSpy.mockRestore();
    });

    it('checks requestInterceptor - token does not exist', async () => {
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
      mockRequestUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.request.interceptors.onFulfilled.push(interceptors[0]);
      });
      const config = { headers: {} };

      createApiClient();
      mockInstance.interceptors.request.interceptors.onFulfilled[0](config);

      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(config.headers).not.toHaveProperty('Authorization');

      getItemSpy.mockRestore();
    });

    it('checks requestErrorInterceptor', () => {
      const error = new Error('Something happenned');
      mockRequestUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.request.interceptors.onRejected.push(interceptors[1]);
      });

      createApiClient();
      expect(() => {
        mockInstance.interceptors.request.interceptors.onRejected[0](error);
      }).toThrow(error);
    });

    it('checks responseInterceptor', () => {
      const response = 'Some response';
      mockResponseUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.response.interceptors.onFulfilled.push(interceptors[0]);
      });

      createApiClient();
      const result = mockInstance.interceptors.response.interceptors.onFulfilled[0](response);

      expect(result).toBe(response);
    });

    it('checks responseErrorInterceptor - no response', () => {
      const error = new Error();
      mockResponseUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.response.interceptors.onRejected.push(interceptors[1]);
      });

      createApiClient();

      expect(() => {
        mockInstance.interceptors.response.interceptors.onRejected[0](error);
      }).toThrow(error);
    });

    it('checks responseErrorInterceptor - has response', () => {
      let actualTitle, actualBody;
      notificationErrorSpy.mockImplementation((title, body) => {
        actualTitle = title;
        actualBody = body;
      });
      const status = 500;
      const statusText = 'Some Error';
      const error: Partial<AxiosError> = {
        message: 'TEST',
        response: {
          data: 'Test',
          status: status,
          statusText: statusText
        } as AxiosResponse
      };
      mockResponseUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.response.interceptors.onRejected.push(interceptors[1]);
      });

      createApiClient();

      expect(() => {
        mockInstance.interceptors.response.interceptors.onRejected[0](error);
      }).toThrow(error as any);
      expect(notificationErrorSpy).toHaveBeenCalledTimes(1);
      expect(actualTitle).toBe(status);
      expect(actualBody).toStrictEqual(statusText);
    });

    it('checks responseErrorInterceptor - error configuration applied', () => {
      let actualTitle, actualBody;
      notificationErrorSpy.mockImplementation((title, body) => {
        actualTitle = title;
        actualBody = body;
      });

      const errorConfiguration = {
        body: 'Test Body',
        title: 'Test Title'
      } as IRequestErrorConfiguration;

      const error: Partial<AxiosError> = {
        config: {
          errorConfiguration: errorConfiguration
        } as AxiosRequestConfig
      };

      mockResponseUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.response.interceptors.onRejected.push(interceptors[1]);
      });

      createApiClient();

      mockInstance.interceptors.response.interceptors.onRejected[0](error);
      expect(notificationErrorSpy).toHaveBeenCalledTimes(1);
      expect(actualTitle).toStrictEqual(errorConfiguration.title);
      expect(actualBody).toStrictEqual(errorConfiguration.body);
    });

    it('checks responseErrorInterceptor - response has type property', () => {
      let actualTitle, actualBody;
      notificationErrorSpy.mockImplementation((title, body) => {
        actualTitle = title;
        actualBody = body;
      });
      const type = 'Test Type';
      const message = 'Test Message';
      const error: Partial<AxiosError> = {
        message: 'TEST',
        response: {
          data: {
            type: type,
            message: message
          },
          status: 500,
          statusText: 'Some Error'
        } as AxiosResponse
      };
      mockResponseUse.mockImplementation((...interceptors: any[]) => {
        mockInstance.interceptors.response.interceptors.onRejected.push(interceptors[1]);
      });

      createApiClient();

      expect(() => {
        mockInstance.interceptors.response.interceptors.onRejected[0](error);
      }).toThrow(error as any);
      expect(notificationErrorSpy).toHaveBeenCalledTimes(1);
      expect(actualTitle).toBe(type);
      expect(actualBody).toStrictEqual(message);
    });
  });
});
