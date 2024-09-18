import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import { useQuestions } from '../contexts/QuestionContext'

export default function NextButton() {
    const { answer, index, dispatch, numQuestions } = useQuestions()
    if (answer === null) return null

    if (index < numQuestions - 1)
        return (
            <div>
                <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>Next question</button>
            </div>
        )

    if (index === numQuestions - 1)
        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'finished' })}> Finish quiz

            </button>

        )
}
