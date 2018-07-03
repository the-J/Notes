import React, { Component } from 'react';

import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import './styles/app.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = {
    loadedFile: ''
  };

  constructor() {
    super();

    ipcRenderer.on('new-file', (event, fileContent) => {
      this.setState({ loadedFile: fileContent });
    });
  }

  render() {
    return (
      <Split>
        <CodeWindow>
          <AceEditor
            mode="markdown"
            theme="monokai"
            onChange={newContent => {
              this.setState({ loadedFile: newContent });
            }}
            name="mardown_editor"
            value={this.state.loadedFile}
          />
        </CodeWindow>

        <RenderedWindow>
          <Markdown>{this.state.loadedFile}</Markdown>
        </RenderedWindow>
      </Split>
    );
  }
}

export default App;

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background: #2f3129;
`;

const RenderedWindow = styled.div`
  background: #2f3129;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #00ff00;
`;
