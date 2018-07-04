import React, {Component} from 'react';

import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import './styles/app.css';

const settings = window.require('electron-settings');
const {ipcRenderer} = window.require('electron');

class App extends Component {
    state = {
        loadedFile: '',
        directory: settings.get('directory') || null
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

            settings.set('directory', dir);
        });
    }

    render() {
        return (
            <div>
                <Header>Notes</Header>
                {
                    this.state.directory ? (
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
                    ) : (
                        <LoadingMessage>
                            <h1>Press CmdOrCtrl + O to open directory</h1>
                        </LoadingMessage>
                    )
                }

            </div>
        );
    }
}

export default App;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #75717c;
  background: #2f3129;
  height: 100vh;
`;

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
