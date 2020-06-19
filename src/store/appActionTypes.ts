import { HomeActionTypes } from './actionTypes/homeActionTypes';
import { AuthActionTypes } from './actionTypes/authActionTypes';
import { UserManagementTypes } from './actionTypes/userManagementTypes';

export type AppActionTypes = HomeActionTypes | AuthActionTypes | UserManagementTypes;
