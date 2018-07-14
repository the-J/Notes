import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FilesList} from './FilesList';

export class FilesListWrapper extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <FilesList />;
    }
}