//盤面を定義しておく。
var board = [];
//盤面のサイズ
var size = 8;
//盤面の情報は行列(i,j)で表す。
//配列の要素の数をマス目の数+2個にしておくと、ひっくり返す処理が書きやすい＋マス目の番号と配列の番号が一致して、コーディングしやすい。
//0：まだ何も置かれていないマス、盤面の外のマス
//1：黒の駒が置かれているマス
//2：白の駒が置かれているマス
//盤面の情報をリセットする関数
function reset() {
    //盤面を空にする。
    board = [];
    //まずはまっさらな盤面を作成する。
    for (var column=0; column<size+2; column++) {
        board[column] = [];
        for (var row=0; row<size+2; row++) {
            board[column][row] = 0;
        }
    }
    //駒を初期配置する。
    board[size/2][size/2] = 2;
    board[size/2][size/2+1] = 1;
    board[size/2+1][size/2] = 1;
    board[size/2+1][size/2+1] = 2;
}
//フロント側の情報を更新する関数
function updateColor() {
    for (var i=1; i<size+1; i++) {
        for (var j=1; j<size+1; j++) {
            if (board[i][j] == 1) {
                //(i,j)が黒の時
                var squareElement = document.getElementsByClassName('piece'+i+j);
                //squareElement[i]としないと.classList.remove()や.classList.add();が使えない。
                squareElement[0].classList.remove('piece-white');
                squareElement[0].classList.add('piece-black');
            } else if (board[i][j] == 2) {
                //(i,j)が白の時
                var squareElement = document.getElementsByClassName('piece'+i+j);
                squareElement[0].classList.remove('piece-black');
                squareElement[0].classList.add('piece-white');
            }
        }
    }
}
//駒の数を数えて、表示を更新する関数＋勝敗を決める関数
function count() {
    var countBlack = 0;
    var countWhite = 0;
    //(i,j)が1なら黒を、2なら白を+1する。
    for (var i=1; i<size+1; i++) {
        for (var j=1; j<size+1; j++) {
            if (board[i][j] == 1) {
                countBlack++;
            } else if (board[i][j] == 2) {
                countWhite++;
            }
        }
    }
    //HTMLを書き換える。
    blackElement = document.getElementById('countBlack');
    blackElement.innerHTML = countBlack;
    whiteElement = document.getElementById('countWhite');
    whiteElement.innerHTML = countWhite;
    //黒の数＋白の数＝マス目の数になったらアラートを出す。
    if (countBlack+countWhite == size*size || countBlack == 0 || countWhite == 0) {
        if (countBlack > countWhite || countWhite == 0) {
            alert('黒の勝ち!');
        } else if (countBlack < countWhite || countBlack == 0) {
            alert('白の勝ち!');
        } else {
            alert('引き分け!');
        }
    }
}
//ページを読み込んだ時に発動する。駒を初期配置する。
window.onload = function(){
    reset();
    updateColor();
    count();
}
//ターンを規定。先攻は黒
var turn = 1;
//ターンを相手に渡す関数
function pass() {
    var turnElement = document.getElementById('turn');
    if (turn == 1){
        turn = 2;
        turnElement.innerHTML = '白';
    } else {
        turn = 1;
        turnElement.innerHTML = '黒';
    }
} 
//駒が置かれた時の処理
function btn(i,j) {
    var squareElement = document.getElementsByClassName('piece'+i+j);
    if (squareElement[0].classList.length == 1) {
        //駒がないとき、divのclassはpieceijのみで１つ。
        //駒を裏返す処理。上下左右を東西南北に見立ててnewsで表した。
        //駒を置いて上方向の処理
        for (var n=1; n<size; n++) {
            //(i,j-n)が0でも自分の色でもない(つまり相手の色)ならばfor文が続行
            if (board[i][j-n] == 0){
                //ひっくり返らない時のアラート用の変数代入
                n = 1;
                //(i,j-n)が空白マスなら上方向の処理は終了
                break;
            } else if (board[i][j-n] == turn) {
                //(i,j-n)が自分の色なら、駒を置いた位置から上にn個を自分の色に変える。
                //ただし、n=1は一つもひっくり返していないのでダメ。
                if (n !== 1) {
                    for (var k=0; k<n; k++) {
                        //駒の情報を更新
                        board[i][j-k] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて下方向の処理
        for (var s=1; s<size; s++) {
            if (board[i][j+s] == 0){
                s = 1;
                break;
            } else if (board[i][j+s] == turn) {
                if (s !== 1) {
                    for (var k=0; k<s; k++) {
                        board[i][j+k] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて左方向の処理
        for (var w=1; w<size; w++) {
            if (board[i-w][j] == 0){
                w = 1;
                break;
            } else if (board[i-w][j] == turn) {
                if (w !== 1) {
                    for (var k=0; k<w; k++) {
                        board[i-k][j] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて右方向の処理
        for (var e=1; e<size; e++) {
            if (board[i+e][j] == 0){
                e = 1;
                break;
            } else if (board[i+e][j] == turn) {
                if (e !== 1) {
                    for (var k=0; k<e; k++) {
                        board[i+k][j] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて右上方向の処理
        for (var ne=1; ne<size; ne++) {
            if (board[i+ne][j-ne] == 0){
                ne = 1;
                break;
            } else if (board[i+ne][j-ne] == turn) {
                if (ne !== 1) {
                    for (var k=0; k<ne; k++) {
                        board[i+k][j-k] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて右下方向の処理
        for (var se=1; se<size; se++) {
            if (board[i+se][j+se] == 0){
                se = 1;
                break;
            } else if (board[i+se][j+se] == turn) {
                if (se !== 1) {
                    for (var k=0; k<se; k++) {
                        board[i+k][j+k] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて左下方向の処理
        for (var sw=1; sw<size; sw++) {
            if (board[i-sw][j+sw] == 0){
                sw = 1;
                break;
            } else if (board[i-sw][j+sw] == turn) {
                if (sw !== 1) {
                    for (var k=0; k<sw; k++) {
                        board[i-k][j+k] = turn;
                    }
                }
                break;
            }
        }
        //駒を置いて左上方向の処理
        for (var nw=1; nw<size; nw++) {
            if (board[i-nw][j-nw] == 0){
                nw = 1;
                break;
            } else if (board[i-nw][j-nw] == turn) {
                if (nw !== 1) {
                    for (var k=0; k<nw; k++) {
                        board[i-k][j-k] = turn;
                    }
                }
                break;
            }
        }
        if (n==1 && e==1 && w==1 && s==1 && ne==1 && se==1 && sw==1 && nw==1) {
            //一つもひっくり返らないときにアラートを出す。
            alert('そのマスには駒を置けません！');
        } else {
            //ターンを相手に渡す。
            pass();
            //フロント側の情報を更新
            updateColor();
            //駒のカウントを更新
            count();
        }
    } else {
        //駒があるとき、divのclassはpieceijとpiece-[任意の駒の色]で2つ。
        alert('そのマスには駒を置けません！');
    }
}