import { useTheme, Text, SegmentedButtons, Button, IconButton } from 'react-native-paper';
import { ScreenTemplate } from '../../utils/screentemplate';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

const TicTacToeScreen = ({ navigation, route }) => {
    const paperTheme = useTheme();
    const [board, setBoard] = useState(Array(9).fill(""));
    const [xIsNext, setXIsNext] = useState(true);
    const [isGame, setIsGame] = useState(false);
    const [isVsBot, setIsVsBot] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [endText, setEndText] = useState("");

    const resetGame = () => {
        for (let i = 0; i < board.length; i++)
            board[i] = "";
        setBoard([...board])
        setEndText("");
        setXIsNext(true);
        setIsLoading(false);
    }

    const startGame = () => {
        setIsGame(true);
    }

    const stopGame = () => {
        setIsGame(false);
    }

    const isWinning = board => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of lines) {
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const availableMoves = board => {
        const moves = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                moves.push(i);
            }
        }
        return moves;
    };

    const botMove = board => {
        const bot = "O";
        const opponent = "X";

        // Check for potential wins for the player
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                const newBoard = [...board];
                newBoard[i] = bot;
                if (isWinning(newBoard) === bot) {
                    return i; // Winning move found, return immediately
                }
            }
        }

        // If no immediate win, block opponent's potential win
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                const newBoard = [...board];
                newBoard[i] = opponent;
                if (isWinning(newBoard) === opponent) {
                    return i; // Block opponent's potential win
                }
            }
        }

        // If neither player has a potential win, choose a random available move
        const moves = availableMoves(board);
        const randomIndex = Math.floor(Math.random() * moves.length);
        return moves[randomIndex];
    };


    const handleClick = (index) => {
        const newBoard = [...board];
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);

        if (isWinning(newBoard)) {
            setEndText(`${isWinning(newBoard)=="X" ? "Player 1" : (isVsBot) ? "Bot" : "Player 2"} Win!`);
            stopGame();
        }

        else if (isGame && isVsBot) {
            setIsLoading(true);
            newBoard[botMove(newBoard)] = 'O';
            setBoard(newBoard);
            setXIsNext(true);
            setIsLoading(false);
        }

        if (isWinning(newBoard)) {
            setEndText(`${isWinning(newBoard)=="X" ? "Player 1" : (isVsBot) ? "Bot" : "Player 2"} Win!`);
            stopGame();
        }

        else if (availableMoves(board).length == 1 && endText == "") {
            setEndText("Game Draw!");
            stopGame();
        }
    };

    const T3Button = ({ index }) => {
        return (
            <IconButton
                icon={(board[index] == "") ? "" : (board[index] == "X") ? "star" : 'zodiac-scorpio'}
                onPress={() => {if (!(board[index] != "" || !isGame || isLoading)) handleClick(index)}}
                iconColor = {(board[index] === "X") ? paperTheme.colors.primaryContainer : paperTheme.colors.secondaryContainer}
                style={{
                    backgroundColor: (isGame) ? paperTheme.colors.onTertiaryContainer : "transparent"
                }}
            />
            // <Button
            //     mode={(board[index] == "") ? "contained-tonal" : "tonal"}
            //     onPress={() => handleClick(index)}
            //     disabled={(board[index] != "" || !isGame || isLoading)}
            //     labelStyle={{ color: paperTheme.colors.text }}
            // >
            //     {/* {board[index]} */}
            // </Button>
        );
    }

    return (
        <ScreenTemplate>
            <View style={[styles.container]}>
                <Text variant="displayMedium" style={[styles.header]}>Tic Tac Toe</Text>
                <SegmentedButtons
                    style={[styles.segmentedButtonDesign]}
                    value={isVsBot}
                    onValueChange={value => {
                        setIsVsBot(value);
                        stopGame();
                    }}
                    buttons={[
                        {
                            value: true,
                            label: 'Vs Bot',
                        },
                        {
                            value: false,
                            label: 'Hotseat',
                        },
                    ]}
                />

                <Text variant="bodyLarge" style={[styles.header]}>
                    {(!isGame && endText) ? endText : ""}
                </Text>

                <View style={[styles.table]}>
                    <View style={[styles.row]}>
                        <T3Button index={0} />
                        <T3Button index={1} />
                        <T3Button index={2} />
                    </View>
                    <View style={[styles.row]}>
                        <T3Button index={3} />
                        <T3Button index={4} />
                        <T3Button index={5} />
                    </View>
                    <View style={[styles.row]}>
                        <T3Button index={6} />
                        <T3Button index={7} />
                        <T3Button index={8} />
                    </View>
                </View>

                <Button mode="elevated" onPress={() => { resetGame(); startGame(); }}>New Game</Button>
            </View>
        </ScreenTemplate>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 56,
        paddingHorizontal: 16
    },

    header: {
        // fontFamily: 'PurplePurse-Regular',
        textAlign: 'center',
    },

    table: {
        flex: 1,
        justifyContent: "space-around"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    segmentedButtonDesign: {
        paddingVertical: "5%",
        paddingHorizontal: "5%",
    },
    text: {
        fontSize: 24,
    },
});

export default TicTacToeScreen;