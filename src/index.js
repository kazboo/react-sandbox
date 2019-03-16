import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * React wiki
 * https://ja.wikipedia.org/wiki/React
 * 
 * SPA(Single Page Application)
 * https://ja.wikipedia.org/wiki/シングルページアプリケーション
 * https://www.oro.com/ja/technology/001/
 * 
 * 公式チュートリアル
 * https://reactjs.org/tutorial/tutorial.html
 * 
 * React Component ライフサイクル
 * https://qiita.com/kawachi/items/092bfc281f88e3a6e456
 * 
 * Reactのstate, props, componentの使い方まとめ
 * https://qiita.com/sekikawa_a/items/8ab70f457ef73871419f
 * 
 */

// class Square extends React.Component {
//     // クラスにコンストラクタを追加(状態の初期化)
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null,
//         };
//     }

//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={ () => this.props.onClick() }
//             >
//                 { this.props.value }
//             </button>
//         );
//     }
// }

// Change the Square to be a `function component`
// In React, function components are a simpler way to write components that only contain a render method and don’t have their own state.
// Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered.
// Function components are less tedious to write than classes, and many components can be expressed this way.
function Square(props) {
    return (
        // onClickはダブルクォートで囲まないように注意(http://kimagureneet.hatenablog.com/entry/2016/11/15/153711)
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>
                        { /* status */ }
                    </div>
                    <ol>
                        { /* TODO */ }
                    </ol>
                </div>
            </div>
        );
    }
}



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
        if (squares[a] 
            && squares[a] === squares[b]
            && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}