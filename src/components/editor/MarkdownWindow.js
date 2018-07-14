import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';

import store from '../../store';

class MarkdownWindow extends Component {
    render() {
        const input = store.getState().editorInputReducer.result || '';

        return (
            <RenderedWindow>
                <Markdown>{input}</Markdown>
            </RenderedWindow>
        )
    }
}

export default MarkdownWindow;

const RenderedWindow = styled.div`
  background: #2f3129;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #302b3a;
`;