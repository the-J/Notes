import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import MarkdownWindow from './MarkdownWindow';
import Editor from './Editor';

class EditorWrapper extends Component {
    constructor(props) {
        super(props);

        const content = '';

        this.state = {
            content
        };
    }

    loadFile = () => {

    };

    updateFile = content => {
        if (content !== '' && !content) return;

        console.log('props.state', this.props);
        this.setState({content});
    };


    render() {
        const {content} = this.state;

        return (
            <Fragment>
                <Editor content={content} updateFile={this.updateFile.bind(this)} />
                <MarkdownWindow content={content} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorWrapper);