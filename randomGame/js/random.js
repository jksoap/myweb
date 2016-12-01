var countDownSeconds = 0;
var handle = null;
var rankNum=0;
var data=[];
function onLoadWindow() {
    countDownSeconds=0;
    firstrandow=document.getElementById('rankRow');
    dialog = document.querySelector('#leftname');
    wrongDia=document.getElementById('wrongTip');
    startBt = document.getElementById("startBt");
    subBt = document.getElementById("subBt");
    numInput = document.getElementById("numInput");
    answerInput = document.getElementById("answerInput");
    readyBt = document.getElementById("readyBt");
    aCanvas = document.getElementById("timerCanvas");
    question = document.getElementById("ques");
    yourName = document.getElementById("yourName");
    okBt = document.getElementById("ok");
    clBt=document.getElementById('clBt');
    tbody=document.getElementById('tbody');
    rightTip=document.getElementById("rightAnswer");
    yourAns=document.getElementById("yourAnswer");
    tip1=document.getElementById('tip1');
    tip2=document.getElementById('tip2');
    tip3=document.getElementById('tip3');
    firstdisplay();
    getData();
}

function firstdisplay(){
    numInput.value='';
    answerInput.value='';
    ques.value='';
    yourName.value='';
    context = aCanvas.getContext("2d");
    var canvasText = "press to start";
    var xPos = aCanvas.width / 2;
    var yPos = aCanvas.height / 2;
    context.clearRect(0, 0, xPos*2, yPos*2);
    context.font = "24pt Century Gothic";
    context.fillStyle = "#aed581";
    context.textAlign = "center";
    context.textBaseLine = "middle";
    context.fillText(canvasText, xPos, yPos);
    subBt.style.display = "none";
    answerInput.style.display = "none";
    readyBt.style.display = "none";
    question.style.display = "none";
    numInput.style.display="block";
    startBt.style.display="block";
    clBt.style.display = "block";
    tip1.style.display="block";
    tip2.style.display='none';
    tip3.style.display='none';
}

function getTD(theCount){
    var msStr = Math.floor((theCount % 1000) % 100);
    var secStr = Math.floor((theCount % 6000) / 100);
    var minStr = Math.floor((theCount % 3600000) / 6000);
     if (msStr < 10)
        msStr = "0" + msStr;
    if (secStr < 10)
        secStr = "0" + secStr;
    if (minStr < 10)
        minStr = "0" + minStr;
    var timeDisplay=minStr + " : " + secStr + " : " + msStr;
    return timeDisplay;
}
function getData(){
    var localdata=localStorage.randomData;
    if(localdata){
        localdata = JSON.parse(localdata);
        localdata.forEach(function(single) {
        data.push(single);
        console.log(JSON.stringify(data));
        refreshRank(single.name,single.num,single.time);
    });
    }else{
        clBt.style.display = "none";
    }
}
function updateCanvas(theContext, width, height) {
    var timeText=getTD(countDownSeconds);
    theContext.clearRect(0, 0, width, height);
    theContext.textAlign = "center";
    theContext.textBaseLine = "middle";
    theContext.font = "24pt Century Gothic";
    theContext.fillText(timeText, width / 2, height / 2);
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
    tip1.style.display="none";
    tip2.style.display='block';
    tip3.style.display='none';
}

function submmit() {
    clearInterval(handle);
    var ans = answerInput.value.toString();
    if (ans == ques) {
        displaytoggle(dialog,true);
    } else {
        displaytoggle(wrongDia,true);
        rightAnswer.textContent=ques;
        yourAnswer.textContent=ans;
    }

}

function randomNum(theNum) {
    var str = "";
    for (var i = 0; i < theNum; i++)
        str = str + Math.floor(Math.random() * 10);
    return str;
}

function ready() {
    readyBt.style.display = "none";
    question.style.display = "none";
    answerInput.style.display = "inline";
    subBt.style.display = "inline";
    tip1.style.display="none";
    tip2.style.display='none';
    tip3.style.display='block';
}

function save(theNum,theName,theTime) {
    data.push({name:theName,num:theNum,time:theTime});
    localStorage.randomData=JSON.stringify(data);
}

function displaytoggle(theElement,visible) {
    if (visible) {
        theElement.classList.add('dialog-container--visible');
    } else {
        theElement.classList.remove('dialog-container--visible');
    }
}

function ok(){
    name = yourName.value.toString();
    save(num,name,countDownSeconds);
    displaytoggle(dialog,false);
    refreshRank(name,num,countDownSeconds);
    firstdisplay();
}

function refreshRank(theName,theNum,theTime){
    var rankRow=firstrandow.cloneNode(true);
    rankRow.querySelector('#name').textContent=theName;
    rankRow.querySelector('#rank').textContent=++rankNum;
    rankRow.querySelector('#length').textContent=theNum;
    rankRow.querySelector('#time').textContent=getTD(theTime);
    rankRow.removeAttribute('hidden');
    document.getElementById('tbody').appendChild(rankRow);
}

function RankClear(){
    localStorage.randomData='';
    while (tbody.hasChildNodes()){
        tbody.removeChild(tbody.lastChild);
    }
    clBt.style.display = "none";
}
function back(){
firstdisplay();
displaytoggle(wrongDia,false);
}