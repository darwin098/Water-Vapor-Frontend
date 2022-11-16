import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function KeyPrinting(props) {
  const copy = (value) => {
    navigator.clipboard.writeText(value);
    alert('Copied key!');
  };

  //   console.log(props.data);
  let results = props.data;
  console.log(results);
  return (
    <div id="printing-keys-data">
      {results.map((result) => (
        <div className="printing-key-row">
          <h5 className="printing-game_name">{result.game_name}</h5>
          <h5 className="printing-key">
            {result.key}
            {/* <i>I</i> */}
          </h5>

          <FontAwesomeIcon
            className="copy-icon"
            onClick={() => copy(result.key)}
            icon={faCopy}
          />
        </div>
      ))}
    </div>
  );
}

export default KeyPrinting;
