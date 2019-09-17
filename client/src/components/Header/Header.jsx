import React from 'react';

import BpkSmallMenuIcon from 'bpk-component-icon/sm/menu';
import logo from '../../assets/logo.svg';
import STYLES from './Header.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/* Stateless component to show the Header of the app */
const Header = () => (
  <header className={c('Header')}>
    <a href="/">
      <span className={c('Header__hidden-text')}>Skyscanner</span>
      <img className={c('Header__logo-image')} alt="Skyscanner" src={logo} />
    </a>
    <BpkSmallMenuIcon className={c('Header__icons-menu')} />
  </header>
);

export default Header;
