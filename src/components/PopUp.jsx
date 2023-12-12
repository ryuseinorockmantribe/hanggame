import React, { useEffect } from 'react';


const Popup = ({restart,finalMessage}) => {


  return (
    <div>
        <button onClick={(e) => {
          e.preventDefault();
          restart()
        }}>Play Again</button>
      <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
          <div className="popup">
            <h2></h2>
            {finalMessage &&  
            <p>{finalMessage}
                <button onClick={(e) => {
                  e.preventDefault();
                  restart()
                }}>Play Again
              </button>
            </p>}
          </div>
    </div>
    </div>
  )
}

export default Popup