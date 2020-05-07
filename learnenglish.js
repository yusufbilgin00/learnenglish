class UI{
    constructor(){
        this.englishİnput = document.getElementById("english-input")
        this.turkishİnput = document.getElementById("turkish-input")
        this.bodyList = document.getElementById('body-list')
        this.sentenceWord = document.getElementById('sentence')
        this.answerİnput = document.getElementById('answer-input')
        this.selectBtn = document.getElementById('select-btn')
        this.randomButton = document.querySelector('.random-button')
        this.id = 0
        this.listİd = []
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
        li.className = 'list-group-item list'
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
        //this.randomBtn.addEventListener('click', this.randomSelect())
    }
    randomSelect(){
        setTimeout(() => this.randomButton.classList.add('hidden'), 100)
        setTimeout(() => this.addSentenceWord())
    }
    addSentenceWord(){
        let random = this.total()
        let english = this.listİd[random].english
        let turkish = this.listİd[random].turkish
        this.sentenceWord.innerHTML = english;
        let valueAnswer = this.answerİnput.value;
        console.log(english + " = " + turkish)
    }
    total(){
        let random = Math.floor(Math.random() * this.listİd.length)
        return random
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
}
document.addEventListener('DOMContentLoaded', ()=> {
    events()
})