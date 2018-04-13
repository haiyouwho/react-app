import React, { Component } from 'react';


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


class Head extends React.Component{
    render(){
        return (
        <div className="head">
            <Gamebox/>
        </div>
        ) 
    }
}

class Gamebox extends React.Component{
    constructor(){
        super();
        this.state = {
            history:[{
                squares:Array(9).fill(null)
            }],
            stepNum:0,
            isXNext:true
        }
    }
    gameOn(i){
        const history = this.state.history;
        const currentSquare = history[history.length -1];
        const squares = currentSquare.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]){return }

        squares[i] = this.state.isXNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{ squares: squares }]),
            isXNext: !this.state.isXNext,
            stepNum: history.length
        })
    }
    jumpTo(step) {
        this.setState({
            xIsNext: (step % 2) ? false : true,
            stepNum: step,
        });
    }
    reStart() {
        this.setState({
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNum: 0,
            isXNext: true
        });
    }
    render(){
        const history = this.state.history;
        const currentSquare = history[this.state.stepNum];
        const squares = currentSquare.squares;
        const winner = calculateWinner(squares);
        
        
        const renderSquares = squares.map((val,idx)=>{
            return (
                <Square value={val} onClick={() => this.gameOn(idx)} key={idx} />
            )
        })
        const moves = history.map((step, move) => {
            const desc = move ? 'Move # ' + move : 'Game Start';
            return (
                <li key={move} ><a href="#" onClick={() => this.jumpTo(move)}>{desc}</a></li>
            )
        })

        let status = 'next is:';
        if (winner){
            status = 'got a  winner!! --- '
            status += !this.state.isXNext ? 'X' : 'O';
        }else{
            status += this.state.isXNext ? 'X' : 'O';
        }


        const style = { 'position': 'fixed', top: 0, right: '50px', width: '200px',}
        const hstyle = { 'lineHeight': '15px' }
        return (
            <div className="Gamebox" style={style}>
                <div>
                    {renderSquares[0]}
                    {renderSquares[1]}
                    {renderSquares[2]}
                </div>
                <div>
                    {renderSquares[3]}
                    {renderSquares[4]}
                    {renderSquares[5]}
                </div>
                <div>
                    {renderSquares[6]}
                    {renderSquares[7]}
                    {renderSquares[8]}
                </div>
                <p>{status}</p>
                <p ><a href="#" onClick={() => this.reStart()}>reStart</a></p>
                <div style={hstyle}>moves:{moves}</div>
            </div>
        ) 
    }
}


function Square(props){
    const style = { width: '26px', verticalAlign: 'top',height:'26px',margin:'2px',}
    return (
        <button style={style} className="square" onClick={props.onClick}>{props.value}
        </button>
    )
}


export default Head;
