import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions';

class Login extends Component {
  handleLogin(id) {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(id));
  }
  render() {
    const { users } = this.props;

    return (
      <div className="login">
        <header><h1>Please select an user</h1></header>
        <div className="users">
        {users && users.map((user) => (
          <div className="user" key={user.id} onClick={(e) => { this.handleLogin(user.id); }}>
            <div><img src={user.avatarURL} alt={user.name} height="100" /></div>
            <h5>{user.name}</h5>
          </div>
        ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }, props) {
  return {
    users: Object.values(users)
  };
}

export default connect(mapStateToProps)(Login);
