import React, { useState } from 'react';
import Square from './Square';
import { Grid, Container, Button } from '@material-ui/core';
import '../styles.css';
import { Link, Redirect } from 'react-router-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';

function Board() {
    const [board, setBoard] = useState(
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    );

    const [hasCombined, setHasCombined] = useState(
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    );

    const [score, setScore] = useState(0);

    const [redirect, setRedirect] = useState(false)

    let generate = false;

    const emptyMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    function getColor(number) {
        switch (number) {
            case 2:
                return "_2";
        
            case 4:
                return "_4";
                
            case 8:
                return "_8";
                
            case 16:
                return "_16";
            
            case 32:
                return "_32";
            
            case 64:
                return "_64";

            case 128:
                return "_128";

            case 256:
                return "_256";

            case 512:
                return "_512";

            case 1024:
                return "_1024";

            case 2048:
                return "_2048";
                
            default:
                return "large"
        }
    }

    function checkForMoves(row, col) {
        // Right
        if (col < 3 && board[row][col] === board[row][col + 1]) {
            return true;
        }

        // Left
        if (col > 0 && board[row][col] === board[row][col - 1]) {
            return true;
        }

        // Up
        if (row > 0 && board[row][col] === board[row - 1][col]) {
            return true;
        }

        // Down
        if (row < 3 && board[row][col] === board[row + 1][col]) {
            return true;
        }
    }

    function checkForGameOver() {
        let isFull = true;
        let isMove = false;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(board[i][j] === 0) {
                    isFull = false;
                }

                isMove = checkForMoves(i, j)
            }
        }

        if (isFull && !isMove) {
            setBoard(emptyMatrix);
            setRedirect(true)
        }
    }

    function randomPosition() {
        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);

        if(board[row][col] === 0) {
            return [row, col]
        }
        
        return randomPosition();
    }

    function startSquares() {
        setScore(0);
        let matrix = emptyMatrix;
        
        const pos1 = randomPosition();
        let pos2;

        do {
            pos2 = randomPosition();
        } while(pos1[0] === pos2[0] && pos1[1] === pos2[1])

        matrix[pos1[0]][pos1[1]] = 2;
        matrix[pos2[0]][pos2[1]] = 2;

        setBoard(matrix);  
    }

    function randomSquare() {
        let copy = [...board];
        const newSquare = randomPosition();

        copy[newSquare[0]][newSquare[1]] = 2;

        setBoard(copy);
    }

    function afterSlide() {
        if (generate) {
            setTimeout(() => {
                randomSquare();
            }, 100)
        }
        
        generate = false;
        checkForGameOver();
        setHasCombined(emptyMatrix);
    }
    
    function slideAllRight() {
        for (let i = 0; i < 4; i++) {
            for(let j = 2; j >= 0; j--) {
                if(board[i][j] > 0) {
                    slideRight(i, j)
                }
            }
        } 
      
        afterSlide();
    }

    function slideRight(row, col) {
        let boardCopy = [...board]
        let combinedCopy = [...hasCombined]
        
        for(let i = col + 1; i < 4; i++) {
            if(boardCopy[row][i] === 0) {
                boardCopy[row][i] = board[row][i - 1];
                boardCopy[row][i - 1] = 0;
                generate = true;
            }
            else if(boardCopy[row][i] === boardCopy[row][i - 1] && !combinedCopy[row][i - 1]) {
                boardCopy[row][i] = boardCopy[row][i] * 2;
                setScore(score + boardCopy[row][i])
                boardCopy[row][i - 1] = 0;
                combinedCopy[row][i] = true;
                generate = true;
            }
        }
        
        setBoard(boardCopy);
        setHasCombined(combinedCopy);
    }

    function slideAllLeft() {
        for(let i = 0; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                if(board[i][j] > 0) {
                    slideLeft(i, j);
                }
            }
        } 
        
        afterSlide();
    }

    function slideLeft(row, col) {
        let boardCopy = [...board]
        let combinedCopy = [...hasCombined]

        for(let i = col; i >= 0; i--) {
            if(boardCopy[row][i - 1] === 0) {
                boardCopy[row][i - 1] = board[row][i];
                boardCopy[row][i] = 0;
                generate = true;
            }
            else if(boardCopy[row][i - 1] === boardCopy[row][i] && !combinedCopy[row][i]) {
                boardCopy[row][i - 1] = boardCopy[row][i] * 2;
                setScore(score + boardCopy[row][i - 1])
                boardCopy[row][i] = 0;
                combinedCopy[row][i - 1] = true;
                generate = true;
            }
        }
        
        setBoard(boardCopy);
        setHasCombined(combinedCopy);
    }

    function slideAllUp() {
        for(let i = 0; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                if(board[j][i] > 0) {
                    slideUp(j, i);
                }
            }
        } 

        afterSlide();
    }

    function slideUp(row, col) {
        let boardCopy = [...board]
        let combinedCopy = [...hasCombined]

        for(let i = row; i > 0; i--) {
            if(boardCopy[i - 1][col] === 0) {
                boardCopy[i - 1][col] = board[i][col];
                boardCopy[i][col] = 0;
                generate = true;
            }
            else if(boardCopy[i][col] === boardCopy[i - 1][col] && !combinedCopy[i][col]) {
                boardCopy[i - 1][col] = boardCopy[i][col] * 2;
                setScore(score + boardCopy[i - 1][col])
                boardCopy[i][col] = 0;
                combinedCopy[i - 1][col] = true;
                generate = true;
            }
        }
        
        setBoard(boardCopy);
        setHasCombined(combinedCopy);
    }

    function slideAllDown() {
        for(let i = 0; i < 4; i++) {
            for(let j = 2; j >= 0; j--) {
                if(board[j][i] > 0) {
                    slideDown(j, i);
                }
            }
        } 

        afterSlide();
    }

    function slideDown(row, col) {
        let boardCopy = [...board]
        let combinedCopy = [...hasCombined]

        for(let i = row + 1; i < 4; i++) {
            if(boardCopy[i][col] === 0) {
                boardCopy[i][col] = board[i - 1][col];
                boardCopy[i - 1][col] = 0;
                generate = true;
            }
            else if(boardCopy[i][col] === boardCopy[i - 1][col] && !combinedCopy[i - 1][col]) {
                boardCopy[i][col] = boardCopy[i][col] * 2;
                setScore(score + boardCopy[i][col])
                boardCopy[i - 1][col] = 0;
                combinedCopy[i][col] = true;
                generate = true;
            }
        }
        
        setBoard(boardCopy);
        setHasCombined(combinedCopy);
    }
 
    return (
        <Container maxWidth="xs" className="board-screen">
            <KeyboardEventHandler
                handleKeys={['right']}
                onKeyEvent={() => slideAllRight()}
                handleFocusableElements={true}/>
            <KeyboardEventHandler
                handleKeys={['left']}
                onKeyEvent={() => slideAllLeft()}
                handleFocusableElements={true} />
            <KeyboardEventHandler
                handleKeys={['up']}
                onKeyEvent={() => slideAllUp()}
                handleFocusableElements={true} />
            <KeyboardEventHandler
                handleKeys={['down']}
                onKeyEvent={() => slideAllDown()}
                handleFocusableElements={true} />
                
            <Grid 
                container
                justify="center"
                alignItems="flex-end"
                spacing={2}
            >
                <Grid item>
                    <Button className="play-button" variant="outlined" color="primary" onClick={() => startSquares()}>Play</Button>
                </Grid>
                
                <Grid item>
                    <Link to="/leaderboard">
                        <Button className="play-button" variant="outlined" color="primary" onClick={() => startSquares()}>Leaderboard</Button>
                    </Link>
                </Grid>                
            </Grid>
            
            
            <h1 className="score">{score}</h1>
            <div className="board">
                <Grid 
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    
                >
                    {board.map(row => 
                        row.map(value => 
                            <Grid container item xs={3} spacing={0} >
                                <Square key={Math.floor(Math.random() * value)} value={value} class={`square ${getColor(value)}`} />
                            </Grid>
                        )
                    )}
                </Grid>
            </div>
            
            {redirect ? <Redirect to={{ pathname: "/submit-score", state: { score: score }}} /> : null}
        </Container>
    )
    
    
}

export default Board