import React from 'react';
import styled from 'styled-components';

const LoadMessage = () => (
    <LoadingMessage>
        <h1>Press CmdOrCtrl + O to open directory</h1>
    </LoadingMessage>
);

export default LoadMessage;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #75717c;
  background: #2f3129;
  height: 100vh;
`;
