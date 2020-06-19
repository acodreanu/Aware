import React, { ReactNode } from 'react';
import { Sidebar, Content, Container } from 'rsuite';

import SidePanelComponent from '../sidePanelComponent/sidePanelComponent';

import './pageWithSidePanelComponent.scss';

export interface IPageWithSidePanelComponentProps {
  title?: string;
  sidePanelContent: ReactNode;
  sidePanelFooter?: ReactNode;
  pageContent?: ReactNode;
  showHistoryBack: boolean;
}

const PageWithSidePanelComponent: React.FC<IPageWithSidePanelComponentProps> = (
  props: IPageWithSidePanelComponentProps
) => {
  return (
    <Container>
      <Sidebar className="PageWithSidePanelComponent__side-bar" width="16%">
        <SidePanelComponent
          showHistoryBack={props.showHistoryBack}
          title={props.title}
          footerContent={props.sidePanelFooter}
        >
          {props.sidePanelContent}
        </SidePanelComponent>
      </Sidebar>
      <Content className="PageWithSidePanelComponent__content">{props.pageContent}</Content>
    </Container>
  );
};

export default PageWithSidePanelComponent;
