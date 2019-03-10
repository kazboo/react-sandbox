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
        <button
            className="square"
            onClick="{ props.onClick }">
            { props.value }
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        // we suggested that you use the .slice() operator to create a copy of the squares array to modify instead of modifying the existing array
        //
        // There are generally two approaches to changing data. 
        // * The first approach is to mutate the data by directly changing the data’s values.
        // * The second approach is to replace the data with a new copy which has the desired changes.
        //
        // The end result is the same but by not mutating (or changing the underlying data) directly, we gain several benefits described below.
        // 1. Complex Features Become Simple(複雑な機能の実装がはるかに簡単になる)
        // 2. Detecting Changes
        // 3. Determining When to Re-Render in React
        //
        // When we modified the Square to be a function component, we also changed onClick={() => this.props.onClick()} to a shorter onClick={props.onClick} (note the lack of parentheses on both sides).
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({ squares: squares });
    }

    renderSquare(i) {
        return (
            <Square
                value={ this.state.squares[i] }
                // Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.
                // Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked. 
                onClick={ () => this.handleClick(i) }
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">
                    { status }
                </div>
                <div className="board-row">
                    { this.renderSquare(0) }
                    { this.renderSquare(1) }
                    { this.renderSquare(2) }
                </div>
                <div className="board-row">
                    { this.renderSquare(3) }
                    { this.renderSquare(4) }
                    { this.renderSquare(5) }
                </div>
                <div className="board-row">
                    { this.renderSquare(6) }
                    { this.renderSquare(7) }
                    { this.renderSquare(8) }
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