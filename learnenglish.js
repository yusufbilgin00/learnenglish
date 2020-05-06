class UI{
    constructor(){
        this.loading = document.getElementById('loading')
        this.answerİnput = document.getElementById('answer-input')
        this.randomBtn = document.getElementById('random-btn')
        this.addBtn = document.getElementById('add-btn')
        this.rememberBtn = document.getElementById('remember-btn')
        this.addİnput = document.getElementById('add-input')
        this.bodyList = document.getElementById('body-list')
        this.listİd = []
        this.number = 0
    }
    runBody(){
        let addİnputValue = this.addİnput.value
        if(addİnputValue === ""){
            alert('Please Add Something')
        }else{
            let value = document.getElementById('add-input')
            value.value = ""
            let info = {
                sentence: addİnputValue,
                id: this.number
            }
            this.number++;
            this.listİd.push(info)
            this.addSentence(info)
        }
    }
    addSentence(listName){
        let li = document.createElement('li')
        li.className = 'list-group-item font-weight-bold'
        li.innerHTML = `
        <h4 data-id="${listName.id}">${listName.sentence}</h4> 
        `
        this.bodyList.insertBefore(li, this.bodyList.childNodes[0])
        console.log(this.listİd)
    }
    selectSentence(){
        let randomNumber = Math.floor(Math.random() * this.listİd.length)
        let change = JSON.stringify(this.listİd[randomNumber].sentence)
        let text = change.toString()

        if(this.listİd.length === 0){
            console.log('You do not have any list!!')
        }else{
            console.log("Loading is = " + text)
            this.loading.innerHTML = text
        }
        this.trueList(text)
    }
    trueList(text){
        this.rememberBtn.addEventListener('click', ()=> {
            let value = this.answerİnput.value
            this.filterList(text, value)
        })
    }
    filterList(text, value){
        console.log(value)
        if(text === value){
            console.log('True')
        }else{
            console.log('False')
        }
    }
}


function randomBtn(){
    const rememberbtn = document.getElementById('remember-btn')
    const addbtn = document.getElementById('add-btn')
    const randombtn = document.getElementById('random-btn')
    const inputAnswer = document.getElementById('answer-input')
    const body = document.getElementById('body-list');
    const ui = new UI()
    
    addbtn.addEventListener('click', ()=> {
        ui.runBody()
    })
    document.addEventListener('keydown', (event) => {
        if(event.keyCode === 13){
            ui.runBody()
        }
    })
    randombtn.addEventListener('click', ()=> {
        ui.selectSentence()
    })
}
document.addEventListener('DOMContentLoaded', ()=> {
    randomBtn()
})