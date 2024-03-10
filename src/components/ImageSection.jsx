import React, { useEffect, useState } from 'react'

export default function ImageSection({ getTrialScore }) {
    //I fetched the api and got dragon ball Z characters objects with various properties like image and name
    const [characters, setCharacters] = useState([]);

    //useEffect hook is required because fetchapi may take some time to fetch and cause unexpected behaviuors
    useEffect(() => {
        //function to fetch data which is async
        const fetchData = async () => {
            //error handling
            try {
                const response = await fetch('https://dragonball-api.com/api/characters');
                if (!response.ok) {
                    throw new Error(`HTTP Error ${response.status}`);
                }

                //since data is in form of json from api
                const data = await response.json();
                const dataItems = data.items;

                //I added this part to add new property to the characters objects
                //clicked property to keep track of how many times the card is clicked
                const charactersWithClicked = dataItems.map((item) => ({
                    ...item,
                    clicked: 0
                }))

                //finally updating the new object with clicked proprty using useState hook
                setCharacters(charactersWithClicked);

            }
            catch (error) {
                console.log('error: ', error);
            }

        }
        fetchData();

    }, [])

    //function to shuffle the cards
    const shuffleCards = () => {
        //we need to get a copy of characters objects
        const shuffeledCharacters = [...characters];

        //we generate random numbers and assign those random index creating mechanism of shuffling
        for (let i = shuffeledCharacters.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffeledCharacters[i], shuffeledCharacters[j]] = [shuffeledCharacters[j], shuffeledCharacters[i]];

        }
        return shuffeledCharacters;

    }

    //when a card is clicked this function iterates and increment the clicked property
    const cardClickedHandler = (id) => {

        //shuffle the cards
        const shuffeledCharacters = shuffleCards();

        //increment clicked property of shuffeled characters
        const updatedCharacters = shuffeledCharacters.map((item) => item.id === id ? {
            ...item,
            clicked: item.clicked + 1
        } : item

        )

        //set updated characters 
        setCharacters(updatedCharacters);

        //this is callback function that passes score to our parent component
        getTrialScore(trialScore => trialScore + 1);

        //check if card is double clicked
        cardClickedChecker(id);

    }

    //this function checks every click if a card is clicked twice or not
    const cardClickedChecker = (id) => {
        //it gets id of character and checks if it is clicked twice
        const gameOver = characters.some((item) => item.id === id && item.clicked === 1);

        //if game is over
        if (gameOver) {

            //alert the game over idk if i should remove this part
            alert('game Over');

            //reset the clicked back to 0
            setCharacters((prevCharacters) =>
                prevCharacters.map((item) => ({ ...item, clicked: 0 }))
            )

            //pass the score as 0 to parent
            getTrialScore(0);


        }

    };
    return (

        <div className='image-sec'>
            {characters.map((item, index) => (
                <div key={index} className='image-box' onClick={() => cardClickedHandler(item.id)}>
                    <img src={item.image} alt="#" />
                    <p>Name: {item.name}</p>
                </div>
            ))}
        </div>
    )
}
