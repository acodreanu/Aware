import React, { useEffect, Dispatch } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IAppState } from '../../store/appState';
import { IUser } from '../../domain/models/user';
import { HomeActionCreators } from '../../store/actionCreators/homeActionCreators';
import { ActiveSection } from '../../domain/enums/activeSection';
import { AppActionTypes } from '../../store/appActionTypes';
import CalendarComponent from '../../components/calendarComponent/calendarComponent';
import { DropDownOptions } from '../../components/dateEditModalComponent/dateEditModalComponent';

export interface ICalendarContainerProps {
  user: IUser;
}

const CalendarContainer: React.FC<ICalendarContainerProps> = (properties: ICalendarContainerProps) => {
  const dispatch = useDispatch<Dispatch<AppActionTypes>>();

  useEffect(() => {
    dispatch(HomeActionCreators.changeActiveSection(ActiveSection.Calendar));

    return () => {
      dispatch(HomeActionCreators.changeActiveSection(undefined));
    };
  }, [dispatch]);

  const onEditDate = (date: Date, option?: DropDownOptions) => {
    // dispatch()
  }

  return <CalendarComponent onSubmit={onEditDate} days={23}></CalendarComponent>;
};

const mapStateToProps = (state: IAppState) => {
  return {
    users: state.authState.user
  };
};

export default connect(mapStateToProps)(CalendarContainer);
