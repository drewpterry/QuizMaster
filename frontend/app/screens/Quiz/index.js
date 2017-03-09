import React, {Component} from 'react';

export default class Quiz extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.context.router.push({pathname: `/${this._input.value}`});
  }

  render() {
    return (
      <div>
        <div class="row">
            <div id="question-holder" className="col-md-6 col-md-offset-3 text-center">
              this is a question my friend
            </div>
            <div id="answer-holder" className="col-md-6 col-md-offset-3 text-center">
              and this is hte answer
            </div>
            <form
              className="col-md-6 col-md-offset-3 form-inline text-center"
              role="form"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Enter a GitHub user..."
                    className="form-control"
                    ref={ref => (this._input = ref)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Go
              </button>
            </form>
        </div>
      </div>
    );
  }
}

Quiz.contextTypes = {
  router: React.PropTypes.object.isRequired,
}
