import React, {Component} from 'react';
import {connect} from 'react-redux';
import AceEditor from 'react-ace';
import styled from 'styled-components';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import '../styles/app.css';

import {editorInputAction} from '../actions/editorInputAction';

import NewFile from './NewFile';
import {FilesList} from './FilesList';
import LoadMessage from './LoadMessage';
import MarkdownWindowWrapper from './MarkdownWindowWrapper';

const settings = window.require('electron-settings');
const {ipcRenderer} = window.require('electron');
const fs = window.require('fs');

class App extends Component {
    state = {
        loadedFile: '',
        filesData: [],
        activeIndex: 0,
        directory: settings.get('directory') || null
    };

    constructor() {
        super();
        if (settings.get('directory')) this.loadAndReadFiles(settings.get('directory'));

        ipcRenderer.on('new-file', (event, loadedFile) => this.setState({loadedFile}));
        ipcRenderer.on('save-file', event => this.saveFile());

        ipcRenderer.on('new-dir', (event, directory) => {
            this.setState({directory});
            settings.set('directory', directory);

            this.loadAndReadFiles(directory);
        });
    }

    loadAndReadFiles = (directory, index = 0) => {
        fs.readdir(directory, (err, files) => {
            if (err) return console.error('readdir err:', err);
            if (!files && !files.length) return console.log('No matches');

            const filteredFiles = files.filter(file => file.includes('.md'));
            const filesData = filteredFiles.map(file => {
                const date = file.substr(
                    file.indexOf('_') + 1,
                    file.indexOf('.') - file.indexOf('_') - 1
                );

                return {
                    date,
                    path: `${directory}/${file}`,
                    title: file.substr(0, file.indexOf('_'))
                };
            });

            filesData.sort((a, b) => {
                const aDate = new Date(a.date);
                const aSec = aDate.getTime();
                const bDate = new Date(b.date);
                const bSec = bDate.getTime();
                return bSec - aSec ? 1 : -1;
            });

            this.setState({
                    filesData
                }, () => this.loadFile(index)
            );
        });
    };

    changeFile = index => () => {
        if (index !== this.state.activeIndex) {
            this.saveFile();
            this.loadFile(index);
        }
    };

    loadFile = index => {
        const {filesData} = this.state;
        if (filesData && filesData.length) {
            const content = fs.readFileSync(filesData[index].path).toString();
            this.setState({
                loadedFile: content,
                activeIndex: index
            });
        }
    };

    saveFile = () => {
        const {activeIndex, loadedFile, filesData} = this.state;

        fs.writeFile(filesData[activeIndex].path, loadedFile, err => {
            if (err) return console.error('writeFile err:', err);
            console.log('files saved');
        });
    };

    editorInputAction = (input) => {
        this.props.editorInputAction(input);
    };

    render() {
        const {activeIndex, loadedFile, filesData, directory} = this.state;

        return (
            <AppWrapp>
                <Header>{directory ? directory : 'Notes'}</Header>
                {
                    directory ? (
                        <Split>
                            <FilesWindow>
                                <NewFile
                                    directory={directory}
                                    reloadFiles={this.loadAndReadFiles}
                                />

                                <FilesList
                                    list={filesData}
                                    index={activeIndex}
                                    onChange={this.changeFile}
                                />
                            </FilesWindow>

                            <CodeWindow>
                                <AceEditor
                                    mode="markdown"
                                    theme="monokai"
                                    onChange={input => {
                                        this.editorInputAction(input);
                                        this.setState({loadedFile: input});
                                    }}
                                    name="mardown_editor"
                                    value={loadedFile}
                                />
                            </CodeWindow>

                            <MarkdownWindowWrapper />
                        </Split>
                    ) : (
                        <LoadMessage />
                    )
                }
            </AppWrapp>
        );
    }
}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    editorInputAction: (input) => dispatch(editorInputAction(input))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

const AppWrapp = styled.div`
  margin-top: 2vh;
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
  height: 98vh;
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
