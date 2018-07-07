import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import styled from 'styled-components';

const fs = window.require('fs');

export default class NewFile extends Component {
    state = {
        showCreateFile: false,
        newFileName: ''
    };

    newFile = e => {
        e.preventDefault();
        const {newFileName} = this.state;
        const {directory, reloadFiles} = this.props;

        const fileDate = dateFns.format(new Date(), 'MM-DD-YYYY');
        const filePath = `${directory}/${newFileName}_${fileDate}.md`;

        fs.writeFile(filePath, '', err => {
            if (err) return console.error('write fill err:', err);

            this.setState({
                showCreateFile: false,
                newFileName: ''
            }, reloadFiles(directory));
        });
    };

    render() {
        const {showCreateFile, newFileName} = this.state;

        return (
            <Fragment>
                <Button
                    onClick={() => {
                        this.setState({
                            showCreateFile: !showCreateFile,
                            newFileName: ''
                        });
                    }}
                >
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

NewFile.propTypes = {
    directory: PropTypes.string.isRequired,
    reloadFiles: PropTypes.func.isRequired
};

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
