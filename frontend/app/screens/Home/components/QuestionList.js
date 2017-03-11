import React, {Component} from 'react';
import axios from 'axios';

export default class QuestionList extends Component {

  render() {

    if(this.props.questions){
      var questionList = this.props.questions.map(function(question, index) {
        return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{question.question_content}</td>
                <td>{question.answer}</td>
                <td><button type="button" className="btn btn-default">Edit</button></td>
              </tr>;
      })
    } else {
      var questionList = "Uh oh, we didn't get any data..." 
    }
    return (
      <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {questionList}
            </tbody>
          </table>
      </div>
    );
  }
}

