import { createApiClient } from '../utils/httpClient';
import { IUser } from '../domain/models/user';

async function signUp(email: string, password: string, confirmPassword: string): Promise<IUser | undefined> {
  const apiClient = createApiClient();
  const model = {
    email: email,
    password: password,
    confirmPassword: confirmPassword
  };
  try {
    const response = await apiClient.put<IUser, typeof model>('auth/signup', model);
    return response.data;
  } catch (err) {
    return undefined;
  }
}

async function login(email: string, password: string): Promise<string | undefined> {
  const apiClient = createApiClient();
  const model = {
    email: email,
    password: password
  };

  try {
    const response = await apiClient.post<string, typeof model>('auth/login', model);
    return response.data;
  } catch (err) {
    return undefined;
  }
}

async function getUsers(): Promise<IUser[] | undefined> {
  const apiClient = createApiClient();
  // const response = await apiClient.get<IUser[]>('users/');

  try {
    const response = await apiClient.get<IUser[]>('users/');
    return response.data;
  } catch (err) {
    return undefined;
  }
}

export { signUp, login, getUsers };
