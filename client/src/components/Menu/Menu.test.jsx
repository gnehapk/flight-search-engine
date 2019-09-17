import React from 'react';
import TestRenderer from 'react-test-renderer';
import Menu from './Menu';

describe('Menu', () => {
  it('should render correctly', () => {
    const tree = TestRenderer.create(<Menu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

