import { useState } from 'react';
import './App.css';

const questionsData = require('./questions.json');


function App(props) {
  // used to track questions and pull data tied to question
  const [gameStatus, setGameQuestion] = useState(0);

  // used to compare inputs
  let [userInput, setAnswer] = useState("");

  // destructure the array to use individual values for comparision
  const [answerStatus, setAnswerStatus] = useState("");
  const { correct_answers } = questionsData[gameStatus];

  // used to generate inputs for cash and accrual inputs based on amount of answers
  const cashInputs = [];
  for (let i = 1; i <= correct_answers[0].entries.length; i++) {
    cashInputs.push(
      <div className='inputBox'>
        <input
          onChange={handleChange}
          type="text"
          placeholder="mm/dd"
          name={`sectOneInput${i}`}
          value={userInput.answerSectOne} />
        <input
          onChange={handleChange}
          type="text"
          placeholder="type"
          name={`sectTwoInput${i}`}
          value={userInput.answerSectTwo} />
        <input
          onChange={handleChange}
          type="number"
          placeholder="cr"
          name={`sectThreeInput${i}`}
          value={userInput.answerSectThree} />
        <input
          onChange={handleChange}
          type="number"
          placeholder="dr"
          name={`sectFourInput${i}`}
          value={userInput.answerSectFour} />
      </div>
    )
  }

  // used to generate inputs for cash and accrual inputs based on amount of answers
  const accrualInputs = [];
  for (let i = 1; i <= correct_answers[1].entries.length; i++) {
    accrualInputs.push(
      <div className='inputBox'>
        <input
          onChange={handleChange}
          type="text"
          placeholder="mm/dd"
          name={`sectFiveInput${i}`}
          value={userInput.answerSectOne} />
        <input
          onChange={handleChange}
          type="text"
          placeholder="type"
          name={`sectSixInput${i}`}
          value={userInput.answerSectTwo} />
        <input
          onChange={handleChange}
          type="number"
          placeholder="cr"
          name={`sectSevenInput${i}`}
          value={userInput.answerSectThree} />
        <input
          onChange={handleChange}
          type="number"
          placeholder="dr"
          name={`sectEightInput${i}`}
          value={userInput.answerSectFour} />
      </div>
    )
  }

  function GameControl() {
    return (
      <div>
        <button className="levelButton" onClick={levelGameDown}>Previous Question</button>
        <button className="levelButton" onClick={levelGameUp}>Next Question</button>
      </div>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setAnswer({
      ...userInput,
      [name]: value
    })
  }

  function handleClick() {
    const {
      sectOneInput1, sectTwoInput1, sectFourInput1 = undefined,
      sectOneInput2, sectTwoInput2, sectThreeInput2 = undefined,
      sectOneInput3, sectTwoInput3, sectFourInput3 = undefined,
      sectOneInput4, sectTwoInput4, sectThreeInput4 = undefined,
      sectFiveInput1, sectSixInput1, sectEightInput1 = undefined,
      sectFiveInput2, sectSixInput2, sectSevenInput2 = undefined,
      sectFiveInput3, sectSixInput3, sectEightInput3 = undefined,
      sectFiveInput4, sectSixInput4, sectSevenInput4 = undefined,
    } = userInput;

    var isRight = false;

    let { when, type, Dr } = correct_answers[0].entries[0];
    if (when === sectOneInput1 && type === sectTwoInput1 && sectFourInput1 == Dr) {

      let { when, type, Cr } = correct_answers[0].entries[1];
      if (when === sectOneInput2 && type === sectTwoInput2 && sectThreeInput2 == Cr) {

        if (typeof sectOneInput3 !== "undefined") {
          let { when, type, Dr } = correct_answers[0].entries[2];

          if (when === sectOneInput3 && type === sectTwoInput3 && sectFourInput3 == Dr) {
            let { when, type, Cr } = correct_answers[0].entries[3];

            if (when === sectOneInput4 && type === sectTwoInput4 && sectThreeInput4 == Cr) {

              isRight = true;
            }
          }
        } else {
          isRight = true;
        }
      }
    }

    var isRight2 = false
    let { when: when2, type: type2, Dr: Dr2 } = correct_answers[1].entries[0];
    if (when2 === sectFiveInput1 && type2 === sectSixInput1 && sectEightInput1 == Dr2) {

      let { when: when2, type: type2, Cr: Cr2 } = correct_answers[1].entries[1];
      if (when2 === sectFiveInput2 && type2 === sectSixInput2 && sectSevenInput2 == Cr2) {

        if (typeof sectFiveInput3 !== "undefined") {
          let { when: when2, type: type2, Dr: Dr2 } = correct_answers[1].entries[2];

          if (when2 === sectFiveInput3 && type2 === sectSixInput3 && sectEightInput3 == Dr2) {
            let { when: when2, type: type2, Cr: Cr2 } = correct_answers[1].entries[3];

            if (when2 === sectFiveInput4 && type2 === sectSixInput4 && sectSevenInput4 == Cr2) {

              isRight2 = true;
            }
          }
        } else {
          isRight2 = true;
        }
      }
    }
    if (isRight === true && isRight2 === true) {
      setAnswerStatus("Correct");
    } else {
      setAnswerStatus("Incorrect");
    }
  }


  function levelGameDown() {
    if (gameStatus > 0) {
      setGameQuestion(gameStatus - 1)
      setAnswerStatus("")
    } else {
      setGameQuestion(0);
      setAnswerStatus("")
    }
  }

  function levelGameUp() {
    if (gameStatus < questionsData.length - 1) {
      setGameQuestion(gameStatus + 1);
      setAnswerStatus("")
    } else {
      setGameQuestion(questionsData.length - 1)
      setAnswerStatus("")
    };
  }

  return (
    <div className="App">
      <h2>{questionsData[gameStatus].title}</h2>
      <div>
        <p>{questionsData[gameStatus].description}</p>
      </div>
      <div>
        <div className="container">
          <label>Your Answer:</label>
          <p>Cash</p>
          {cashInputs}
          <p>Accrual</p>
          {accrualInputs}
          <div className="container">
            <button className="buttonClass" type="submit" id="submit" onClick={handleClick}>Submit Answer</button>
          </div>
        </div>
        <p>{answerStatus}</p>
      </div>
      <GameControl />
    </div>
  );
};


export default App;