import React, {Component} from 'react';

import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import './styles/app.css';

const {ipcRenderer} = window.require('electron');

class App extends Component {
    state = {
        loadedFile: ''
    };

    constructor() {
        super();

        ipcRenderer.on('new-file', (event, loadedFile) => {
            this.setState({loadedFile});
        });

        ipcRenderer.on('new-dir', (event, dir, files) => {
            this.setState({
                directory: dir
            });

            console.log('client', dir, files);
        });
    }

    render() {
        return (
            <div>
                <Header>Notes</Header>
                <Split>
                    <CodeWindow>
                        <AceEditor
                            mode="markdown"
                            theme="monokai"
                            onChange={newContent => {
                                this.setState({loadedFile: newContent});
                            }}
                            name="mardown_editor"
                            value={this.state.loadedFile}
                        />
                    </CodeWindow>

                    <RenderedWindow>
                        <Markdown>{this.state.loadedFile}</Markdown>
                    </RenderedWindow>
                </Split>
            </div>
        );
    }
}

export default App;

const Header = styled.header`
  background-color: #2f3129;
  color: #75717c;
  font-size: 1rem;
  height: 23px;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
`;

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
