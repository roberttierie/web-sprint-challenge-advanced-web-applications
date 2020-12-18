import React, {useState} from "react";
import {axiosWithAuth} from '../utility/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const initialValues = {
  credentials: {
    username: '',
    password: '',
  }
};

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState(initialValues);

  const handleChanges = (e) => {
    setState({
      ...state,
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', state.credentials)
    .then(response => {
      window.localStorage.setItem('token', response.data.payload)
      history.push('/bubblepage')
    })
    .catch(error=> {
      console.log(error)
    })
  }

  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmits}>
          <input 
          type='text'
          name='username'
          onChange={handleChanges}
          value={state.username}
          />
          <input 
          type='password'
          name='password'
          onChange={handleChanges}
          value={state.password}
          />
          <button type="submit">Log on</button>
        </form>
      </div>
    </>
  );
};

export default Login;
