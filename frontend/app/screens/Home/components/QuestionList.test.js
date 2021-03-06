import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import QuestionList from './QuestionList';
import sinon from 'sinon';

describe('QuestionList', () => {
  const questionProp = {questions: [{"id":1,
                   "question_content":"The first question",
                   "answer":"6",
          }]}

  it('should have modals and <table>', () => {
    const wrapper = shallow(<QuestionList {...questionProp}/>);
    expect(wrapper.find('DeleteModal')).to.have.length(1);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('should render the `question` in <table>', () => {
    const wrapper = mount(<QuestionList {...questionProp} />);
    expect(wrapper.find('tbody')).to.contain.text('The first question');
  });

  it('should render the `error message` in <table>', () => {
    const message = "Uh oh, there was a problem getting the data...";
    const wrapper = mount(<QuestionList />);
    expect(wrapper.find('tbody')).to.contain.text(message);
  });

  it('should render create question message', () => {
    const message = "You have no questions! Add one to get started!";
    const wrapper = mount(<QuestionList questions={[]} />);
    expect(wrapper.find('tbody')).to.contain.text(message);
  });

  it('openModal accepts both edit and delete and updates state', () => {
    const wrapper = mount(<QuestionList {...questionProp} />);
    wrapper.instance().openModal("delete")
    expect(wrapper.state().modalIsOpen).to.be.true;

    wrapper.instance().openModal("edit")
    expect(wrapper.state().editModalIsOpen).to.be.true;
  });

  it('closeModal resets initial state', () => {
    const wrapper = mount(<QuestionList {...questionProp} />);
    wrapper.instance().closeModal()
    expect(wrapper.state().modalIsOpen).to.be.false;
    expect(wrapper.state().editModalIsOpen).to.be.false;
    expect(wrapper.state().message).to.be.false;
    expect(wrapper.state().error).to.be.false;
  });

  it('resetMessages resets message and error', () => {
    const wrapper = mount(<QuestionList {...questionProp} />);
    wrapper.instance().closeModal()
    expect(wrapper.state().message).to.be.false;
    expect(wrapper.state().error).to.be.false;
  });

  it('onEditOrDeleteClick calls correct callback', () => {
    const wrapper = mount(<QuestionList {...questionProp} />);
    wrapper.instance().onEditOrDeleteClick(5, 'delete')
    expect(wrapper.state().modalIsOpen).to.be.true;
    expect(wrapper.state().questionId).to.equal(5);
  });

  it('setQuestionId sets questionId state', () => {
    const wrapper = mount(<QuestionList {...questionProp} />);
    wrapper.instance().setQuestionId(3);
    expect(wrapper.state().questionId).to.equal(3);
  });

  //TODO research more into mocking API for tests so that you can test the api requests (https://github.com/mzabriskie/moxios)
});
