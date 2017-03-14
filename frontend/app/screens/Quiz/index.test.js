import React from 'react';
import {render, shallow} from 'enzyme';
import sinon from 'sinon';
import Quiz from './index.js';

describe('<Quiz />', () => {
  it('should have a ScoreTracker and Modal', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ScoreTracker')).to.have.length(1);
  });

  it('score should be 0% at beginning of test', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().score()).to.equal('0%');
  });

  it('score should be 100.0% at if answered correctly', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().nextQuestion()
    wrapper.instance().incrementCount('correct')
    expect(wrapper.instance().score()).to.equal('100.0%');
  });
});
