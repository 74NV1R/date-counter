import React from 'react'

export default function Progress({ index, numQuestions, points, maxPoints, answer }) {
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
