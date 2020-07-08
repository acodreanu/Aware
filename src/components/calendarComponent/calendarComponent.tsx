import React, { useState } from 'react';
import { Calendar } from 'rsuite';
import DateEditModalComponent, { DropDownOptions } from '../dateEditModalComponent/dateEditModalComponent';

import './calendarComponent.scss';

export interface ICalendarComponentProps {
  days: number;
  onSubmit: (date: Date, option?: DropDownOptions) => void;
}

const CalendarComponent: React.FC<ICalendarComponentProps> = (props: ICalendarComponentProps) => {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState<Date>();

  const renderCell = (date: Date) => {
    return <p></p>;
  };

  const dateSelect = (date: Date) => {
    setDate(date);
    setEdit(true);
  };

  const onEditModalClose = () => {
    setEdit(false);
  };

  return (
    <div>
      <Calendar bordered={true} renderCell={renderCell} onSelect={dateSelect}></Calendar>
      <DateEditModalComponent
        onSubmit={props.onSubmit}
        onClose={onEditModalClose}
        visible={edit}
        date={date ?? new Date()}
      />
    </div>
  );
};

export default CalendarComponent;
