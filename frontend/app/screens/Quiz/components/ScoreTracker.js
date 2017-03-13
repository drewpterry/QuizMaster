import React, {Component} from 'react';

export default class ScoreTracker extends Component {

  render() {
    return (
      <div>
        <div className="col-md-2 col-md-offset-2 pull-left">
          <span className="col-md-12 text-center">Remaining</span>
          <span className="col-md-12 text-center">{this.props.remainin}</span>
        </div>
        <div className="col-md-2 pull-left">
          <span className="col-md-12 text-center">Wrong</span>
          <span className="col-md-12 text-center">{this.props.incorrectCount}</span>
        </div>
        <div className="col-md-2 pull-left">
          <span className="col-md-12 text-center">Right</span>
          <span className="col-md-12 text-center">{this.props.correctCount}</span>
        </div>
        <div className="col-md-2 pull-left">
          <span className="col-md-12 text-center">Score</span>
          <span className="col-md-12 text-center">{this.props.score}</span>
        </div>
      </div>
    );
  }
}

