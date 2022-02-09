import React from "react";
import '../../App.css';

function Square({ val, chooseSquare }){
    let classNameValue = 'squareBox';
    if(val == "X" || val == "O"){
        classNameValue += " disabledSquareBox";
    }
    return <div className={classNameValue} onClick={chooseSquare}>{val}</div>
}

export default Square;