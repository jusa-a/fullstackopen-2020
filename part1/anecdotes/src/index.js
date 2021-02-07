import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const App = (props) => {
    const [selected, setSelected] = useState({
        anecdote: 0,
        votes: new Uint8Array(anecdotes.length),
    });
    const mostVotes = selected.votes.indexOf(
        Math.max.apply(Math, selected.votes)
    );

    const nextAnecdote = () => {
        setSelected({
            ...selected,
            anecdote: Math.floor(Math.random() * anecdotes.length),
        });
    };

    const voteAnecdote = () => {
        const copy = [...selected.votes];
        copy[selected.anecdote] += 1;
        setSelected({
            ...selected,
            votes: copy,
        });
    };

    return (
        <div>
            <Header title="Anecdote of the day" />
            <div>{props.anecdotes[selected.anecdote]}</div>
            <div>has {selected.votes[selected.anecdote]} votes</div>
            <Button handleClick={voteAnecdote} text="vote" />
            <Button handleClick={nextAnecdote} text="next anecdote" />
            <Header title="Anecdote with most votes" />
            <div>{props.anecdotes[mostVotes]}</div>
        </div>
    );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
