import React from 'react';
import '../styles.css';

function Square(props) {
    if(props.value === 0) {
        return (
            <div className="empty-square"></div>
        );
    }
    else {
        return (
            <div className={props.class}>
                {props.value}
            </div>
        );
    }
}

export default Square;