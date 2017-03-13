import React, {Component} from 'react';
import axios from 'axios';
import wordsToNumbers from 'words-to-numbers';

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
    this.closeModal = this.closeModal.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.currentQuestion = this.currentQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.answerCorrect = this.answerCorrect.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.score = this.score.bind(this);
    this.makePercent = this.makePercent.bind(this);
    this.getQuestions();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getQuestions() {
    axios.get('/api/questions')
      .then(response => {
        const questions = response.data 
        this.setState({ questions });
        this.setState({ remaining: questions.length });
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

  submitAnswer() {
    if(this.answerCorrect(this.state.answerInput)){
      this.setState({correctCount: this.state.correctCount + 1})
    } else {
      this.setState({incorrectCount: this.state.incorrectCount + 1})
    }
    this.setState({ remaining: this.state.remaining - 1})
    this.setState({ questionIndex: this.state.questionIndex + 1})
  }

  answerCorrect(user_answer) {
    var user_answer = user_answer.toLowerCase();
    var answer = this.currentQuestion('answer').toLowerCase()
    return (user_answer === answer || wordsToNumbers(user_answer) === parseInt(answer))
  }

  score() {
    var score = this.makePercent(this.state.correctCount, this.state.questionIndex) 
    return score
  }

  makePercent(numerator, denominator) {
    if (denominator === 0) {return '0%'}
    var percent = (numerator / denominator) * 100
    var percent = percent.toFixed(1) + '%'
    return percent 
  }

  inputChange(e) {
    this.setState({ answerInput: e.target.value });
  }

  render() {
    var currentQuestion = this.currentQuestion();
    return (
      <div>
        <div className="row">
          <div className="col-md-2 col-md-offset-2 pull-left">
            <span className="col-md-12 text-center">Remaining</span>
            <span className="col-md-12 text-center">{this.state.remaining}</span>
          </div>
          <div className="col-md-2 pull-left">
            <span className="col-md-12 text-center">Wrong</span>
            <span className="col-md-12 text-center">{this.state.incorrectCount}</span>
          </div>
          <div className="col-md-2 pull-left">
            <span className="col-md-12 text-center">Right</span>
            <span className="col-md-12 text-center">{this.state.correctCount}</span>
          </div>
          <div className="col-md-2 pull-left">
            <span className="col-md-12 text-center">Score</span>
            <span className="col-md-12 text-center">{this.score()}</span>
          </div>

          <div id="question-holder" className="col-md-8 col-md-offset-2 text-center">
            <span dangerouslySetInnerHTML={{ __html:this.currentQuestion('question_content')}}></span>
          </div>
          <div id="answer-holder" className="col-md-8 col-md-offset-2 text-center">
            {this.currentQuestion('answer')}
          </div>
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="input-group">
              <input onChange={this.inputChange} type="text"className="form-control" placeholder="Answer"/>
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

