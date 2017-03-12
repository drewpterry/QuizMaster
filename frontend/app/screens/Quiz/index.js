import React, {Component} from 'react';
import axios from 'axios';

export default class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      questions: false,
      correctCount: 0,
      incorrectCount: 0,
      remaining: false,
      questionIndex: 0
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.currentQuestion = this.currentQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.getQuestions()
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getQuestions(callback) {
    axios.get('/api/questions')
      .then(response => {
        const questions = response.data 
        this.setState({ questions });
      }).catch(error => {
        this.setState({ questions: false });
        this.setState({ error: "oops something went wrong!"});
      });
  }

  checkAnswer(callback) {
    axios.get('/api/questions')
      .then(response => {
        const questions = response.data 
        this.setState({ questions });
      }).catch(error => {
        this.setState({ questions: false });
        this.setState({ error: "oops something went wrong!"});
      });
  }
  
  currentQuestion(key) {
    if(this.state.questions[this.state.questionIndex]) {
      return this.state.questions[this.state.questionIndex][key];
    }
  }

  submitAnswer(e) {
   this.setState({ questionIndex: this.state.questionIndex + 1})
   this.setState({ answerInput: e.target.value });
  }

  render() {
    var currentQuestion = this.currentQuestion();
    return (
      <div>
        <div className="row">
          <div id="question-holder" className="col-md-6 col-md-offset-3 text-center">
            {this.currentQuestion('question_content')}
          </div>
          <div id="answer-holder" className="col-md-6 col-md-offset-3 text-center">
            {this.currentQuestion('answer')}
          </div>
          <div className="col-md-6 col-md-offset-3 text-center">
            <div className="input-group">
              <input type="text"className="form-control" placeholder="Answer"/>
              <span className="input-group-btn">
                <button onClick={this.submitAnswer} className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

