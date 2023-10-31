

console.log('js is running')
const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#number")
const symbolscheck  = document.querySelector("#symbol")
const indicator = document.querySelector("data-indicator")
const generateBtn = document.querySelector(".generateButton")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const symbols = '~`!@#$%^&*()_+={}[]\|:;"<,.>?/';
const resetBtn = document.querySelector(".resetButton")

let password = ""; 
let passwordLength = 10;
let checkCount = 0;
handleSlider();

//set password length in UI  
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundcolor = color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max - min)+min)
}
function getRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}
function generateRandomNumber(){
    return  getRndInteger(0,9);
}
function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
 
    copyMsg.classList.add("active")

    setTimeout( () => {
        copyMsg.classList.remove("active")
    },2000);
}

//Fisher Yates Method
function shufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }   
        let str = "";
        array.forEach((el) => (str += el));
        return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
        checkCount++;
    });

    //special condition
    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();   
    }

}
allCheckBox.forEach((checkbox)=> {
    checkbox.addEventListener('change',handleCheckBoxChange);
});
console.log("handleCheckBoxChange")
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click',()=>{
    //none of checkbox selected
    if(checkCount <= 0) 
    return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    //Find New Password
    //remove Old Password
    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(numbersCheck.checked){
    //     password += generatenumbersCheck();
    // }
    // if(symbolscheck.checked){
    //     password += generateUpperCase();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    
    if(symbolscheck.checked)
        funcArr.push(generateSymbol);
    
    //compulsory Addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    //remaining Addition
    for(let i =0; i<passwordLength - funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show in UI
    passwordDisplay.value = password;
    //calc strength

})

  //Reset 
 resetBtn.addEventListener('click',() =>{
    passwordDisplay.value = "";
    resetlength = 10;
    lengthDisplay.innerText = resetlength;
    inputSlider.value = resetlength;
    copyMsg.innerText = "";

    allCheckBox.forEach(checkbox => {
        checkbox.checked = false;
    });
 })