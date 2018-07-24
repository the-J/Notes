import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {FilesList} from './FilesList';

import updateFileMethod from '../../methods/updateFileMethod';

import {loadFiles} from '../../actions/loadFiles';
import {readFile} from '../../actions/readFile';

class FilesListWrapper extends Component {
    constructor(props) {
        super(props);

        this.props.loadFilesAction();

        this.state = {
            index: 0
        };
    }

    changeSelectedFile = fileId => {
        const files = this.props.filesList;
        const index = _.findIndex(files, file => file._id === fileId);

        if (this.state.index !== index) {
            const selectedFile = _.find(files, file => file._id === fileId);

            updateFileMethod(selectedFile.path, this.props.activeFile, err => {
                if (err) console.error('updateFile err:', err);
            });

            this.props.readFileAction(selectedFile.path);

            this.setState({index});
        }
    };

    render() {
        const {index} = this.state;
        const {filesList} = this.props;

        return (
            <FilesList
                list={filesList}
                onChange={this.changeSelectedFile}
                index={index}
            />
        );
    }
}

const mapStateToProps = state => ({
    filesList: state.filesList,
    activeFile: state.activeFile
});

const mapDispatchToProps = dispatch => ({
    loadFilesAction: () => dispatch(loadFiles()),
    readFileAction: (path) => dispatch(readFile(path))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesListWrapper);