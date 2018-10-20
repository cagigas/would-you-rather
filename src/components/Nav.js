import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions';
import { NavLink, withRouter } from 'react-router-dom';

class Nav extends Component {
  handleLogout() {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="top-navigation">
        <ul>
          <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
          <li><NavLink to='/add' exact activeClassName='active'>New Question</NavLink></li>
          <li><NavLink to='/leaderboard'>Leader Board</NavLink></li>
          {this.props.authedUser && (
            <li className="nav-logout" onClick={(e) => { this.handleLogout(); }}>({this.props.authedUser.name}) Logout</li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser ? users[authedUser]: null
  }
}

export default withRouter(connect(mapStateToProps)(Nav));
