import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dateFns from 'date-fns';

const formatDate = date => dateFns.format(new Date(date), 'MMMM Do YYYY');

export const FilesList = ({list, onChange, index}) => (
    list.map((file, i) => {
        return (
            <FileButton
                key={i}
                active={index === i}
                onClick={() => onChange(file._id)}
            >
                <p className="title">
                    {file.title}
                </p>
                <p className="data">
                    {formatDate(file.date)}
                </p>
            </FileButton>
        );
    })
);

FileList.propTypes = {
    list: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

const FileButton = styled.button`
  padding: 10px;
  display: block;
  width: 100%;
  background: #191324;
  opacity: 0.4;
  color: #FFF;
  border: none;
  border-bottom: solid 1px #302b3a;
  transition: 0.3s ease all;
  
  .title {
    font-weight: bold;
    font-size: 0.9rem;
    margin: 0 0 5px;
  }
  
  .data {
    font-size: 0.7rem;
    margin: 0 0 5px;
  };
  
  &:hover {
    opacity: 1;
    border-left: solid 4px #000
  } 
  
  ${({active}) => active && `
    opacity: 1;
    border-left: solid 4px #000
  `};
`;