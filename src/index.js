import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }




    renderSquare(i) {
        return (
        <Square
            value= {this.props.squares[i]}
            onClick = {() => this.props.onClick[i]}
        />);
    }

    render() {
        const history = this.state.history;
        const current = history[history.length-1];
        const winner = calculateWinner(current.squares);

        let status;
        if(winner) {
            status = (winner === 'Cat') ? 'Cat Game!' : winner + ' Wins! Sweet!';
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className={"game"}>

                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />

                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
                <ol>/*TODO*/</ol>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(){
        super(props);
        this.state = {
            history: [
                {
                    squares: Array (9).fill(null),
                }
            ],
            xIsNext: true
        };
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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
    if (squares.every(function (val) {
            return val;
        }
        )){
        return 'Cat';
    }
    return null;
}