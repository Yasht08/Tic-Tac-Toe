let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector('#reset');
let msgContainer=document.querySelector('.msg-container');
let msg=document.querySelector('#msg');
let count=0;
let turnO=true;

const patterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


const resetGame = ()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach((box)=>{
        box.innerText="";
    });
};

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turnO){
            box.innerHTML='O';
            turnO=false;
        }else{
            box.innerHTML='X';
            turnO=true;
        }
        box.disabled=true;

        checkWinner();
    });
});


const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};


const showWinner = (winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    disableBoxes();
    msgContainer.classList.remove("hide");
}


const checkWinner=()=>{
    for (let pattern of patterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val!== "" && pos2Val!== "" && pos3Val!== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                disableBoxes();
                showWinner(pos1Val);
                break;
            }
        }
    }
    if (boxes.length === Array.from(boxes).filter(box => box.innerText!== "").length) {
        msg.innerText = "Draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}
resetbtn.addEventListener("click",resetGame);