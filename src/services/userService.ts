import { createApiClient } from '../utils/httpClient';
import { IUser } from '../domain/models/user';
import { RoleType } from '../domain/enums/roleType';
import { IUserForSaving } from '../domain/models/userForSaving';

async function signUp(
  name: string,
  email: string,
  role: RoleType,
  password: string,
  confirmPassword: string
): Promise<IUser | undefined> {
  const apiClient = createApiClient();
  const model = {
    name: name,
    email: email,
    role: role,
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

async function saveUser(user: IUserForSaving): Promise<boolean> {
  const apiClient = createApiClient();

  try {
    const response = await apiClient.post<boolean, IUserForSaving>('users/', user);
    return response.data;
  } catch (err) {
    return false;
  }
}

async function editUser(user: IUserForSaving): Promise<boolean> {
  const apiClient = createApiClient();

  try {
    const response = await apiClient.put<boolean, IUserForSaving>('users/', user);
    return response.data;
  } catch (err) {
    return false;
  }
}

async function deleteUser(email: string): Promise<boolean> {
  const apiClient = createApiClient();

  try {
    const response = await apiClient.delete<boolean>('users/' + email);
    return response.data;
  } catch (err) {
    return false;
  }
}

export { signUp, login, getUsers, saveUser, deleteUser, editUser };
