/**
 * When use with filter returns a list of capturable move
 *
 * @param move       A valid possible move for a player
 * @return           A move if the move is capturable
 */
function isCapturable(move) {
    return move.captured != null;
}

/**
 * When use with filter on a list of move returns a list of not capturable move
 *
 * @param move       A valid possible move for a player
 * @return           A move if the move is not capturable
 */
function isNotCapturable(moves){
    return moves.captured == null;
}

/**
 * return point for a capture
 *
 * The rules :
 * 1 - capturedPiece must be to lower case
 * 2 - The associate char is the same of chess.js.captured:
 * p for a pawn -> 1 pts
 * b for a bishop -> 1 pts
 * n for a knight -> 3 pts
 * r for a rook -> 5 pts
 * q for a queen -> 9 pts
 * invalid capture -> 0 pts
 * @param capturedPiece         The possible capture piece
 * @return Integer              The point allowed for a capture
 */
function givePointToMove(capturedPiece){
    if (capturedPiece === "p"){
        return 1;
    }
    if (capturedPiece === "b" || capturedPiece === "n"){
        return 3;
    }
    if (capturedPiece === "r"){
        return 5;
    }
    if (capturedPiece === "q") {
        return 9;
    }
    if (capturedPiece === null){
        return 0;
    }
}

/**
 * return null if no checkMate or checkmate move if it is possible
 *
 * @param game                  The chess.js game object
 * @param gameMoves             The list of possible move
 * @return checkMateMove        The checkmate move
 */
function makeCheckMate (game, gameMoves){
    var move = null;
    for (var i = 0; i < gameMoves.length; i++) {
        game.move(gameMoves[i]);
            if (game.in_checkmate()){
                move = gameMoves[i];
            }
        game.undo();
    }
    return move; 
}

/**
 * return the most valuable attack move if the trade is positif or null
 *
 * bestAttack move is calculate with the counter attack, only positive trade
 * will be consider for a best attack move.
 *
 * @param game                  The chess.js game object
 * @return moveAttack           The best attackMove
 */
function bestAttack(game) {
    //Keep all IA possibles moves
    var gameMoves = game.moves({ verbose:true});
    //  Find and filter all iaPossibleCapture
    var iaPossibleCapture = gameMoves.filter(isCapturable);
    var moveAttack = null;
    var hautPointage = 0;
    var pointage = 0;
    
    if (iaPossibleCapture.length !== 0) {
         // Play each IA possible capture
         for (var i = 0; i < iaPossibleCapture.length; i++) {
             game.move(iaPossibleCapture[i]);
             var humanPossibleCaptures = game.moves({ verbose: true }).filter(isCapturable);
             //  With all the human possibles captures keep only those who are attacking the humanMove
             var counterAttackHumanCapturesOnly = humanPossibleCaptures.filter(humanPossibleCapture => humanPossibleCapture.to === iaPossibleCapture[i].to);
             if (counterAttackHumanCapturesOnly.length !=0 ) {
                 for (var j = 0; j < counterAttackHumanCapturesOnly.length; j++) {
                     pointage = givePointToMove(iaPossibleCapture[i].captured) - givePointToMove(counterAttackHumanCapturesOnly[j].captured);
                     if (pointage >= hautPointage){
                         hautPointage=pointage;
                         moveAttack = iaPossibleCapture[i];
                     }
                 }
             } else {
                 pointage = givePointToMove(iaPossibleCapture[i].captured);
                 if (pointage >= hautPointage){
                     hautPointage=pointage;
                     moveAttack = iaPossibleCapture[i];
                 }
             }
             game.undo();
         }
    }
    return moveAttack;
}

/**
 * return null if no piece have to be protect or the position of the piece to protect
 *
 * The game must be a valid game
 *
 * @param game                  The chess.js game object
 * @param iaMove                The move play by the IA
 * @return pieceToProtec        The position of the piece to protect
 */
// Est-ce que je peux mettre une piece devant ou l echange n est pas favorable
function pieceToProtect(game, iaMove){
    var moveDef = null;
    var pieceToProtect = null;
    game.move(iaMove);
    moveDef = bestAttack(game);
    if (moveDef !== null){
        pieceToProtect = moveDef.to;
    //    console.log(pieceToProtect);
        console.log("Piece to protect position : " + pieceToProtect);
    }
    game.undo();
    return pieceToProtect;
}

/**
 * return null if no piece have to be protect or the position of the piece to protect
 *
 * The game must be a valid game
 *
 * @param game                         The chess.js game object
 * @param positionOfPieceToProtect     The position of the piece to protect
 * @return moveDefensif                The a valid defensive move to put the 
 *                                     piece in a safe place randomly.
 */
function movePieceToProtect(game, positionOfPieceToProtect){
    var possibleMovePieceToProtect = game.moves({ square: positionOfPieceToProtect});
    var moveDefensif = null;
    var noDangerMove = [];
    if (possibleMovePieceToProtect.length !==0){
	noDangerMove = randomMoveNoDanger(game, possibleMovePieceToProtect);
    //    console.log(possibleMovePieceToProtect);
    //    console.log(noDangerMove);
        if (noDangerMove.length !==0){
            moveDefensif = game.move(noDangerMove[Math.floor(Math.random() * noDangerMove.length)]);
            game.undo();
        }
    }
    return moveDefensif;
}


/**
 * return the list of all possible move to put a piece in a safe square
 * or an empty list if the piece is squeeze
 *
 * The game must be a valid game
 *
 * @param game                  The chess.js game object
 * @param randomMove            The list of possible move for a piece
 * @return pieceToProtec        The position of the piece to protect
 */
function randomMoveNoDanger(game, randomMove) {
    var bestAttackMove = null;
    var allSecurityMove = [];
    var move = null;
    for (var i = 0; i < randomMove.length; i++) {
        move = game.move(randomMove[i]);
        bestAttackMove = bestAttack(game);
        console.log(bestAttackMove);
        console.log(move);
        if (bestAttackMove === null){
            allSecurityMove.push(randomMove[i]);
        } else if (bestAttackMove.captured !== move.piece){
                console.log(bestAttackMove.captured);
                console.log(move.piece);
		allSecurityMove.push(randomMove[i]);
        }
        game.undo();
    }
    console.log(allSecurityMove);
    return allSecurityMove;
}

function randomMoveNoDanger2(game, randomMove) {
    var bestAttackMove = null;
    var allSecurityMove = [];
    for (var i = 0; i < randomMove.length; i++) {
        game.move(randomMove[i]);
        bestAttackMove = bestAttack(game);
        if (bestAttackMove === null){
            allSecurityMove.push(randomMove[i]);
        }
        game.undo();
    }
    console.log(allSecurityMove);
    return allSecurityMove;
}


function counterAttackPiece(game, attackMove){
    var move = null;
    //piece = null;
    game.move(attackMove);
    move = bestAttack(game);
    game.undo();
    return move;
}

function easyIa(game){
    var moveAttack = null;
    var moveDef = null;
    var finalMove = null;
    var gameMoves = game.moves({ verbose:true});
    var iaNoCaptureMove = gameMoves.filter(isNotCapturable);
    var randomMove = iaNoCaptureMove[Math.floor(Math.random() * iaNoCaptureMove.length)];
    var securityMove = null;
    var positionPieceToProtect = null;
    var counterAttackMove = null;

    moveAttack = makeCheckMate(game, gameMoves);
    if (moveAttack === null){
        moveAttack = bestAttack(game);
        if (moveAttack !== null){
            counterAttackMove = counterAttackPiece(game, moveAttack);
            console.log(moveDef);
            if (counterAttackMove !== null){
            //    console.log(givePointToMove(moveAttack.captured));
            //    console.log(givePointToMove(moveDef.piece));
                if (givePointToMove(moveAttack.captured) >=  givePointToMove(counterAttackMove.captured)){
                    console.log("moveAttaque parce que DefMove plus petit");
                    finalMove = moveAttack;
                } else {
                    console.log("DefMove plus grand que move attaque");
                    console.log(randomMove);
                    moveDef = movePieceToProtect(game, counterAttackMove.to);
                    if (moveDef !== null){
                        console.log("math probleme");
                        finalMove = moveDef;
                    } else {
                        console.log("math probleme2");
                        securityMove = randomMoveNoDanger2(game, iaNoCaptureMove);
                        console.log(securityMove);
                        finalMove = securityMove[Math.floor(Math.random() * securityMove.length)];
                        if (securityMove.length === 0){
                            finalMove = randomMove;
                        }
                    }

                }
            } else {
                console.log("moveAttaque parce qu aucune contre attaque");
                finalMove = moveAttack;
            }
        } else {
            securityMove = randomMoveNoDanger2(game, iaNoCaptureMove);
            console.log(securityMove);
            if (securityMove.length !== 0){
                console.log("math probleme");
                finalMove = securityMove[Math.floor(Math.random() * securityMove.length)];
            } else {
                console.log("math probleme2");
                positionPieceToProtect = pieceToProtect(game, randomMove);
                console.log(randomMove);
                // console.log(positionPieceToProtect);
                finalMove = movePieceToProtect(game, positionPieceToProtect);
                if (finalMove === null){
                    console.log("randomMove");
                    finalMove = randomMove;
                }
            }

            /*console.log("pas de move d attaque random move");
            positionPieceToProtect = pieceToProtect(game, randomMove);
            console.log(randomMove);
           // console.log(positionPieceToProtect);
            moveDef = movePieceToProtect(game, positionPieceToProtect);
            if (moveDef !== null){
                console.log("math probleme");
                finalMove = moveDef;
            } else {
                console.log("math probleme2");
                securityMove = randomMoveNoDanger2(game, iaNoCaptureMove);
		console.log(securityMove);
                finalMove = securityMove[Math.floor(Math.random() * securityMove.length)];
                if (securityMove.length === 0){
                    finalMove = randomMove;
                }
            }*/
        }
    } else {
        finalMove=moveAttack;
    }
    console.log(finalMove);
    return finalMove;
}
export {easyIa}
