import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import createFileMethod from '../../methods/createFileMethod';

import {loadFiles} from '../../actions/loadFiles';

const settings = window.require('electron-settings');

class NewFile extends Component {
    state = {
        newFileName: '',
        showCreateFile: false,
        directory: settings.get('directory') || null
    };

    newFile = e => {
        e.preventDefault();
        const {newFileName, directory} = this.state;

        // @todo would there be any message in here?
        if (!directory || !newFileName) return;

        createFileMethod(directory, newFileName, err => {
            if (err) console.error('createFileMethod err: ', err);

            this.setState({
                showCreateFile: false,
                newFileName: ''
            });

            this.props.loadFilesAction();
        });
    };

    render() {
        const {showCreateFile, newFileName} = this.state;

        return (
            <Fragment>
                <Button onClick={() => this.setState({showCreateFile: !showCreateFile})}>
                    + New Entry
                </Button>
                {
                    showCreateFile &&
                    <form onSubmit={this.newFile}>
                        <input
                            autoFocus
                            type="text"
                            value={newFileName}
                            onChange={(e) => this.setState({newFileName: e.target.value})}
                        />
                    </form>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    loadFilesAction: () => dispatch(loadFiles())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFile);

const Button = styled.button`
  background: transparent;
  color: white;
  border:solid 1px #323232;
  border-radius: 4px;
  margin: 1rem auto;
  font-size: 1rem;
  transition: 0.3s ease all;
  padding: 5px 10px;
  &:hover {
    background: #323232;
    color: #9f9f9f
  } 
`;
