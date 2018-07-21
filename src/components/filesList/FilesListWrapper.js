import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {FilesList} from './FilesList';

import {loadFiles} from '../../actions/loadFiles';
import {readFile} from '../../actions/readFile';

class FilesListWrapper extends Component {
    constructor(props) {
        super(props);

        props.loadFilesAction();

        this.state = {
            index: 0
        };
    }

    changeSelectedFile = fileId => {
        const files = this.props.filesList;

        const selectedFile = _.find(files, file => file._id === fileId);
        this.props.readFileAction(selectedFile.path);

        const index = _.findIndex(files, file => file._id === fileId);
        this.setState({index});
    };

    render() {
        const {index} = this.state;

        return (
            <FilesList
                list={this.props.filesList}
                onChange={this.changeSelectedFile}
                index={index}
            />
        );
    }
}

const mapStateToProps = state => ({
    filesList: state.filesList
});

const mapDispatchToProps = dispatch => ({
    loadFilesAction: () => dispatch(loadFiles()),
    readFileAction: (path) => dispatch(readFile(path))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesListWrapper);