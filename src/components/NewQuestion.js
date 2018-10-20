import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions';
import { withRouter } from 'react-router-dom';

class NewQuestion extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(handleAddQuestion(this.optionOneInput.value,this.optionTwoInput.value))
      .then(() => {
        this.props.history.push('/');
      });
  }
  render() {
    return (
      <div className="new-question">
        <header><h1>Create New Question</h1></header>
        <div className="user">
          <h5>Would you rather?</h5>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="optionOneInput">Option 1</label>
              <input type="text" className="form-control" id="optionOneInput" placeholder="Option 1" ref={(input) => this.optionOneInput = input}/>
            </div>
            <div className="form-group">
              <label htmlFor="optionTwoInput">Option 2</label>
              <input type="text" className="form-control" id="optionTwoInput" placeholder="Option 2" ref={(input) => this.optionTwoInput = input}/>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users
  };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
