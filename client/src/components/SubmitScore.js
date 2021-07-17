import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core'
import '../styles.css';
import { useLocation } from "react-router-dom"
import { Redirect } from 'react-router-dom';
const axios = require('axios').default

function SubmitScore() {
    const location = useLocation()
    const score = location.state?.score

    const [inputText, setInputText] = useState('')
    const [redirect, setRedirect] = useState(false)

    function handleChange(event) {
        setInputText(event.target.value)
    }

    function handleSubmit(event) {
        axios.post('http://localhost:5000/api/scores', {
            username: inputText,
            score: score
        })
        .then(function(response) {
            console.log(response)
        })
        event.preventDefault()
        setRedirect(true)
    }

    return (
        <Container maxWidth="xs" className="form">
            <h1>{`Score: ${score}`}</h1>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <label>
                            Username:
                            <input type="text" value={inputText} onChange={handleChange} />
                        </label>
                    </Grid>
                    
                    <Grid item>
                        <input type="submit" value="Submit to Leaderboard" className="submit" />
                    </Grid>
                </Grid>
                
                
            </form>
            {redirect ? <Redirect to="/" /> : null}
        </Container>
    );
}

export default SubmitScore;