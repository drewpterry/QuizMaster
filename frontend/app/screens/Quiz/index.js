import React, {Component} from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import wordsToNumbers from 'words-to-numbers';
import ScoreTracker from 'screens/Quiz/components/ScoreTracker';
import Modal from 'react-modal';

export default class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      questions: false,
      correctCount: 0,
      incorrectCount: 0,
      remaining: 0,
      questionIndex: 0,
      showAnswer: false,
      answerInput: '' 
    };
    this.baseState = this.state;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.currentQuestion = this.currentQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.answerCorrect = this.answerCorrect.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.score = this.score.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.makePercent = this.makePercent.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
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

  renderAnswer() {
    var answer = this.state.showAnswer ? this.currentQuestion('answer') : '';
    return answer
  }

  nextQuestion() {
    this.setState({questionIndex: this.state.questionIndex + 1})
  }

  incrementCount(answerCorrect) {
    if (answerCorrect) {
      this.setState({correctCount: this.state.correctCount + 1})
    } else {
      this.setState({incorrectCount: this.state.incorrectCount + 1})
    }
  }

  submitAnswer() {
    this.setState({showAnswer: true});
    var answerCorrect = this.answerCorrect(this.state.answerInput, this.currentQuestion('answer'));
    this.incrementCount(answerCorrect);
    this.setState({remaining: this.state.remaining - 1})

    var self = this;
    setTimeout(function(){
      if (self.state.remaining === 0) {
        self.openModal()
      }
      self.nextQuestion();
      self.setState({showAnswer: false});
      self.textInput.value = '';
    }, 2000);
  }

  answerCorrect(userAnswer, correctAnswer) {
    var userAnswer = userAnswer.toLowerCase();
    var answer = correctAnswer.toLowerCase();
    return (userAnswer === answer || wordsToNumbers(userAnswer) === parseInt(answer));
  }

  score() {
    var totalAnswered = this.state.correctCount + this.state.incorrectCount;
    var score = this.makePercent(this.state.correctCount, totalAnswered);
    return score;
  }

  makePercent(numerator, denominator) {
    if (denominator === 0) {return '0%'};
    var percent = (numerator / denominator) * 100;
    var percent = percent.toFixed(1) + '%';
    return percent ;
  }

  inputChange(e) {
    this.setState({ answerInput: e.target.value });
  }

  resetQuiz() {
    this.setState(this.baseState);
    this.getQuestions();
  }

  render() {
    var inputClass = this.state.modalIsOpen ? "input-group-hide" : "input-group";
    var inputButtonClass = this.state.modalIsOpen ? "input-group-hide" : "input-group-btn";
    return (
      <div>
        <div className="row">
          <ScoreTracker
            remaining={this.state.remaining}
            incorrectCount={this.state.incorrectCount}
            correctCount={this.state.correctCount}
            score={this.score()}
          >
          </ScoreTracker>

          <div id="question-holder" className="col-md-8 col-md-offset-2 text-center">
            <h2 dangerouslySetInnerHTML={{ __html:this.currentQuestion('question_content')}}></h2>
          </div>
          <div id="answer-holder" className="col-md-8 col-md-offset-2 text-center">
            <h3> {this.renderAnswer()} </h3>
          </div>
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className={inputClass}>
              <input onChange={this.inputChange} ref={(input) => {this.textInput = input;}} type="text" className="form-control" placeholder="Answer"/>
              <span className={inputButtonClass}>
                <button onClick={this.submitAnswer} className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Report Modal"
          shouldCloseOnOverlayClick={false}
        >
          Complete
          {this.score()}
          <Link to="home"><button type="button" className="btn btn-success pull-right">Home</button></Link>
          <button onClick={this.resetQuiz} type="button" className="btn btn-default pull-right">Retry</button>
        </Modal>
      </div>
    );
  }
}

