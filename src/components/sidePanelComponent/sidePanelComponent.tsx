import React, { ReactNode } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Footer, IconButton, Icon } from 'rsuite';

import './sidePanelComponent.scss';

export interface ISidePanelComponentProps {
  footerContent?: ReactNode;
  children: ReactNode;
  title?: string;
  showHistoryBack: boolean;
}

const SidePanelComponent: React.FC<ISidePanelComponentProps> = (props: ISidePanelComponentProps) => {
  const history = useHistory();

  const renderHistoryButton = () => {
    return (
      props.showHistoryBack && (
        <span className="SidePanelComponent__history-button">
          <IconButton
            onClick={history.goBack}
            appearance="link"
            size="lg"
            icon={<Icon icon="arrow-left-line" size="lg" />}
          />
        </span>
      )
    );
  };

  return (
    <Container className="SidePanelComponent">
      {renderHistoryButton()}
      <Link className="SidePanelComponent__logo" to="/"></Link>
      {props.title && <div className="SidePanelComponent__title">{props.title}</div>}
      <Content className="SidePanelComponent__content">{props.children}</Content>
      <Footer className="SidePanelComponent__footer">{props.footerContent}</Footer>
    </Container>
  );
};

export default SidePanelComponent;
