import React, { useState } from 'react';
import {
  FaBell as NotificationIcon,
  FaEnvelope as MessageIcon,
} from 'react-icons/fa';
import { Wrapper, Badge, Popup, Notification, Icon, Time } from './styles';
import {
  Notification as NotificationObject,
  NotificationType,
} from '../../../generated/graphql';
import { GiCarKey as OfferIcon } from 'react-icons/gi';
import Link from 'next/link';
import { multi, MultiProps } from '../../../lib/MultiLang';
import moment from 'moment';

export interface NotificationsProps extends MultiProps {
  notifications: NotificationObject[];
}

const Notifications = ({ notifications, translations }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function getHref(notification: NotificationObject) {
    switch (notification.type) {
      case NotificationType.Offer_Message:
        return { pathname: '/offer', query: { id: notification.objectID } };
      case NotificationType.New_Offer:
        // TODO change to link to single conversation
        return { pathname: '/offer', query: { id: notification.objectID } };
      default:
        return {
          pathname: '/',
        };
    }
  }
  function getIcon(notification: NotificationObject) {
    switch (notification.type) {
      case NotificationType.Offer_Message:
        return <MessageIcon />;
      case NotificationType.New_Offer:
        return <OfferIcon />;
      default:
        return null;
    }
  }

  function getMessage(notification: NotificationObject) {
    switch (notification.type) {
      case NotificationType.Offer_Message:
        return translations.Notifications.newOfferMessage(notification.count);
      case NotificationType.New_Offer:
        return translations.Notifications.newOffer;
      default:
        return '';
    }
  }

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)}>
      {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
      <NotificationIcon />
      <Popup isOpen={isOpen}>
        {notifications.map((notification: NotificationObject) => (
          <Link href={getHref(notification)}>
            <a>
              <Notification>
                <Icon>{getIcon(notification)}</Icon>
                {getMessage(notification)}
                <Time>
                  {moment(notification.updatedAt).format('DD[/]MM[/]YY')}
                </Time>
              </Notification>
            </a>
          </Link>
        ))}
      </Popup>
    </Wrapper>
  );
};

export default multi(Notifications);
