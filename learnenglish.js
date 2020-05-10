class UI{
    constructor(){
        this.englishİnput = document.getElementById("english-input")
        this.turkishİnput = document.getElementById("turkish-input")
        this.bodyList = document.getElementById('body-list')
        this.sentenceWord = document.getElementById('sentence')
        this.answerİnput = document.getElementById('answer-input')
        this.answer_İnput = document.querySelector('.answerİnput')
        this.selectBtn = document.getElementById('select-btn')
        this.randomButton = document.querySelector('.random-button')
        this.feedBack = document.querySelector('.feedback-message')
        this.correctScore = document.getElementById('correct-number')
        this.wrongScore = document.getElementById('wrong-number')
        this.iconOne = document.querySelector('.icon-one')
        this.iconTwo = document.querySelector('.icon-two')
        this.trueWord = document.querySelector('.true')
        this.falseWord = document.querySelector('.false')
        this.id = 0
        this.correctNumber = 0
        this.wrongNumber = 0
        this.listİd = []
        this.listWord = []
        this.myOwnList()
    }
    myOwnList(){
        let array = this.getName()
        array.forEach(list => {
            this.addList(list)
        })
    }
    getList(){
        let valueEnglish = this.englishİnput.value.toLowerCase()
        let valueTurkish = this.turkishİnput.value.toLowerCase()
        if(valueEnglish === "" || valueTurkish === ""){
            alert('Please fill all in fields!')
        }else{
            this.englishİnput.value = ""
            this.turkishİnput.value = ""
            let lists = {
                // id: this.id,
                englishSentences: valueEnglish,
                turkishSentences: valueTurkish
            }
            // this.id++
            //this.listİd.push(lists)
            this.addList(lists)
            this.addName(lists)
        }
    }
    getName() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
      }
    
    addName(book) {
        const books = this.getName();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    removeName(text){
        let todos = this.getName()
        todos.forEach((localText, index) => {
            if(text === localText.englishSentences){
                todos.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(todos))
    }
    addList(list){
        let li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between list'
        li.innerHTML = `
            <h5 data-id="${list.id}">${list.englishSentences}</h5>
            <button class="btn btn-danger btn-sm remove">X</button>
        `
        this.bodyList.insertBefore(li, this.bodyList.childNodes[0])
        this.entireList(list)
        this.englishİnput.focus()
    }
    entireList(list){
        this.id++
        let localList = {
            id: this.id,
            english: list.englishSentences,
            turkish: list.turkishSentences
        }
        this.listİd.push(localList)
        console.log(this.listİd)
    }
    randomSelect(){
        setTimeout(() => {
            this.randomButton.classList.add('hidden')
            this.answer_İnput.classList.add('writeAnswer')
        }, 100)
        setTimeout(() => this.addSentenceWord(), 100)
    }
    addSentenceWord(){
        let random = Math.floor(Math.random() * this.listİd.length)
        let english = this.listİd[random].english
        let turkish = this.listİd[random].turkish
        this.sentenceWord.innerHTML = english
        this.listWord.push(turkish)
        console.log(this.listWord)
    }
    equalWord(){
        let valueAnswer = this.answerİnput.value.toLowerCase();
        this.feedBack.classList.add('display')
        let word = this.listWord[this.listWord.length - 1]
        if(word === valueAnswer){
            let iconTrue = this.iconOne
            this.changeColor("Correct!!!", "orange")
            this.currentWord(word, this.trueWord, this.iconOne, 'orange')
            this.addRandomButton()
            this.correctNumber++
            this.correctScore.innerHTML = this.correctNumber
            this.answerİnput.value = ""
        }else{
            let iconFalse = this.iconTwo
            this.changeColor("Wrong!!!", "red")
            this.currentWord(word, this.falseWord, this.iconTwo, 'red')
            this.addRandomButton()
            this.wrongNumber++
            this.wrongScore.innerHTML = this.wrongNumber
            this.answerİnput.value = ""
        }
        document.querySelector('.select-button').value = ""
    }
    currentWord(word, current, icon, color){
        icon.classList.add('open')
        current.innerHTML = word
        current.style.color = color
        setTimeout(() => icon.classList.remove('open'), 2000)
    }
    changeColor(text, color){
            this.feedBack.innerHTML = text
            this.feedBack.style.color = color
            this.sentenceWord.classList.remove('close')
            this.answer_İnput.classList.remove('writeAnswer')
    }
    addRandomButton(){  
        setTimeout(() => {
            this.feedBack.classList.remove('display')
            this.randomButton.classList.remove('hidden')
        },2000)
    }
    filterTodoList(todoInput){
        let valueİnput = todoInput.value
        let allListBody = document.querySelectorAll('.list-group-item')
        allListBody.forEach((item) =>{
            let text = item.textContent
            if(text.indexOf(valueİnput) === -1){
                item.setAttribute('style','display: none !important')
            }else{
                item.setAttribute('style', 'display: block')
            }
        })
    }
}
function events(){
    let formbody = document.getElementById('form-body')
    let selectbtn = document.querySelector('.select-button')
    let randombtn = document.querySelector('.random-button')
    let bodyTodoList = document.querySelector('#body-list')
    let todoInput = document.querySelector('#filter-input')
    let ui = new UI()

    formbody.addEventListener('submit', (el) => {
        el.preventDefault()
        ui.getList()
    })
    randombtn.addEventListener('click', ()=> {
        ui.randomSelect()
    })
    selectbtn.addEventListener('click', ()=> {
        ui.equalWord()
    })
    todoInput.addEventListener('keyup', ()=> {
        ui.filterTodoList(todoInput)
    })
    bodyTodoList.addEventListener('click', (e)=> {
        if(e.target.classList.contains('remove')){
            e.target.parentNode.remove()
            ui.removeName(e.target.parentNode.firstElementChild.textContent)
        }
    })
}
document.addEventListener('DOMContentLoaded', ()=> {
    events()
})

