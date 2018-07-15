import React, {Component} from 'react';
import {connect} from 'react-redux';

import store from '../../store';

import {FilesList} from './FilesList';

import {loadFilesAction} from '../../actions/loadFilesAction';
import loadFilesMethod from '../../methods/loadFilesMethod';

const settings = window.require('electron-settings');

class FilesListWrapper extends Component {
    constructor(props) {
        super(props);

        const directory = settings.get('directory') || undefined;
        const list = store.getState().loadFilesReducer.result || [];

        this.state = {
            directory,
            list,

            index: 0
        };
    }

    componentDidMount() {
        if (this.state.directory) this.loadFiles();
    }

    loadFiles() {
        if (this.state.directory) {
            loadFilesMethod(this.state.directory, filesData => {
                if (filesData) {
                    this.setState({list: filesData});
                    this.props.loadFilesAction(filesData);
                }
            });
        }
    }

    changeSelectedFile(e) {
        console.log(e);
    }

    render() {
        const {index, list} = this.state;

        return (
            <FilesList
                list={list}
                onChange={this.changeSelectedFile}
                index={index}
            />
        );
    }
}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    loadFilesAction: (filesList) => dispatch(loadFilesAction(filesList))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesListWrapper);