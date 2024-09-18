import React from 'react'
import { useQuestions } from '../contexts/QuestionContext'

export default function Progress() {
    const { index, answer, points, maxPoints, numQuestions } = useQuestions()
    return (
        <div>
            <header className='progress'>
                <progress max={numQuestions} value={index + Number(answer !== null)} />
                <p>Question <b>{index + 1}</b> / {numQuestions}
                </p>

                <p><b>{points}</b> / {maxPoints} </p>
            </header>
        </div>
    )
}
