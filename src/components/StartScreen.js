import React from 'react'
import { useQuestions } from '../contexts/QuestionContext'

export default function StartScreen() {
    const { start, numQuestions, dispatch } = useQuestions()
    return (
        <div>
            <h2>React quiz
            </h2>
            <h3>
                {numQuestions} Questions left
            </h3>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'start' })}>
                Start
            </button>
        </div>
    )
}
