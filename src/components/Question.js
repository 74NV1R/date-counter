import React from 'react'
import Options from './Options'
import { useQuestions } from '../contexts/QuestionContext'

export default function Question() {
    const { questions, index } = useQuestions()
    const question = questions.at(index)

    return (
        <div><h4>{question.question}</h4>
            <Options question={question} />

        </div>
    )
}
