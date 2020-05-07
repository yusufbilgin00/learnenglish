class UI{
    constructor(){
        this.englishİnput = document.getElementById("english-input")
        this.turkishİnput = document.getElementById("turkish-input")
        this.bodyList = document.getElementById('body-list')
        this.sentenceWord = document.getElementById('sentence')
        this.answerİnput = document.getElementById('answer-input')
        this.selectBtn = document.getElementById('select-btn')
        this.randomButton = document.querySelector('.random-button')
        this.feedBack = document.querySelector('.feedback-message')
        this.correctScore = document.getElementById('correct-number')
        this.wrongScore = document.getElementById('wrong-number')
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
        let valueEnglish = this.englishİnput.value
        let valueTurkish = this.turkishİnput.value
        if(valueEnglish === "" || valueTurkish === ""){
            alert('Please fill all in fields!')
        }else{
            this.englishİnput.value = ""
            this.turkishİnput.value = ""
            let lists = {
                id: this.id,
                englishSentences: valueEnglish,
                turkishSentences: valueTurkish
            }
            this.id++
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
    // removeName(){
    // }
    addList(list){
        let li = document.createElement('li')
        li.className = 'list-group-item text-capitalize list'
        li.innerHTML = `
        <h5 data-id="${list.id}">${list.englishSentences}</h5>
        `
        this.bodyList.appendChild(li, this.bodyList.childNodes[0])
        this.entireList(list)
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
        setTimeout(() => this.randomButton.classList.add('hidden'), 100)
        setTimeout(() => this.addSentenceWord())
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
        let valueAnswer = this.answerİnput.value;
        this.feedBack.classList.add('display')
        let length = this.listWord.length - 1
        console.log(length)
        if(this.listWord[length] === valueAnswer){
            this.feedBack.innerHTML = "Correct !!!"
            this.feedBack.style.color = "yellow"
            setTimeout(() => {
                this.feedBack.classList.remove('display')
                this.randomButton.classList.remove('hidden')
            }, 1000)
            this.correctNumber++
            this.correctScore.innerHTML = this.correctNumber
            this.answerİnput.value = ""
            this.sentenceWord.innerHTML = ""
        }else{
            console.log('Wrong!')
            this.feedBack.innerHTML = "Wrong !!!"
            this.feedBack.style.color = "red"
            setTimeout(() => {
                this.feedBack.classList.remove('display')
                this.randomButton.classList.remove('hidden')
            }, 1000)
            this.wrongNumber++
            this.wrongScore.innerHTML = this.wrongNumber
            this.answerİnput.value = ""
            this.sentenceWord.innerHTML = ""
        }
        document.querySelector('.select-button').value = ""
    }
}
function events(){
    let formbody = document.getElementById('form-body')
    let selectbtn = document.querySelector('.select-button')
    let randombtn = document.querySelector('.random-button')
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
}
document.addEventListener('DOMContentLoaded', ()=> {
    events()
})