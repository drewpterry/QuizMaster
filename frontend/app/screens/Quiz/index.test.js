import React from 'react';
import {render, mount, shallow} from 'enzyme';
import sinon from 'sinon';
import moxios from 'moxios';
import Quiz from './index.js';

describe('<Quiz />', () => {

  it('should have a ScoreTracker and Modal', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ScoreTracker')).to.have.length(1);
  });

  it('openModal opens modal', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().openModal()
    expect(wrapper.state().modalIsOpen).to.be.true;
  });

  it('closeModel closes model opens modal', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().openModal()
    wrapper.instance().closeModal()
    expect(wrapper.state().modalIsOpen).to.be.false;
  });

  it('makePercent should return 0% if denominator is 0', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().makePercent(5,0)).to.equal('0%');
  });

  it('makePercent should return correct percent', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().makePercent(1,3)).to.equal('33.3%');
  });

  it('score should return 0% at beginning of test', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().score()).to.equal('0%');
  });

  it('score should return 100.0% at if answered correctly', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().nextQuestion()
    wrapper.instance().incrementCount('correct')
    expect(wrapper.instance().score()).to.equal('100.0%');
  });

  it('nextQuestion should increment questionIndex', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().nextQuestion()
    expect(wrapper.state().questionIndex).to.equal(1);
  });

  it('incrementCount should increment correctCount if argument true', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().incrementCount(true)
    expect(wrapper.state().correctCount).to.equal(1);
  });

  it('incrementCount should increment incorrectCount if argument false', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().incrementCount(false)
    expect(wrapper.state().incorrectCount).to.equal(1);
  });

  it('resetState resets state', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().nextQuestion()
    wrapper.instance().resetQuiz()
    expect(wrapper.state().modalIsOpen).to.be.false;
    expect(wrapper.state().questionIndex).to.equal(0);
    expect(wrapper.state().correctCount).to.equal(0);
    expect(wrapper.state().incorrectCount).to.equal(0);
    expect(wrapper.state().remaining).to.equal(0);
  });

  it('submitAnswer updates stats', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.instance().submitAnswer()
    expect(wrapper.state().showAnswer).to.be.true;
  });
});
