import React, {Component} from 'react';
import styled from 'styled-components';

import '../styles/app.css';

import NewFile from './reusable/NewFile';
import FilesListWrapper from './filesList/FilesListWrapper';
import LoadMessage from './reusable/LoadMessage';
import EditorWrapper from './editor/EditorWrapper';

const settings = window.require('electron-settings');
const {ipcRenderer} = window.require('electron');
const fs = window.require('fs');


class App extends Component {
    constructor() {
        super();

        ipcRenderer.on('new-file', (event, loadedFile) => this.setState({loadedFile}));

        ipcRenderer.on('new-dir', (event, directory) => {
            settings.set('directory', directory);

            this.loadAndReadFiles(directory);
        });

        this.state = {
            directory: settings.get('directory')
        };
    }

    render() {
        const {directory} = this.state;

        return (
            <AppWrapp>
                <Header>{directory ? directory : 'Notes'}</Header>
                {
                    directory ? (
                        <Split>
                            <FilesWindow>
                                <NewFile />
                                <FilesListWrapper />
                            </FilesWindow>

                            <EditorWrapper />
                        </Split>
                    ) : (
                        <LoadMessage />
                    )
                }
            </AppWrapp>
        );
    }
}

//
// const mapStateToProps = state => ({
//     ...state
// });
//
// const mapDispatchToProps = dispatch => ({
//     editorInputAction: (input) => dispatch(editorInputAction(input))
// });

export default App;

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
