import React from 'react';

import BpkMedPriceAlertIcon from 'bpk-component-icon/sm/price-alerts';
import STYLES from './Menu.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/* Stateless component to show the top level menu- Filter, Sort, Price Alerts */
const Menu = () => (
  <div className={c('Menu')}>
    <div className={c('Menu__left')}>
      <span className={c('Menu__left-option')}>Filter</span>
      <span className={c('Menu__left-option')}>Sort</span>
    </div>
    <div className={c('Menu__right')}>
      <BpkMedPriceAlertIcon className={c('Menu__right-alert-icon')} />
      <span className={c('Menu__right-option')}>Price Alerts</span>
    </div>
  </div>
);

export default Menu;
