import React from 'react';
import { Notification } from 'rsuite';
import { PlacementType, NotificationProps } from 'rsuite/lib/Notification';

const defaultPlacement: PlacementType = 'bottomEnd';

const getConfig = (
  title?: React.ReactNode,
  body?: React.ReactNode,
  key?: string,
  placement: PlacementType = defaultPlacement
) => {
  const config: NotificationProps = { title: title, description: body, key: key, placement: placement };
  return config;
};

const info = (title?: React.ReactNode, body?: React.ReactNode, key?: string, placement?: PlacementType) => {
  const config = getConfig(title, body, key, placement);
  Notification.info(config);
};

const success = (title?: React.ReactNode, body?: React.ReactNode, key?: string, placement?: PlacementType) => {
  const config = getConfig(title, body, key, placement);
  Notification.success(config);
};

const warning = (title?: React.ReactNode, body?: React.ReactNode, key?: string, placement?: PlacementType) => {
  const config = getConfig(title, body, key, placement);
  Notification.warning(config);
};

const error = (title?: React.ReactNode, body?: React.ReactNode, key?: string, placement?: PlacementType) => {
  const config = getConfig(title, body, key, placement);
  Notification.error(config);
};

const close = (key?: string) => {
  Notification.close(key);
};

const closeAll = () => {
  Notification.closeAll();
};

export const NotificationHelper = {
  info,
  success,
  warning,
  error,
  close,
  closeAll
};
