import React from 'react';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';
import PropTypes from 'prop-types';

import Segment from '../Segment';

import STYLES from './Flight.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/* Stateless component to show each itinery */
const Flight = props => (

  <BpkCard className={c('Flight')}>
    <Segment segmentDetails={props.flightDetails.legs.outBound} />
    <Segment segmentDetails={props.flightDetails.legs.inBound} />
    <div className={c('Flight__agent')}>
      <div className={c('Flight__agent__left-section')}>
        <div className={c('Flight__agent__left-section--price')}>{props.flightDetails.currency} {props.flightDetails.price}</div>
        <div><img className={c('Flight__agent__left-section--img')} src={props.flightDetails.agent.img} alt="agent name" /></div>
      </div>
      <div className={c('Flight__agent__right-section')}><BpkButton>Select</BpkButton></div>
    </div>
  </BpkCard>
);

Flight.propTypes = {
  flightDetails: PropTypes.shape({
    legs: PropTypes.shape({
      outBound: PropTypes.object.isRequired,
      inBound: PropTypes.object.isRequired,
    }).isRequired,
    currency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    agent: PropTypes.shape({
      img: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Flight;
