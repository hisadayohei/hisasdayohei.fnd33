'use strict'
//変数
const showText = document.getElementById('showText');//アルファベットでる場所
const answerText = document.getElementById('answerText');//入力欄
const result = document.getElementById('result');//結果
const countDown = document.getElementById('countDown');//カウントダウン用
const startBotton = document.getElementById('startBotton');//スタートボタン
const missResult = document.getElementById('missResult');//ミス回数結果
let start;
let end;
let missCount = 0;
let second = 0;

answerText.disabled = true;

startBotton.addEventListener('click', gameStart);
function gameStart(){
    //初期化
    answerText.value = "";
    result.style.visibility  = "hidden";//非表示
    showText.style.visibility  = "hidden";//非表示
    missResult.innerText = "";    
    missCount = 0;
    startBotton.style.visibility = "hidden";
    
    

    //カウントダウン処理
    let second = 6;
    let date = new Date();
    // 終了時刻を開始日時+カウントダウンする秒数に設定
    let enddate = new Date(date.getTime() + second * 1000);
    let count = second;
    let id = setInterval(function(){
        count--;
        countDown.innerText = count;
        
        //ランダムな文字
        let alphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let random =  Math.floor( Math.random() * alphabets.length );
        showText.innerText = alphabets[random];//ランダムな文字をshowTextに代入
        
        //反射速度計測開始
        start = new Date();
        for (let i = 0; i < 1000; i++) {
            Math.sqrt(i);
        }


        // 現在日時と終了日時を比較
        let date = new Date();
        
        if(date.getTime() >= enddate.getTime()){
            clearInterval(id);//idがsetIntervalを
            countDown.innerHTML = "スタート！";
            showText.style.visibility  = "visible";
            answerText.disabled = false;
            answerText.focus();
            startBotton.style.visibility = "visible";
        } 
    }, 1000);
}

//エスケープキーを押したら実行
document.addEventListener("keydown",function(restart){
    if(restart.key === 'Escape'){
        gameStart();
    }
})

answerText.addEventListener('input',inputEvent);
function inputEvent(event){

    if(event.data == showText.innerText){//innerTextだと''がつくため==
        //反射速度計測終了
        end = new Date();
        result.style.visibility = "visible";//非表示
        result.innerText = (end.getTime() - start.getTime())/1000 + "秒";//終了時刻ー開始時刻
        countDown.innerText = "クリア！";
        answerText.disabled = true;

    } else {//ミスタップしたときの処理
        missCount += 1;
        // console.log(missCount);
        missResult.innerText = missCount + "回";
        answerText.value = "";
    }
}


