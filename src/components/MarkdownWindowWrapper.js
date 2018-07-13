import React, {Component} from 'react';
import store from '../store';
import MarkdownWindow from './MarkdownWindow';

class MarkdownWindowWrapper extends Component {
    render() {
        const input = store.getState().editorInputReducer.result || '';

        return <MarkdownWindow input={input} />;
    }
}

export default MarkdownWindowWrapper;