import React from 'react'

export default function HeaderComp({ passTrialScore, passHighScore }) {
    return (
        <div>
            <div>
                <h1>Dragon BallZ Memory Game</h1>
                <h3>don't click the same card twice</h3>

            </div>
            <div>
                <p>Score: {passTrialScore}</p>
                <p>Highscore: {passHighScore}</p>
            </div>
        </div>
    )
}
