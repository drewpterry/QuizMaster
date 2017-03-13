import React, {Component} from 'react';
import axios from 'axios';
import wordsToNumbers from 'words-to-numbers';
import ScoreTracker from 'screens/Quiz/components/ScoreTracker';
import Modal from 'react-modal';

export default class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true,
      questions: false,
      correctCount: 0,
      incorrectCount: 0,
      remaining: false,
      questionIndex: 0,
      showAnswer: false,
      answerInput: '' 
    };

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
    this.setState({ questionIndex: this.state.questionIndex + 1})
  }

  incrementCount(countType) {
    if (countType === 'correct') {
        this.setState({correctCount: this.state.correctCount + 1})
    } else {
        this.setState({incorrectCount: this.state.incorrectCount + 1})
    }
  }

  submitAnswer() {
    this.setState({showAnswer: true});
    if(this.answerCorrect(this.state.answerInput)){
      this.incrementCount('correct');
    } else {
      this.incrementCount('incorrect');
    }
    this.setState({ remaining: this.state.remaining - 1})

    var self = this;
    setTimeout(function(){
      self.nextQuestion();
      self.setState({showAnswer: false});
      self.textInput.value = '';
    }, 2000);
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
            <div className="input-group">
              <input onChange={this.inputChange} ref={(input) => { this.textInput = input; }} type="text" className="form-control" placeholder="Answer"/>
              <span className="input-group-btn">
                <button onClick={this.submitAnswer} className="btn btn-default" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.score}
          contentLabel="Create Modal"
        >
        Complete
        </Modal>
      </div>
    );
  }
}

