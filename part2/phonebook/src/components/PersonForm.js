import React from "react";

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name:{" "}
                <input value={props.nameValue} onChange={props.onNameChange} />
            </div>
            <div>
                number:{" "}
                <input
                    value={props.numberValue}
                    onChange={props.onNumberChange}
                />
            </div>
            <button type="submit">add</button>
        </form>
    );
};

export default PersonForm;
