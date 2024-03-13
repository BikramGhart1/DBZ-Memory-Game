# Dragon Ballz Memory Game

This project is about testing your memory and mainly I made this project after learning about 
basic reacts, props and state and useEffect hook. And I am implementing them to make this project succesful

#components
I have made three components in /src/components, 
1. HeaderComp.jsx
2. ImageSection.jsx
3. OverallWrapper.jsx

# In ImageSection component
First of all, We use useState hook to define the initial state of objects fetched form API, 

    const [characters, setCharacters] = useState([]);
In This snippet of code, useState has a variable (characters) that will hold state of objects from API and a function (setCharacters)  to update the state of 'characters'. 
so our initial characters variable is an empty array, which we need to update later.
        
After that we fetch the 'dragon ballz' API in ImageSection component and make objects out of the datas,
Main mechanism of this game is when a card is clicked more than two times the game should be over, for that purpose 
new attribute 'clicked' must be added to the each objects fetched from API,

                const response = await fetch('https://dragonball-api.com/api/characters');
           const data = await response.json();
                const dataItems = data.items;
                 const charactersWithClicked = dataItems.map((item) => ({
                    ...item,
                    clicked: 0
                }))
                                setCharacters(charactersWithClicked);

In above snippet of code 'response' variable gets the API and 'data' variable gets the fetched datas in form JSON.
'dataItems' variable is getting specifically 'items' from 'data', 
As said above we are gonna need a new attribute 'clicked' right so we make new variable which maps through the 
'data.items' and adds new attribute make a new array.
finally we can update characters variable using setCharacters function from useState.

//Note: while fetching an API we must use useEffect hook to handle side effects and avoid unexpected behaviours.

This ImageSection component will return a div which contains images from fetched API and names of corresponding characters
This section will be in JSX 

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
we map through characters array and pass an unique key 'index' to avoid conflict to each divs. 
Each divs will contain an image and name and also a function that handles click event(which we will dive into later)

#In HeaderComp component
Similarly, In header component we return JSX to render
```
function HeaderComp({ passTrialScore, passHighScore })
```
In this code, HeaderComp is gettinf passTrialScore and passHighScore as props from parent component
which we will be using in JSX
```
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
```
Now lets have a look at this piece of code, it is returning a main div where first div has two header tags and second tag has 
two paragraph tags which are displaying scores passed from parent component.

#In OverallWrapper component
When I was talking about Parent component, I was referring to this component.
```
import ImageSection from './ImageSection'
import HeaderComp from './HeaderComp'
```
We import two child components to use,

Lets look parents child components as tree structure to be more clear
> In tree structure I have parent component (OverallWrapper.jsx) as root and
> child components (HeaderComp.jsx and ImageSection.jsx) as branches

# Passing datas between components
Now after establishing relationship between them we can pass datas from parents to child with the help of props
and from child to parent component with the help of a callback function 

# Rendering the components
the component responsible for rendering is main.jsx, so root or main component is main.jsx whose child is App.jsx whose child is
OverallWrapper.jsx whose childs are HeaderComp and ImageSection. 
Lets see whats going on behind scene i.e. OverallWrapper component
```
    const [trialScore, setTrialScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const getTrialScore = (trialScoreFromChild) => {
        setTrialScore(trialScoreFromChild);
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
```
get score from ImageSection and pass it to HeaderComp to display.
> To get score from ImageSection we are using a callback function getTrialScore which is defined in parent component and passed as a prop to child component
> after being called in child component, callback function will hold data from child component and is defined in
  parent component then we can do whatever we want to that data I'm using this fetTrialScore function to increment score by one and
pass it to OverallWrapper component and update accordingly and pass it to another comp.

#Further more logics
This game is run by three functions, after cards are rendered user will click the card and 'clicked' values is 0 for all
cards at beginnig, when a card is clicked value must be incremented. So I have a 'cardClickHandler' function.
that gets id from clicked card and checks with all the cards having same id, and inrements clicked property of respective 
card.

After that I have another function that checks clicked attribute after each click and if click is equal to 2 game must be
over and score is set to 0.

last function is shuffle function which will randomly set new indexes and rerender them again.

#Conclusion
From This Project I learnt how to pass the data between different components and how to use useState hook
and useEffect hook, How to fetch API and handle errors, how to render different components, how to structure 
components into parent child or tree structure.
