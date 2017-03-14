import React from 'react';
import {render, shallow} from 'enzyme';
import sinon from 'sinon';
import ScoreTracker from './ScoreTracker.js';

describe('<ScoreTracker />', () => {
  it('should have four props', () => {
    const wrapper = shallow(<ScoreTracker/>) 
    expect(wrapper.props().children.length).to.equal(4)
  });
});
