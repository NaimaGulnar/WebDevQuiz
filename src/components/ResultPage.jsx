/* eslint-disable react/prop-types */

import { useState } from "react";
import questions from "../questions"

export default function ResultPage(props) {

  const [showAns, setShowAns] = useState(false);

  const [btnName, setBtnName] = useState("Show Answer")

    function handleClick(){
        
        if(btnName === "Show Answer"){
            setBtnName("Hide Answer");
            setShowAns(true);
        }
        if(btnName === "Hide Answer"){setBtnName("Show Answer");
        setShowAns(false);
    }
    }

    return (
        <div className="result-container">
            <p className="result">
                You answered {props.score} correct answers and {questions.length - props.score} wrong answers.
            </p>
            <button onClick={handleClick} className="btn">{btnName}</button>
            {showAns && (
                <ul className="list-ans">{questions.map((ques, index) => (<li key={index}>
                {ques.id}. {ques.answer}</li>))}</ul>
            )}
        </div>
    );
}
