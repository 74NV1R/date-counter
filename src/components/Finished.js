import React from 'react'
import { useQuestions } from '../contexts/QuestionContext'

export default function Finished() {
    const { points, maxPoints, highscore, dispatch } = useQuestions()
    return (
        <div>
            <p className='result'>
                your score:
                <b>{points} out of {maxPoints}!</b> <br></br>
                highscore: {highscore}
            </p>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'resetQuiz' })}>Reset Quiz</button>
        </div>
    )
}
