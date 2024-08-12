import React from 'react'

export default function StartScreen({ numQuestions, dispatch }) {
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
