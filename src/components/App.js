import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { handleInitialData } from '../actions';
import Login from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Question from '../components/Question';
import NewQuestion from '../components/NewQuestion';
import Leaderboard from '../components/Leaderboard';
import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar showFastActions />
          <div className="app">
            <Nav/>
            {this.props.loading === true
                ? <Login/>
                : <div>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={Question} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/add' component={NewQuestion} />
                  </div>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
