import React from 'react';
import {render} from 'enzyme';
import QuestionList from './QuestionList';

describe('QuestionList', () => {
  it('should render the `question` in <table>', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('tbody')).to.contain.text('The first question');
  });

  it('should render the `error message` in <table>', () => {
    const message = "Uh oh, we didn't get any data...";
    const wrapper = renderComponent({false});
    expect(wrapper.find('tbody')).to.contain.text(message);
  });
});

function renderComponent(props = {questions: [{"id":1,"question_content":"The first question","answer":"6","created_at":"2017-03-11T09:52:09.202Z","updated_at":"2017-03-11T09:52:09.202Z"}]}) {
  return render(<QuestionList {...props} />);
}
