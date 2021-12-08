import React, { useState } from 'react'
import Tile from "./Tile";
import Cell from './Cell';
import GameOverlay from "./GameOverlay";
import {Board} from "../helper/index";
import useEvent from '../hooks/useEvent';
const BoardView = () => {
    const [board, setBoard] = useState(new Board())
    const handleKeyDown = (event)=>{
        if (board.hasWon()) {
            return;
        }
        if (event.keyCode >= 37 && event.keyCode<=40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }
    useEvent("keydown", handleKeyDown);
    const resetGame = ()=>{
        setBoard(new Board());
    }
    const cells = board.cells.map((row, rowIndex)=>{
        return(
            <div key={rowIndex}>
                {
                    row.map((col, colIndex)=>(
                        <Cell key={colIndex}/>
                    ))
                }
            </div>
        )
    })
    const tiles = board.tiles.filter(titl=>titl.value !== 0).map((titl, index)=>{
                        return <Tile key={index} tile={titl}/>
    })
    return (
        <>
        <div className="details-box">
            <div className="resetButton" onClick={()=>resetGame()}>New game</div>
            <div className="score-box">
                <div className="score-header">
                    SCORE
                </div>
                <div>
                    {board.score}
                </div>
            </div>
        </div>
        <div className="board">
            {cells}
            {tiles}
            <GameOverlay board={board} onRestart={resetGame}/>
        </div>
        </>
        
    )
}

export default BoardView
