import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import MarkdownWindow from './MarkdownWindow';
import Editor from './Editor';

import store from '../../store';
import {saveFileAction} from '../../actions/saveFileAction';

class FileEditorWrapper extends Component {
    constructor(props) {
        super(props);
        const loadedFile = store.getState().editorInputReducer.result || '';

        this.state = {
            loadedFile
        };
    }

    saveFile = loadedFile => {
        if (!loadedFile) return;

        console.log('saveFile fired');
        this.setState({loadedFile});
        this.props.saveFileAction(loadedFile);
    };


    render() {
        const {loadedFile} = this.state;

        return (
            <Fragment>
                <Editor input={loadedFile} saveFile={this.saveFile.bind(this)} />
                <MarkdownWindow input={loadedFile} />
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    saveFileAction: (loadedFile) => dispatch(saveFileAction(loadedFile))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileEditorWrapper);