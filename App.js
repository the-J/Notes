import React, {Component} from 'react';

import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import dateFns from 'date-fns';

import 'brace/mode/markdown';
import 'brace/theme/monokai';
import './styles/app.css';

const settings = window.require('electron-settings');
const {ipcRenderer} = window.require('electron');
const fs = window.require('fs');

const formatDate = date => dateFns.format(new Date(date), 'MMMM Do YYYY');

class App extends Component {
    state = {
        loadedFile: '',
        filesData: [],
        activeIndex: 0,
        newEntry: false,
        newEntryName: '',
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
        const {activeIndex} = this.state;
        if (index !== activeIndex) {
            this.saveFile();
            this.loadFile(index);
        }
    };

    loadFile = index => {
        const {filesData} = this.state;
        const content = fs.readFileSync(filesData[index].path).toString();
        this.setState({
            loadedFile: content,
            activeIndex: index
        });
    };

    saveFile = () => {
        const {activeIndex, loadedFile, filesData} = this.state;

        fs.writeFile(filesData[activeIndex].path, loadedFile, err => {
            if (err) return console.error('writeFile err:', err);
            console.log('files saved');
        });
    };

    newFile = e => {
        e.preventDefault();
        const {newEntryName, directory, filesData} = this.state;

        const fileDate = dateFns.format(new Date(), 'MM-DD-YYYY');
        const filePath = `${directory}/${newEntryName}_${fileDate}.md`;

        fs.writeFile(filePath, '', err => {
            if (err) return console.error('write fill err:', err);

            filesData.unshift({
                title: newEntryName,
                path: filePath,
                date: fileDate
            });

            this.setState({
                filesData,

                loadedFile: '',
                newEntry: false,
                newEntryName: ''
            }, () => this.loadAndReadFiles(directory));
        });
    };


    render() {
        const {activeIndex, newEntry, newEntryName, loadedFile, directory} = this.state;

        return (
            <AppWrapp>
                <Header>Notes</Header>
                {
                    directory ? (
                        <Split>
                            <FilesWindow>
                                <Button onClick={() => this.setState({newEntry: !newEntry})}>
                                    + New Entry
                                </Button>
                                {
                                    newEntry &&
                                    <form onSubmit={this.newFile}>
                                        <input 
                                            autoFocus 
                                            type="text"
                                            value={newEntryName}
                                            onChange={(e) => this.setState({newEntryName: e.target.value})}
                                        />
                                    </form>
                                }
                                {
                                    this.state.filesData.map((file, i) => (
                                        <FileButton
                                            active={activeIndex === i}
                                            onClick={this.changeFile(i)}
                                        >
                                            <p className="title">
                                                {file.title}
                                            </p>
                                            <p className="data">
                                                {formatDate(file.date)}
                                            </p>
                                        </FileButton>
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
                                    value={loadedFile}
                                />
                            </CodeWindow>

                            <RenderedWindow>
                                <Markdown>{loadedFile}</Markdown>
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
  margin-top: 0px; /*0 - bo inaczej robi bialy pasek na szczycie = crap ! */
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
  background-color: #003399;
  color: #fff;
  font-size: 1rem;
  
  text-align: center;
  position: top;
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

const FilesWindow = styled.div`/*SIDEBAR*/
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
  padding-top: 1rem;
  background: #2f3129;
`;

const RenderedWindow = styled.div`
  background: #2f3129;
  width: 35%;
  padding-top: 2rem;
  color: #fff;
  border-left: 1px solid #302b3a;
`;

const FileButton = styled.button`/*ADDET NOTES */
  padding: 10px;
  display: block;
  width: 100%;
  background: #03648b;
  opacity: 0.3;
  color: whitesmoke; /*PODKLAD DO OPISU NOTATEK*/
  border: none;
  border-bottom: solid 1px #302b3a;
  transition: 0.3s ease all;
  
  .title {
    font-weight: bold;
    font-size: 0.9rem;
    margin: 0 0 5px;
  }
  
  .data {
    font-size: 0.7rem;
    margin: 0 0 5px;
  };
  
  &:hover {
    opacity: 1;
    border-left: solid 4px #000
  } 
  
  ${({active}) => active && `
    opacity: 1;
    border-left: solid 4px #000
  `};
`;

const Button = styled.button`
  background: #003399;
  color: white;
  border:solid 1px #323232;
  border-radius: 4px;
  margin: 1rem auto;
  font-size: 1rem;
  transition: 0.3s ease all;
  padding: 5px 10px;
  &:hover {
    color: palegoldenrod  
  } 
`;
