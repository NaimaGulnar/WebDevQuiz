/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react"
import "./App.css"
import questions from "./questions"
import ResultPage from "./components/ResultPage"

export default function App(){

    const [currentQues, setCurrentQues] = useState(0);

    const [input, setInput] = useState("");

    const [answers, setAnswers] = useState([]);

    const [count, setCount] = useState(20);

    useEffect(()=>{
        let timer;
        if(count>0){
       timer = setTimeout(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);
    }
    else if(count==0){
        setCurrentQues(currentQues+1);
        setCount(20);
    }
        return () =>{
            clearTimeout(timer);
        }
    }, [count, currentQues])


    function handleSubmit(e){
        e.preventDefault();
       if(input.trim() !== ""){
            setAnswers([...answers, input]);
       }
        setInput("");
        setCurrentQues(currentQues+1);
        setCount(20);
    }

    function handleChange(e){
        setInput(e.target.value);
    }

    function calculateScore(){
        let score = 0;
        for(let i=0; i<questions.length; i++){
            if(answers[i].toLowerCase() === questions[i].answer.toLowerCase()){
                score++;
            }
        }
        return score;
    }

    return (
        <>
            {currentQues < questions.length ? 
            (
                <>
                <h1 className="heading">Decode Web Dev: <br/>Can You Guess These 10 Full Forms?</h1>
                <div className="container">
                 <p className="timer">Time Left: {count}</p>
                <form className="form" onSubmit={handleSubmit}>
                    <p className="ques">{questions[currentQues].question}</p>
                    <input className="input" type="text" onChange={handleChange} value={input}
                    placeholder="Enter your answer"/>
                    <button className="btn" type="submit">NEXT</button>
                </form>
                </div>
                </>
            )
            :
            (<ResultPage score={calculateScore()} totalQuestions={questions.length}/>)
        } 
        </>
    )
}