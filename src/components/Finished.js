import React from 'react'

export default function Finished({ points, maxPoints, highscore, dispatch }) {
    return (
        <div>
            <p className='result'>
                your score:
                <b>{points} out of {maxPoints}!</b> <br></br>
                highscore: {highscore}
            </p>
            <button className='btn btn-ui' onClick={() => dispatch({ type: "resetQuiz" })}>Reset Quiz</button>
        </div>
    )
}
