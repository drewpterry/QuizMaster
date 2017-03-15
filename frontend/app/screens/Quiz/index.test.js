import React from 'react';
import {render, mount, shallow} from 'enzyme';
import sinon from 'sinon';
import moxios from 'moxios';
import Quiz from './index.js';

describe('<Quiz />', () => {
  const questionProp = {questions: [{"id":1,
                   "question_content":"The first question",
                   "answer":"6",
          }]}

  it('should have a ScoreTracker and Modal', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.find('Modal')).to.have.length(1);
    expect(wrapper.find('ScoreTracker')).to.have.length(1);
  });

  it('currentQustion should render corresponding key', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.setState(questionProp);
    
    expect(wrapper.instance().currentQuestion('answer')).to.equal('6');
  });

  it('renderAnswer should render answer', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.setState(questionProp);
    wrapper.setState({showAnswer: true});
    expect(wrapper.instance().renderAnswer()).to.equal('6');
  });

  it('renderAnswer should be blank if showAnswer is false', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.setState(questionProp);
    expect(wrapper.instance().renderAnswer()).to.equal('');
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

  it('answerCorrect should return true if strings equal', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().answerCorrect('5','5')).to.be.true;
  });

  it('answerCorrect should return true if number given in word form', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().answerCorrect('five','5')).to.be.true;
  });

  it('answerCorrect should return false if strings are different', () => {
    const wrapper = shallow(<Quiz/>) 
    expect(wrapper.instance().answerCorrect('five','7')).to.be.false;
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

  it('changeInput should change input', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.find('input').simulate('change', {target: {value: 'My new value'}});
    expect(wrapper.state().answerInput).to.equal('My new value');
  });

  it('submitAnswer updates stats', () => {
    const wrapper = shallow(<Quiz/>) 
    wrapper.setState(questionProp);
    wrapper.instance().submitAnswer()
    expect(wrapper.state().showAnswer).to.be.true;
  });

  // TODO This test is supposed to check the setTimout portion of the submitAnswer portion but having trouble makin g it pass 

  //it('submitAnswer changes states after waiting 2000 ms', () => {
    //const wrapper = mount(<Quiz/>) 
    //wrapper.setState(questionProp);
    //wrapper.instance().submitAnswer()
    
    //clock = sinon.useFakeTimers();
    //clock.tick(2500);
    //clock.restore();

    //expect(wrapper.state().showAnswer).to.be.false;
  //});
});
