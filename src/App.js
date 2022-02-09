import './App.css';
import {useState, useEffect} from 'react';
import {Square} from './Components';
import {Pattern} from './Services/winningPattern.js';


function App() {
  const [currentState, setCurrentState] = useState("X");
  const [board, setBoard] = useState(returnEmptyArrayOfLength(9)); //board is an array of "", and setBoard is the setter fuction for board variable.
  const [result, setResult] = useState({state: "none", winner: "none"});
  let gameOver = false;

  useEffect(()=>{
    playWin();
  }, [board])

  useEffect(()=>{
    if(result.state != "none"){
      console.log(result.winner + " Player won");
    }
  }, [result])

  const chooseSquare = (index, board) => {
    if(result.state == "won"){
      return;
    }
    board[index] = currentState;
    setBoard(board);
    toggleCurrentState();
  }
  
  const toggleCurrentState = () => {
    console.log(currentState);
    if(currentState == "X"){
      setCurrentState("O");
      return;
    } 
    setCurrentState("X");
  }

  const playWin = () => {
    console.log(board);
    Pattern.forEach((currentPattern) => {
      const player = board[currentPattern[0]];
      if(player == "") {
        return;
      }

      console.log(currentPattern, player);
      let foundWinningPattern = true;
      currentPattern.forEach((index) => {
        if(board[index] != player){
          foundWinningPattern = false;
        }
      })

      if(foundWinningPattern){
        gameOver = true;
        setResult({winner: player, state: "won"});
        console.log(player + " Player won");
        return;
      }
    });

    checkIfTie();
  }

  const checkIfTie = () => {
    console.log("checkifTie");
    let matchIsATie = true;
    board.forEach((val) => {
      if(val == ""){
        matchIsATie = false;
      }
    })

    console.log(result);
    if(matchIsATie && !gameOver){
      console.log("match ties");
      gameOver = true;
      setResult({winner: "No", state: "tie"});
    }
  }

  const restartGame = () => {
    setCurrentState("X");
    setBoard(returnEmptyArrayOfLength(9));
    setResult({state: "none", winner: "none"});
  }

  return (
    <div className="App">
      <h1 style={{display: "block"}}>Tic Tac Toe</h1>
      <div className='board'>
        {board.map((squareBox, index) => (<Square val={squareBox} chooseSquare={() => { chooseSquare(index, [...board]) }}></Square>))}
      </div>
      {result.state != "none" ? (<div><h3>{result.winner + " Player won"}</h3><button onClick={restartGame}>Play Again</button></div>): ""}
    </div>
  );
}

function returnEmptyArrayOfLength(n = 0){
  let array = [];
  for(let i = 0; i < n ; i++){
    array.push("");
  }
  return array;
}

export default App;
