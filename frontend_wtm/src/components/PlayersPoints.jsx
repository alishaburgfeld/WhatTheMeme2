function PlayerPoints({players}) {
    
    return (
        <>
        {players && players.map((user) => (
            <h4>{user[0]} pts: {user[1]}</h4>
        ))
        }
    </>
    )
}

export default PlayerPoints