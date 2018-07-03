import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

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
    return <Markdown>{this.state.loadedFile}</Markdown>;
  }
}

export default App;
