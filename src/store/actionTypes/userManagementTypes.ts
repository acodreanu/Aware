import { IUser } from '../../domain/models/user';

export const LOAD_USERS = 'LOAD_USERS';
export const USERS_LOADED = 'USERS_LOADED';

export type LoadUsers = {
  type: typeof LOAD_USERS;
};

export type UsersLoaded = {
  type: typeof USERS_LOADED;
  users: IUser[];
};

export type UserManagementTypes = LoadUsers | UsersLoaded;
