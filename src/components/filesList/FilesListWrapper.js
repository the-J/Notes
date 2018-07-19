import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FilesList} from './FilesList';

import {loadFiles} from '../../actions/loadFiles';

class FilesListWrapper extends Component {
    constructor(props) {
        super(props);
        this.props.loadFilesAction();

        this.state = {
            index: 0
        };
    }

    changeSelectedFile(e) {
        console.log(e);
    }

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
    loadFilesAction: () => dispatch(loadFiles())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesListWrapper);