import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return <div>No feedback given</div>;
    }

    const all = good + neutral + bad;
    const average = (good * 1 + bad * -1) / all;
    const positive = (100 * good) / all + " %";

    return (
        <table>
            <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="all" value={all} />
                <Statistic text="average" value={average} />
                <Statistic text="positive" value={positive} />
            </tbody>
        </table>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);

    return (
        <div>
            <Header title="give feedback" />
            <Button handleClick={handleGoodClick} text="good" />
            <Button handleClick={handleNeutralClick} text="neutral" />
            <Button handleClick={handleBadClick} text="bad" />
            <Header title="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
