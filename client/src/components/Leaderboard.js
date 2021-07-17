import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/scores')
    .then((response) => {
      const scores = response.data
      scores.sort((a, b) => {
        return b.score - a.score
      })

      const newRows = []
  
      for (let i = 0; i < 10; i++) {
        newRows.push({id: i + 1, player: scores[i].userName, score: scores[i].score})
      }

      setRows(newRows)
    })
  }, [])

  return (
    <div className="leaderboard">
        <h1 className="score">Leaderboard</h1>
        <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Player</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {rows.map((row) => {
                return(
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.player}</td>
                        <td>{row.score}</td>
                    </tr>
                )
            })}
        </tbody>
            
        </table>
    </div>
  );
}

export default Leaderboard