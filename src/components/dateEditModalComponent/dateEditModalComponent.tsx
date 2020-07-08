import React, { useState } from 'react';

import { Modal, Dropdown, Button } from 'rsuite';

import './dateEditModalComponent.scss';

export enum DropDownOptions {
  WFH = 'WFH',
  WFO = 'WFO',
  DNY = 'DNY'
}

export interface IDateEditModalComponentProps {
  date: Date;
  visible: boolean;
  onClose: () => void;
  onSubmit: (date: Date, option?: DropDownOptions) => void;
}

const DateEditModalComponent: React.FC<IDateEditModalComponentProps> = (props: IDateEditModalComponentProps) => {
  const [option, setOption] = useState<DropDownOptions>();

  // const onSelectHandler = (eventkey: DropDownOptions) => {
  //   setOption(eventkey);
  // };
  const onSubmitEditHandler = () => {
    props.onSubmit(props.date, option);
    props.onClose();
  };

  const clearChanges = () => {
    setOption(undefined);
  };

  return (
    <Modal show={props.visible} onHide={props.onClose} size="xs" overflow={false} onExited={clearChanges}>
      <Modal.Title>{`Edit ${props.date.getDate()} of ${props.date.toLocaleString('default', {
        month: 'long'
      })} ${props.date.getFullYear()}`}</Modal.Title>
      <Modal.Header closeButton={true}></Modal.Header>
      <Modal.Body className="DateEditModalComponent__dropdown-group">
        <p>Where are working from?</p>
        <Dropdown
          className="DateEditModalComponent__dropdown"
          eventKey="WFO"
          appearance="default"
          onSelect={setOption}
          activeKey={option}
          title={option}
        >
          <Dropdown.Item eventKey={DropDownOptions.WFH}>Work From Home</Dropdown.Item>
          <Dropdown.Item eventKey={DropDownOptions.WFO}>Work From Office</Dropdown.Item>
          <Dropdown.Item eventKey={DropDownOptions.DNY}>{"Don't Know Yet"}</Dropdown.Item>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button color="green" onClick={onSubmitEditHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateEditModalComponent;
