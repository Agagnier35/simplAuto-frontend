import React from 'react';
import { FaBell as NotificationIcon } from 'react-icons/fa';

export interface NotificationsProps {
  notifications: any[];
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  return (
    <div className="notifications">
      {notifications.length > 0 && <span>{notifications.length}</span>}
      <NotificationIcon />
    </div>
  );
};
