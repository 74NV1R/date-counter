import React from 'react'

export default function Finished({ points, maxPoints, highscore }) {
    return (
        <div>
            <p className='result'>
                your score:
                <b>{points} out of {maxPoints}!</b>
                highscore: {highscore}
            </p>
        </div>
    )
}
