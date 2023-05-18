import React from 'react';

import styles from './styles.module.scss';

interface ToggleViewOnGridProps {
  children: React.ReactNode;
  isOpen: boolean;
}
const ToggleViewOnGrid = ({ children, isOpen }: ToggleViewOnGridProps) => {
  return <div className={styles.ToggleViewOnGrid + ' ' + (isOpen ? styles.expanded : '') }>
    <div className={styles.expanderContent}>
      {children}
    </div>
  </div>;
};

export default React.memo(ToggleViewOnGrid);
