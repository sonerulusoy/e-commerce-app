import { ReactNode } from 'react';

interface FooterListProps {
  children: ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return <div className='col-span-1'>{children}</div>;
};

export default FooterList;