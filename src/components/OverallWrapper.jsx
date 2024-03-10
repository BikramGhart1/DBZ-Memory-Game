import React, { useState } from 'react'
import ImageSection from './ImageSection'
import HeaderComp from './HeaderComp'

export default function OverallWrapper() {
    //state to keep track of score until game is over
    const [trialScore, setTrialScore] = useState(0);

    //state to keep track of highscore
    const [highscore, setHighscore] = useState(0);

    //callback function to get score from ImageSection component and pass it to HeaderComp component
    const getTrialScore = (trialScoreFromChild) => {

        //update the score when received from child component (ImageSection)
        setTrialScore(trialScoreFromChild);

        //check if new score is higher than current high score and update accordingly
        if (trialScore > highscore) {
            setHighscore(trialScore);
        }
    }
    return (
        <div>
            <HeaderComp passTrialScore={trialScore} passHighScore={highscore} />
            <ImageSection getTrialScore={getTrialScore} />
        </div>
    )
}
