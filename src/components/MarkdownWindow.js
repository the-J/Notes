import React from 'react';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';

const MarkdownWindow = ({input}) => (
    <RenderedWindow>
        <Markdown>{input}</Markdown>
    </RenderedWindow>
);

export default MarkdownWindow;

const RenderedWindow = styled.div`
  background: #2f3129;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #302b3a;
`;