import React, {Component} from 'react';

import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import './styles/app.css';

const settings = window.require('electron-settings');
const {ipcRenderer} = window.require('electron');
const fs = window.require('fs');

class App extends Component {
    state = {
        loadedFile: '',
        filesData: [],
        directory: settings.get('directory') || null
    };

    constructor() {
        super();

        if (settings.get('directory')) {
            this.loadAndReadFiles(settings.get('directory'));
        }

        ipcRenderer.on('new-file', (event, loadedFile) => this.setState({loadedFile}));

        ipcRenderer.on('new-dir', (event, directory) => {
            this.setState({directory});
            settings.set('directory', directory);

            this.loadAndReadFiles(directory);
        });
    }

    loadAndReadFiles = directory => {
        fs.readdir(directory, (err, files) => {
            if (err) return console.error('readdir err:', err);
            if (!files && !files.length) return console.log('No matches');

            const filteredFiles = files.filter(file => file.includes('.md'));
            const filesData = filteredFiles.map(file => ({path: `${directory}/${file}`}));

            this.setState({
                    filesData
                }, () => this.loadFile(0)
            );
        });
    };

    loadFile = index => {
        const {filesData} = this.state;

        const content = fs.readFileSync(filesData[index].path).toString();

        this.setState({loadedFile: content});

    };

    render() {
        return (
            <AppWrapp>
                <Header>Notes</Header>
                {
                    this.state.directory ? (
                        <Split>
                            <FilesWindow>
                                {
                                    this.state.filesData.map((file, i) => (
                                        <button onClick={() => this.loadFile(i)}>{file.path}</button>
                                    ))
                                }

                            </FilesWindow>
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
            </AppWrapp>
        );
    }
}

export default App;

const AppWrapp = styled.div`
  margin-top: 23px;
`;
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

const FilesWindow = styled.div`
  background: #2f3129;
  border-right: solid 1px #302b3a;
  position: relative;
  width: 20%;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: -10px - 20px rgba(0,0,0,0.3) inset;
  }
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
  border-left: 1px solid #7ba3ff;
`;
