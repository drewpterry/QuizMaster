import React, {Component} from 'react';
import Modal from 'react-modal';
import TextEditor from 'components/editor';

const customStyles = {
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
export default class EditorModal extends Component {

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.props.afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Create Modal"
        >
          <button onClick={this.props.closeModal} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <h2>{this.props.title}</h2>
          <div className="form-group">
            <label className="control-label col-xs-2">Question</label>
            <div className="col-md-10">
              <TextEditor
                value={this.props.editorValue}
                onChange={this.props.editorChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-md-2">Answer</label>
            <div className="col-md-10">
              <input onChange={this.props.inputChange} type="text" className="form-control" id="input-answer" placeholder="Answer" value={this.props.answerValue}/>
            </div>
          </div>
          <span>{this.props.error}</span>

          <button onClick={this.props.actionClick} type="button" className="btn btn-success pull-right">{this.props.actionButtonName}</button>
          <button onClick={this.props.closeModal} type="button" className="btn btn-default pull-right">{this.props.closeButtonName}</button>
        </Modal>
      </div>

    );
  }
}
