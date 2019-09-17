import React from 'react';
import BpkLargeRightArrowIcon from 'bpk-component-icon/lg/long-arrow-right';
import PropTypes from 'prop-types';

import STYLES from './FilterLayout.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/* Stateless component to show the origin and destination stations filter */
const FilterLayout = props => (
  <div className={c('FilterLayout')}>
    <div className={c('FilterLayout__place')}>
      <span>{props.params.originPlace}</span>
      <BpkLargeRightArrowIcon className={c('FilterLayout__place__arrow-icon')} />
      <span>{props.params.destinationPlace}</span>
    </div>
    <div className={c('FilterLayout__details')}>
      <div>{props.params.adults} travellers&#44; {props.params.cabinClass}</div>
    </div>
  </div>
);

FilterLayout.propTypes = {
  params: PropTypes.shape({
    originPlace: PropTypes.string.isRequired,
    destinationPlace: PropTypes.string.isRequired,
    adults: PropTypes.number.isRequired,
    cabinClass: PropTypes.string.isRequired,
  }).isRequired,
};

export default FilterLayout;
