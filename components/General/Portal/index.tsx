import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '../../../lib/Hooks/usePortal';

interface PortalProps {
  id: string;
  children: ReactNode;
}

const Portal = ({ id, children }: PortalProps) => {
  const target: any = usePortal(id);
  return createPortal(children, target);
};

export default Portal;
