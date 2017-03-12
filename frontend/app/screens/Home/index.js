import React, {Component} from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TextEditor from 'components/editor';
import QuestionList from 'screens/Home/components/QuestionList.js';
import axios from 'axios';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '60%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      questions: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.getEditorText = this.getEditorText.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }
  componentDidMount() {
    this.getQuestions()
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getQuestions() {
    axios.get('/api/questions')
      .then(response => {
        const questions = response.data 
        this.setState({ questions });
        this.setState({ showList: true});
      }).catch(error => {
        this.setState({ questions: false });
        this.setState({ error: "oops something went wrong!"});
      });
  }

  createQuestion() {
    console.log(this.state.questionContent)
    axios.post('/api/questions', {
      question_content: this.state.questionContent,
      answer: this.state.answerInput 
      })
      .then(response => {
        this.getQuestions()
      }).catch(error => {
        console.log(error)
      });
  }

  getEditorText(value){
    const questionContent = value.toString('html')
    this.setState({ questionContent })
  }

  inputChange(e) {
    this.setState({ answerInput: e.target.value });
  }

  render() {

    if(this.state.questions){
      var questionList = this.state.questions.map(function(question, index) {
        return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{question.question_content}</td>
                <td>{question.answer}</td>
                <td><button type="button" className="btn btn-default">Edit</button></td>
              </tr>;
      })
    }
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1>Quiz Master</h1>
            <p>...</p>
            <p><Link to="quiz"><button type="button" className="btn btn-primary btn-lg">Take the Quiz!</button></Link></p>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <h2 ref="subtitle">Create New Question</h2>
          <div className="form-group">
            <label className="control-label col-xs-2">Question</label>
            <div className="col-xs-10">
              <TextEditor
              onChange={this.getEditorText}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-xs-2">Answer</label>
            <div className="col-xs-10">
              <input type="text" onChange={ this.inputChange } className="form-control" id="input-answer" placeholder="Answer"/>
            </div>
          </div>
          <span>Created!</span>
          <button onClick={this.createQuestion} type="button" className="btn btn-success pull-right">Create</button>
          <button onClick={this.closeModal} type="button" className="btn btn-default pull-right">Cancel</button>
        </Modal>

        <div className="container">
          <QuestionList
            questions={this.state.questions}
         
          ></QuestionList>
          <button onClick={this.openModal} type="button" className="btn btn-success">Add a Question</button>
        </div>
      </div>
    );
  }
}
