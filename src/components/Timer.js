import React, { useEffect } from 'react'
import { useQuestions } from '../contexts/QuestionContext'

export default function Timer() {
    const { dispatch, timeRemaining } = useQuestions()

    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: 'pulse' })
        }, 1000)

        return () => clearInterval(id)
    }, [dispatch])
    return (
        <div className='timer'>
            {minutes < 10 && '0'}
            {minutes} : {seconds < 10 && "0"}
            {seconds}
        </div>
    )
}
