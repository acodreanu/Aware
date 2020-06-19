import { ActiveSection } from '../../domain/enums/activeSection';

export interface IHomeState {
  readonly simpleValue: string;
  readonly asyncError: string;
  readonly asyncResult: string;
  readonly signingUp: boolean;
  readonly loggingIn: boolean;
  readonly activeSection?: ActiveSection;
}

export const initialHomeState: IHomeState = {
  simpleValue: 'Initial value',
  asyncError: '',
  asyncResult: '',
  signingUp: false,
  loggingIn: false,
  activeSection: undefined
};
