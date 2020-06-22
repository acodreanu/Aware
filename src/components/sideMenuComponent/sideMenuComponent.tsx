import React from 'react';
import { Container, Content, Footer, Tooltip, Whisper, Icon } from 'rsuite';
import { Link } from 'react-router-dom';

import { ActiveSection } from '../../domain/enums/activeSection';

import './sideMenuComponent.scss';
import { RoleType } from '../../domain/enums/roleType';

export interface ISideMenuComponentProps {
  profileImageUrl?: string;
  activeSection?: ActiveSection;
  onLogoutClick: () => void;
  roleType?: RoleType;
}

const linkClass = (icon: ActiveSection, selected?: ActiveSection) =>
  `SideMenuComponent__button ${selected === icon ? '' : 'SideMenuComponent__button_opaque'}`;
const iconClass = (icon: ActiveSection, selected?: ActiveSection) =>
  `SideMenuComponent__button-icon ${selected === icon ? ' SideMenuComponent__button_selected' : ''}`;

const getWhisperProps = (text: string) => {
  return {
    placement: 'right' as const,
    trigger: 'hover' as const,
    speaker: <Tooltip>{text}</Tooltip>
  };
};

const renderManagerItems = (selected?: ActiveSection) => {
  return (
    <>
      <Whisper {...getWhisperProps('User Management')}>
        <Link className={linkClass(ActiveSection.UserManager, selected)} to="/user-management">
          <Icon className={iconClass(ActiveSection.UserManager, selected)} icon="user-info" />
        </Link>
      </Whisper>
    </>
  );
};

// const renderAgentItems = (selected?: ActiveSection) => {
//   return (
//     <>
//       <Whisper {...getWhisperProps('Work')}>
//         <Link className={linkClass(ActiveSection.Work, selected)} to="/conversation">
//           <Icon className={iconClass(ActiveSection.Work, selected)} icon="briefcase" />
//         </Link>
//       </Whisper>
//       <Whisper {...getWhisperProps('Search')}>
//         <Link className={linkClass(ActiveSection.Search, selected)} to="/chat-search">
//           <Icon className={iconClass(ActiveSection.Search, selected)} icon="search" />
//         </Link>
//       </Whisper>
//     </>
//   );
// };

const SideMenuComponent: React.FC<ISideMenuComponentProps> = (properties: ISideMenuComponentProps) => {
  console.log(properties.roleType);
  const renderUpsideItems = () => {
    if (properties.roleType === RoleType.Manager) {
      return renderManagerItems(properties.activeSection);
    } //else {
    // return renderAgentItems(properties.activeSection);
    // }
  };

  const renderDownsideItems = () => {
    return (
      <>
        <Link className="SideMenuComponent__icon" to="/profile">
          {/* <Avatar circle={true} src={properties.profileImageUrl} size="sm" style={{ border: '1px solid' }} />
           <span className="SideMenuComponent__status-badge SideMenuComponent__status-badge_state-online"></span>
          {' '} */}
        </Link>
        <Whisper {...getWhisperProps('Logout')}>
          <span className="SideMenuComponent__button" onClick={properties.onLogoutClick}>
            <Icon className="SideMenuComponent__button-icon" icon="sign-out" />
          </span>
        </Whisper>
      </>
    );
  };

  const render = () => {
    return (
      <Container justify="start" className="SideMenuComponent">
        <Content>{renderUpsideItems()}</Content>
        <Footer>{renderDownsideItems()}</Footer>
      </Container>
    );
  };

  return render();
};

export default SideMenuComponent;
