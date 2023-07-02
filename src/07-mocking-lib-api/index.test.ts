import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const USERS_PATH = 'users';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: USERS_PATH }),
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(USERS_PATH);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(USERS_PATH);
    expect(mock.get).toHaveBeenCalledWith(USERS_PATH);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(USERS_PATH);
    const result = await throttledGetDataFromApi(USERS_PATH);
    expect(result).toEqual(USERS_PATH);
  });
});
