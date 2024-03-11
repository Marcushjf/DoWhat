import { Fragment } from "react/jsx-runtime"

interface GameProps {
    players : string[]
}

function PlayerCard(player:string) {
    return(
        <Fragment>
            <p>{player}</p>
        </Fragment>
    )
}

function Game({players} : GameProps) {

    function renderCards() {
       return players.map((item, i)=>{
        return (
            <p key={i}>{`Player ${i+1}: ${item}`}</p>
        )
       })
    }

    return(
        <Fragment>
            <h3>GAEM</h3>
            <div>{renderCards()}</div>
        </Fragment>
        
    )
}

export default Game