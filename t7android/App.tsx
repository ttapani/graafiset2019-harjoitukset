import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import GameRow from './GameRow';

export const sideLength = 30;
const SIDE = 10;
const WINNING_LENGTH = 5;
type Player = 'PLAYER1' | 'PLAYER2' | '';

interface WinningSet {
    startPoint: number;
    endPoint: number;
}

interface Coordinate {
    x: number;
    y: number;
}

interface WinningSetCoords {
    startPoint: Coordinate;
    endPoint: Coordinate;
}

interface Winner {
    player: Player;
    set?: WinningSet;
}

interface WinConditions {
    player: Player;
    coordinates?: WinningSetCoords;
}

interface IProps {}


interface IState {
    boardRows: string[][];
    currentPlayer: Player;
    winner?: Player;
    winCoords?: WinningSetCoords;
}


export default class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { boardRows: [], currentPlayer: 'PLAYER1' };
        this.initBoard = this.initBoard.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.drawBoard = this.drawBoard.bind(this);
        this.buildTileMask = this.buildTileMask.bind(this);
        this.setMarker = this.setMarker.bind(this);
        this.checkForVictory = this.checkForVictory.bind(this);
        this.checkForMarks = this.checkForMarks.bind(this);
        this.printGameState = this.printGameState.bind(this);
        this.initBoard();
    }

    private initBoard() {
        for(let row = 0; row < SIDE; row++) {
            this.state.boardRows[row] = [];
            for(let col = 0; col < SIDE; col++) {
                this.state.boardRows[row][col] = '';
            }
        }
    }

    private resetBoard() {
        this.initBoard()
        this.setState({ currentPlayer: 'PLAYER1', winner: undefined, winCoords: undefined });
    }

    private drawBoard() {
        const { boardRows, winner } = this.state;
        return boardRows.map((row, index) => <GameRow tileMask={this.buildTileMask(index)} disabled={winner ? true : false} key={index} tiles={row} tileClicked={(value) => this.setMarker(index, value)}/>)
    }

    private buildTileMask(row: number): number[]{
        const { winCoords } = this.state;
        let mask: number[] = [];
        if(winCoords) {
            // Check if we are on a row
            if(winCoords.startPoint.y === winCoords.endPoint.y && winCoords.startPoint.y === row) {
                for(let maskIndex = winCoords.startPoint.x; maskIndex <= winCoords.endPoint.x; maskIndex++) {
                    mask.push(maskIndex);
                }
                console.log('row: ' + mask)
                return mask;
            }
            // Check if we are on a column
            if(winCoords.startPoint.x === winCoords.endPoint.x && winCoords.endPoint.y >= row && winCoords.startPoint.y <= row) {
                mask.push(winCoords.startPoint.x);
                console.log('column: ' + mask)
                return mask;
            }
            // Check if we are on a diagonal
            if(winCoords.startPoint.y !== winCoords.endPoint.y && winCoords.startPoint.x !== winCoords.endPoint.x) {
                console.log('going diagonal');
                if(row >= winCoords.startPoint.y && row <= winCoords.endPoint.y && winCoords.startPoint.x <= winCoords.endPoint.x) {
                    if(row === winCoords.startPoint.y) {
                        mask.push(winCoords.startPoint.x);
                        console.log('going right, start: ' + mask)
                        return mask;
                    } else if(row === winCoords.endPoint.y) {
                        mask.push(winCoords.endPoint.x);
                        console.log('going right, end: ' + mask)
                        return mask;
                    } else if(row >= winCoords.startPoint.y || row <= winCoords.endPoint.y){
                        let difference = row - winCoords.startPoint.y;
                        mask.push(winCoords.startPoint.x + difference);
                        console.log('going right, mid: ' + mask)
                        return mask;
                    }
                } else if(row >= winCoords.startPoint.y && row <= winCoords.endPoint.y && winCoords.startPoint.x >= winCoords.endPoint.x) {
                    if(row === winCoords.startPoint.y) {
                        mask.push(winCoords.startPoint.x);
                        console.log('going left, start: ' + mask)
                        return mask;
                    } else if(row === winCoords.endPoint.y) {
                        mask.push(winCoords.endPoint.x);
                        console.log('going left, end: ' + mask)
                        return mask;
                    } else {
                        let difference = winCoords.startPoint.y - row;
                        mask.push(winCoords.startPoint.x + difference);
                        console.log('going left, mid: ' + mask)
                        return mask;
                    }
                }
            }
        }
        return mask;
    }

    private setMarker(row: number, column: number) {
        let board = this.state.boardRows;
        if(this.state.currentPlayer === 'PLAYER1') {
            board[row][column] = 'X';
        }
        else {
            board[row][column] = 'O';
        }
        
        let result = this.checkForVictory()
        console.log(result.coordinates)
        this.setState({
            boardRows: board,
            currentPlayer: this.state.currentPlayer === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1',
            winner: result.player, winCoords: result.coordinates });
    }

    private checkForVictory(): WinConditions {
        const { boardRows } = this.state;
        // Check for rows
        for(let row = 0; row < SIDE; row++) {
            let result = this.checkForMarks(boardRows[row]);
            if(result.player === '') {
                continue;
            } else {
                console.log(result.set)
                return { player: result.player, coordinates: { startPoint: { x: result.set!.startPoint, y: row }, endPoint: { x: result.set!.endPoint, y: row } }};
            }
        }

        // Check for columns
        for(let col = 0; col < SIDE; col++) {
            let column = [];
            for(let row = 0; row < SIDE; row++) {
                column.push(boardRows[row][col]);
            }
            let result = this.checkForMarks(column);
            if(result.player === '') {
                continue;
            } else {
                return { player: result.player, coordinates: { startPoint: { x: col, y: result.set!.startPoint }, endPoint: { x: col, y: result.set!.endPoint } }};
            }
        }

        // Check for lower left
        for(let col = 0; col < SIDE; col++) {
            let startCol = undefined;

            let diagonal = [];
            // Build a diagonal array by iterating both directions
            for(let diag = 0; diag < SIDE - col; diag++) {
                //console.log("solu " + (diag+col) + ":" + diag);
                if(!startCol) {
                    startCol = diag+col;
                }
                diagonal.push(boardRows[diag][diag+col])
            }

            if(diagonal.length < 5) {
                continue;
            }
            else if(diagonal.length === SIDE - col) {
                let result = this.checkForMarks(diagonal);  
                if(result.player === '') {
                    continue;
                } else {
                    console.log('ylävasen')
                    console.log(startCol)
                    console.log(result.set)
                    return { player: result.player, coordinates: { startPoint: { x: startCol!+result.set!.startPoint, y: result.set!.startPoint }, endPoint: { x: startCol!+result.set!.endPoint, y: result.set!.endPoint } }};
                }
            }
        }

        // Check for lower left
        for(let row = 1; row < SIDE; row++) {
            let startRow = undefined;
            let diagonal = [];
            // Build a diagonal array by iterating both directions
            for(let diag = 0; diag < SIDE - row; diag++) {
                //console.log("solu " + (diag+row) + ":" + diag);
                if(!startRow) {
                    startRow = diag+row;
                }
                diagonal.push(boardRows[diag+row][diag])
            }
            if(diagonal.length < 5) {
                continue;
            }
            else if(diagonal.length === SIDE - row) {
                let result = this.checkForMarks(diagonal);
                if(result.player === '') {
                    continue;
                } else {
                    console.log('alavasen')
                    return { player: result.player, coordinates: { startPoint: { x: result.set!.startPoint, y: startRow!+result.set!.startPoint  }, endPoint: { x: result.set!.endPoint, y: startRow!+result.set!.endPoint} }};
                }
            }
        }

        // Check for upper right
        for(let col = SIDE - 1; col > 0; col--) {
            let startCol = undefined;
            let diagonal = [];
            console.log('diagonaali yläoikea, sarake: ' + col)
            // Build a diagonal array by iterating both directions
            for(let row = 0; row <= col; row++) {
                //console.log("solu " + (row) + ":" + (col-row));
                if(!startCol) {
                    startCol = col-row;
                }
                diagonal.push(boardRows[row][col-row])
            }
            console.log(diagonal)
            if(diagonal.length < 5) {
                console.debug('Diagonal not long enough, skipping');
                continue;
            }
            else {
                console.debug('Checking for win');
                let result = this.checkForMarks(diagonal);
                if(result.player === '') {
                    continue;
                } else {
                    console.log('yläoikea')
                    console.log(startCol)
                    console.log(result.set)
                    return { player: result.player, coordinates: { startPoint: { x: startCol! - result.set!.startPoint, y: result.set!.startPoint  }, endPoint: { x: startCol!-result.set!.endPoint, y: result.set!.endPoint} }};
                }
            }
        }

        // Check for lower right
        for(let row = 1; row < SIDE; row++) {
            let startRow = undefined;
            let diagonal = [];
            // Build a diagonal array by iterating both directions
            for(let col = 0; col < SIDE; col++) {
                if(col+row == 10)
                    break;
                if(!startRow) {
                    startRow = col+row;
                }

                diagonal.push(boardRows[col+row][SIDE-1-col])
            }

            if(diagonal.length < 5) {
                continue;
            }
            else {
                let result = this.checkForMarks(diagonal);
                if(result.player === '') {
                    continue;
                } else {
                    return { player: result.player, coordinates: { startPoint: { x: SIDE - 1 - result.set!.startPoint, y: startRow! + result.set!.startPoint }, endPoint: { x: SIDE - 1 - result.set!.endPoint, y: startRow! + result.set!.endPoint} }};
                }
            }
        }
        return { player: '' };
    }

    private checkForMarks(line: string[]): Winner {
        // Can the line fit the minimum set
        if(line.length < WINNING_LENGTH) {
            return { player: ''};
        }

        let xHas = 0;
        let oHas = 0;
        for(let mark = 0; mark < line.length; mark++) {            
            // Are the two contigious 
            if(line[mark] === 'X' && line[mark+1] === 'X') {
                xHas++;
                oHas = 0;
            } else if(line[mark] === 'O' && line[mark+1] === 'O') {
                oHas++;
                xHas = 0;
            } else if(line[mark] === '') {
                xHas = 0;
                oHas = 0;
            }
            // Do we have a winner?
            if(xHas === 4 && line[mark+1] === 'X') {
                return { player: 'PLAYER1', set: { startPoint: mark-3, endPoint: mark+1 }};
            }
            else if(oHas === 4 && line[mark+1] === 'O') {
                return { player: 'PLAYER2', set: { startPoint: mark-3, endPoint: mark+1 } };
            }
        }
        return { player: ''};
    }

    private printGameState() {
        const { currentPlayer, winner } = this.state;
        if(winner) {
            return <Text style={{ margin: 32, fontSize: 36 }}>{winner + ' won!'}</Text>
        }
        else {
            return <Text style={{ margin: 32, fontSize: 36 }}>{currentPlayer + '\'s turn'}</Text>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.printGameState()}
                {this.drawBoard()}
                <Button title={'Tyhjennä'} onPress={this.resetBoard}/>
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        }
    });
    