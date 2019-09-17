import React, { PureComponent } from 'react';
import axios from 'axios';
import { BpkLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';

import FilterLayout from '../FilterLayout';
import Menu from '../Menu';
import Flight from '../Filght';
import STYLES from './SearchFlightBuilder.scss';

const c = className => STYLES[className] || 'UNKNOWN';

/* Stateful component to build the overall search flight views */
class SearchFlightBuilder extends PureComponent {
  // format the value if less than 10
  static formatValue = val => ((val < 10) ? `0${val}` : val)

  static formatDate = (dt) => {
    const year = dt.getFullYear();
    const month = SearchFlightBuilder.formatValue(dt.getMonth() + 1);
    const day = SearchFlightBuilder.formatValue(dt.getDate());
    return `${year}-${month}-${day}`;
  }

  static getNextMondayDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + (((1 + 7) - d.getDay()) % 7));
    return (SearchFlightBuilder.formatDate(d));
  }

  static getNextTuesdayDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + (((2 + 7) - d.getDay()) % 7));
    return (SearchFlightBuilder.formatDate(d));
  }

  state = {
    loadingState: true,
    error: false,
    filteredList: [],
    // get direct rount trip flights for 2 adults, economy class from EDI to LOND
    params: {
      originPlace: 'EDI',
      destinationPlace: 'LOND', // considering all airports of London
      outboundDate: SearchFlightBuilder.getNextMondayDate(),
      inboundDate: SearchFlightBuilder.getNextTuesdayDate(),
      adults: 2,
      stops: 0,
      groupPricing: true,
      cabinClass: 'Economy',
      pageIndex: 0,
      pageSize: 5,
    },
    scrollCalled: false,
  };

  componentDidMount = () => {
    this.getFlightList();
    this.scrollRef.current.addEventListener('scroll', this.handleScroll);
  };

  /* Fetched a part of the whole list. Later on used on load scroll to get the data */
  getFlightList = () => {
    this.setState({ loadingState: true });
    axios.get('/api/search', {
      params: this.state.params,
    })
      .then((response) => {
        const updatedList = [...this.state.filteredList, ...response.data];

        this.setState({ filteredList: updatedList });
        this.setState({ loadingState: false });

        // once response received, mark to scrollCalled false,
        // so that api call be made on next scroll
        this.setState({ scrollCalled: false });

        if (!response.data.length) {
          this.removeScrollEvent();
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  updateParams = () => {
    const updatedParams = { ...this.state.params, pageIndex: this.state.params.pageIndex + 1 };
    this.setState({ params: updatedParams }, this.getFlightList);
  };

  scrollRef = React.createRef();

  handleScroll = () => {
    // make sure scroll should be called once
    if ((this.scrollRef.current.scrollTop + this.scrollRef.current.clientHeight >=
      this.scrollRef.current.scrollHeight) && !this.state.scrollCalled) {
      this.updateParams();
      this.setState({ scrollCalled: true });
    }
  };

  removeScrollEvent = () => {
    this.scrollRef.current.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    let flightList = this.state.loadingState && <BpkLargeSpinner className={c('Search-flight-builder--spinner')} type={SPINNER_TYPES.primary} />;

    if (this.state.filteredList.length) {
      flightList =
        this.state.filteredList.map(flight =>
          <Flight key={flight.id} flightDetails={flight} />);
    }

    return (
      <div className={c('Search-flight-builder')} ref={this.scrollRef}>
        <FilterLayout params={this.state.params} />
        <Menu />
        {flightList}
        {this.state.filteredList.length && this.state.loadingState ? <p className={c('Search-flight-builder--loading')} >Loading more...</p> : ''}
        {!this.state.loadingState && this.state.error && <p className={c('Search-flight-builder__error-msg')}>Not able to fetch data properly!</p>}
      </div>
    );
  }
}

export default SearchFlightBuilder;
