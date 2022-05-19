import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';

import { mapExpressionToEmoji } from '../../helpers/emojis';

import './Results.css';
import styled from "styled-components";
const Button = styled.button`
  width: 150px;
  border: none;
  padding: 15px 20px;
  background-color: darkblue;
  color: white;
  font-size: 20px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
`;
const Results = ({ results, processing }) => {
  /*
   <p>You seem to be {Math.round(results[0].age)} years old</p>
              <p>I think you are a {results[0].gender}</p>
  */


  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    const url=`https://www.youtube.com/results?search_query=${results[0].expressions.asSortedArray()[0].expression}+music`
   //window.open(url, '_blank');
  //  openInNewTab();
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <p>I think...</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: '300px' }}>
                  <p>
                    One of you is probably {result.gender}, is looking {result.expressions.asSortedArray()[0].expression} and looks around{' '}
                    {Math.round(result.age)}
                  </p>
                </div>
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.expressions.asSortedArray()[0].expression)} size="4x" />
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.gender)} size="4x" />
                <button onClick={(e)=>{window.open(url, '_blank')}}>open</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>I think...</p>
              <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>

            </div>
            <div className="results__emoji">
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].expressions.asSortedArray()[0].expression)} size="4x" />
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} size="4x" />

            </div>
              <Button onClick={()=>window.open(url, '_blank')}>Recommend me Songs </Button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;
