import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/monokai';

const Editor = ({input, saveFile}) => (
    <CodeWindow>
        <AceEditor
            mode="markdown"
            theme="monokai"
            onChange={input => saveFile(input)}
            name="mardown_editor"
            value={input}
        />
    </CodeWindow>
);

Editor.propTypes = {
    input: PropTypes.string.isRequired,
    saveFile: PropTypes.func.isRequired
};

export default Editor;

const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background: #2f3129;
`;
