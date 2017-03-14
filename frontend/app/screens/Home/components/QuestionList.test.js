import React from 'react';
import { mount, shallow } from 'enzyme';
import QuestionList from './QuestionList';

describe('QuestionList', () => {

  it('should modals and <table>', () => {
    const wrapper = shallow(<QuestionList/>);
    expect(wrapper.find('DeleteModal')).to.have.length(1);
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('should render the `question` in <table>', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('tbody')).to.contain.text('The first question');
  });

  it('should render the `error message` in <table>', () => {
    const message = "Uh oh, we didn't get any data...";
    const wrapper = renderComponent({false});
    expect(wrapper.find('tbody')).to.contain.text(message);
  });

  it('openModal accepts both edit and delete and updates state', () => {
    const wrapper = renderComponent();
    wrapper.instance().openModal("delete")
    expect(wrapper.state().modalIsOpen).to.be.true;

    wrapper.instance().openModal("edit")
    expect(wrapper.state().editModalIsOpen).to.be.true;
  });

  it('closeModal resets initial state', () => {
    const wrapper = renderComponent();
    wrapper.instance().closeModal()
    expect(wrapper.state().modalIsOpen).to.be.false;
    expect(wrapper.state().editModalIsOpen).to.be.false;
    expect(wrapper.state().message).to.be.false;
    expect(wrapper.state().error).to.be.false;
  });

  it('resetMessages resets message and error', () => {
    const wrapper = renderComponent();
    wrapper.instance().closeModal()
    expect(wrapper.state().message).to.be.false;
    expect(wrapper.state().error).to.be.false;
  });

  it('onEditOrDeleteClick calls correct callback', () => {
    const wrapper = renderComponent();
    wrapper.instance().onEditOrDeleteClick(5, 'delete')
    expect(wrapper.state().modalIsOpen).to.be.true;
    expect(wrapper.state().questionId).to.equal(5);
  });

  it('setQuestionId sets questionId state', () => {
    const wrapper = renderComponent();
    wrapper.instance().setQuestionId(3);
    expect(wrapper.state().questionId).to.equal(3);
  });
});

function renderComponent(
    props = {
      questions: [{"id":1,
                   "question_content":"The first question",
                   "answer":"6",
                   "created_at":"2017-03-11T09:52:09.202Z",
                   "updated_at":"2017-03-11T09:52:09.202Z"}]
      }) {
  return mount(<QuestionList {...props} />);
}
