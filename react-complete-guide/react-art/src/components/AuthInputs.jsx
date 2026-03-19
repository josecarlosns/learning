import { styled } from 'styled-components';

import { useState } from 'react';
import CustomInput from './CustomInput';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  line-height: inherit;

  &:focus {
    outline: none;
  }

  ${({ filled }) =>
    filled
      ? {
          padding: '1rem 2rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          borderRadius: '0.25rem',
          color: '#1f2937',
          backgroundColor: '#f0b322',
          borderRadius: '6px',
          border: 'none',

          '&:hover': {
            backgroundColor: '#f0920e',
          },
        }
      : {
          color: '#f0b322',
          border: 'none',
          '&:hover': {
            color: '#f0920e',
          },
        }}
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer className="controls">
        <p>
          <CustomInput
            id={'email'}
            label={'email'}
            isInvalid={emailNotValid}
            type="email"
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <CustomInput
            id={'passwd'}
            label={'Password'}
            isInvalid={passwordNotValid}
            type="password"
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </ControlContainer>
      <div className="actions">
        <Button type="button">Create a new account</Button>
        <Button filled onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
