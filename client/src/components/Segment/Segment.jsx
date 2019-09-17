import React from 'react';
import BpkSmallRightArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import PropTypes from 'prop-types';

import logo from '../../assets/EZ.png';
import STYLES from './Segment.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/* Stateless component to show the details of each segment */
const Segment = props => (
  <div className={c('Segment')}>
    <div className={c('Segment__left')}>
      <div className={c('Segment__left-item')}>
        <img className={c('Segment__flight-logo')} src={logo} alt="flight logo" />
      </div>
      <div className={c('Segment__left-item')}>
        <div>{props.segmentDetails.departure}</div>
        <div className={c('Segment__left-item--place')}>{props.segmentDetails.origin}</div>
      </div>
      <div className={c('Segment__left-item--img-container')}>
        <BpkSmallRightArrowIcon className={c('Segment__left-item--img-container-img')} />
      </div>
      <div className={c('Segment__left-item')}>
        <div>{props.segmentDetails.arrival}</div>
        <div className={c('Segment__left-item--place')}>{props.segmentDetails.destination}</div>
      </div>
    </div>
    <div className={c('Segment__right')}>
      <div>{props.segmentDetails.duration}</div>
      <div className={c('Segment__right--stop')}>{props.segmentDetails.stops ? `${props.segmentDetails.stops} Stop(s)` : 'Direct'}</div>
    </div>
  </div>
);

Segment.propTypes = {
  segmentDetails: PropTypes.shape({
    departure: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    stops: PropTypes.number.isRequired,
  }).isRequired,
};

export default Segment;
