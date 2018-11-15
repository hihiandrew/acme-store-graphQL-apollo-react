import React, { Component } from 'react';
import { AUTH_TOKEN } from '../index';
import gql from 'graphql-tag';
import { Mutation, ApolloConsumer } from 'react-apollo';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  }
`;
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $password: String!) {
    signup(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      error: '',
      login: true,
    };
  }
  saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSave = data => {
    const { login } = this.state;
    const { history } = this.props;
    const { token } = login ? data.login : data.signup;
    this.saveUserData(token);
    history.push('/');
  };
  render() {
    const { name, password, error, login } = this.state;
    const { history } = this.props;
    const { handleChange, handleSave } = this;
    return (
      <div>
        <input name="name" type="text" value={name} onChange={handleChange} />
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <br />
        {/* direct write to local state with ApolloConsumer + client.writeData() */}
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ name, password }}
              onCompleted={data => {
                const { user } = login ? data.login : data.signup;
                // console.log('client.write', user);
                client.writeData({ data: { authUser: user } });
                handleSave(data);
                history.push('/cart');
              }}
            >
              {mutation => (
                <button onClick={mutation}>{login ? 'Login' : 'Signup'}</button>
              )}
            </Mutation>
          )}
        </ApolloConsumer>
        <button onClick={() => this.setState({ login: !login })}>
          {login ? 'Create An Account' : 'Already Have An Account?'}
        </button>
        {error}
      </div>
    );
  }
}

export default Login;
