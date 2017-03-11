import React, {Component} from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TextEditor from 'components/editor';
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
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        console.log(this.state.questions)
      }).catch(error => {
        this.setState({ questions: false });
        this.setState({ error: "oops something went wrong!"});
      });
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

              onChange={this.testFunction}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-xs-2">Answer</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" id="input-answer" placeholder="Answer"/>
            </div>
          </div>
          <button type="button" className="btn btn-success pull-right">Create</button>
          <button type="button" className="btn btn-default pull-right">Cancel</button>
        </Modal>
        <div className="container">
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
          <button onClick={this.openModal} type="button" className="btn btn-success">Add a Question</button>
        </div>
      </div>
    );
  }
}
