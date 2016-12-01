var countDownSeconds = 0;
var handle = null;

function onLoadWindow() {
    dialog=document.querySelector('.dialog-container');
    startBt = document.getElementById("startBt");
    subBt = document.getElementById("subBt");
    numInput = document.getElementById("numInput");
    answerInput = document.getElementById("answerInput");
    readyBt = document.getElementById("readyBt");
    aCanvas = document.getElementById("timerCanvas");
    question = document.getElementById("ques");
    yourName = document.getElementById("yourName");
    ok=document.getElementById("ok");
    context = aCanvas.getContext("2d");
    var canvasText = "press to start";
    var xPos = aCanvas.width / 2;
    var yPos = aCanvas.height / 2;
    context.font = "12pt Century Gothic";
    context.fillStyle = "#008000";
    context.textAlign = "center";
    context.textBaseLine = "middle";
    context.fillText(canvasText, xPos, yPos);
    subBt.style.display = "none";
    answerInput.style.display = "none";
    readyBt.style.display = "none";
    question.style.display = "none";
}

function updateCanvas(theContext, width, height) {
    msStr = Math.floor((countDownSeconds % 1000) % 100);
    secStr = Math.floor((countDownSeconds % 60000) / 100);
    minStr = Math.floor((countDownSeconds % 3600000) / 6000);
    if (msStr < 10)
        msStr = "0" + msStr;
    if (secStr < 10)
        secStr = "0" + secStr;
    if (minStr < 10)
        minStr = "0" + minStr;
    theContext.clearRect(0, 0, width, height);
    theContext.font = "12pt Century Gothic";
    theContext.textAlign = "center";
    theContext.textBaseLine = "middle";
    theContext.font = "12pt Century Gothic";
    theContext.fillText(minStr + " : " + secStr + " : " + msStr, width / 2, height / 2);
    countDownSeconds++;
}


function start() {
    if (handle != null)
        clearInterval(handle);
    timeDisplayCanvas = document.getElementById("timerCanvas");
    timeDisplayContext2D = timeDisplayCanvas.getContext("2d");
    handle = setInterval(function() {
        updateCanvas(timeDisplayContext2D, timeDisplayCanvas.width, timeDisplayCanvas.height);
    }, 10);
    num = numInput.value.toString();
    ques = randomNum(num);
    question.innerHTML = ques;
    question.style.marginLeft = "-" + num / 2 + "ex";
    numInput.style.display = "none";
    startBt.style.display = "none";
    readyBt.style.display = "inline";
    question.style.display = "inline";
}

function submmit() {
    clearInterval(handle);
    var ans = answerInput.value.toString();
    if (ans == ques) {
        dialog(true);
    } else {

    }

}

function randomNum(theNum) {
    var str = "";
    for (var i = 0; i < theNum; i++)
        str = str + Math.floor(Math.random() * 10 - 0.5);
    return str;
}

function ready() {
    readyBt.style.display = "none";
    question.style.display = "none";
    answerInput.style.display = "inline";
    subBt.style.display = "inline";
}

function save(theNum, theName,theTime) {
    var url = 'save.php?name=' + theName + "&num=" + theNum+"&time="+theTime;
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
}
function got(){


}
function dialogtoggle(visible) {
    if (visible) {
        dialog.classList.add('dialog-container--visible');
    } else {
        dialog.addDialog.classList.remove('dialog-container--visible');
    }
}
function ok(){
    var name=yourName.value.toString();
    synx(num,name);
    dialog(false);
}
