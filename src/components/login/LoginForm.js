import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from 'axios';
import { baseApiUrl } from '../../utils/constants/apiUrl';

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';

const LoginForm = () => {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formNullError, setFormNullError] = useState('');
  const [formLengthError, setFormLengthError] = useState('');
  const [invalidLoginInfo, setInvalidLoginInfo] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleJustifyClick = (value) => {
    resetFormState();

    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const validateInput = () => {
    const username = formData.username;
    const password = formData.password;
    resetFormState();
    if (username === '' || password === '') {
      setFormNullError('Please enter your username and password');
      return true;
    }
    if (password.length <= 7) {
      setFormLengthError('Please set a password of at least 8 characters');
      return true;
    }
    return false;
  };

  const resetFormState = () => {
    setFormNullError('');
    setFormLengthError('');
    setInvalidLoginInfo(false);
  };

  const handleRegisterUser = async () => {
    if (validateInput()) {
      return;
    }

    const username = formData.username;
    const password = formData.password;
    const account = {
      username: username,
      password: password,
    };

    await axios({
      url: `${baseApiUrl}/users`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(account),
    }).then((e) => {
      window.alert('user created');
      window.location = '/login';
    });
  };
  const handleLogin = async () => {
    if (validateInput()) return;

    const username = formData.username;
    const password = formData.password;

    const account = {
      username: username,
      password: password,
    };

    await axios({
      url: `${baseApiUrl}/users/login`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(account),
      credentials: 'include',
    }).then((res) => {
      if (res.data.errorCode === 400) {
        setInvalidLoginInfo(true);
        console.log('login fail');
        return;
      }
      console.log('login Succeed');
      window.location = '/';
    });
  };

  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
      <h1> Todo List LoginForm</h1>
      <br></br>
      <MDBTabs
        pills
        justify
        className='mb-3 d-flex flex-row justify-content-between'
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick('tab1')}
            active={justifyActive === 'tab1'}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick('tab2')}
            active={justifyActive === 'tab2'}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
          <MDBInput
            wrapperClass='mb-4'
            name='username'
            label='Username'
            type='text'
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            type='password'
            name='password'
            onChange={handleChange}
          />
          {formNullError !== '' ? (
            <div className='formNullError'> {formNullError} </div>
          ) : (
            <div></div>
          )}
          {setFormLengthError !== '' ? (
            <div className='formLengthError'> {formLengthError} </div>
          ) : (
            <div></div>
          )}
          {invalidLoginInfo === true ? (
            <div className='invalidLoginInfo'>invalid login information</div>
          ) : (
            <div></div>
          )}

          <MDBBtn className='mb-4 w-100' onClick={handleLogin}>
            Sign in
          </MDBBtn>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <MDBInput
            wrapperClass='mb-4'
            type='text'
            name='username'
            label='Username'
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass='mb-4'
            type='password'
            name='password'
            label='Password'
            onChange={handleChange}
          />
          {formNullError !== '' ? (
            <div className='formNullError'> {formNullError} </div>
          ) : (
            <div></div>
          )}
          {setFormLengthError !== '' ? (
            <div className='formLengthError'> {formLengthError} </div>
          ) : (
            <div></div>
          )}
          <MDBBtn className='mb-4 w-100' onClick={handleRegisterUser}>
            Sign up
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default LoginForm;
