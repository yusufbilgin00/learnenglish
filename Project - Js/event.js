class UI{
    constructor(){
        this.randomBtn = document.getElementById('random-button')
        this.englishWord = document.getElementById('english-input')
        this.turkishWord = document.getElementById('turkish-input')
        this.filterİnput = document.getElementById('filter-input')
        this.bodyList = document.getElementById('list-body')
        this.correctWord = document.querySelector('#correct-number')
        this.wrongWord = document.querySelector('#wrong-number')
        this.trueOrFalse = document.getElementById('trueOrFalse')
        this.word = document.getElementById('word')
        this.alertFeedback = document.querySelector('#alert-feedback')
        this.answerİnput = document.querySelector('.answer')
        this.allList = document.querySelectorAll('.list-group-item')
        this.iconCorrect = document.querySelector('.icon-correct')
        this.iconWrong = document.querySelector('.icon-wrong')
        this.correct = 0
        this.wrong = 0
        this.wordList = []
        this.turkishWordList = []
        this.takeFromLocalStorage()
    }
    // Take Word From LocalStorage
    takeFromLocalStorage(){
        const lists = this.getWordToLocalStorage()
        lists.forEach(list => {
            this.addWord(list)
        })
    }
    // Add New Word
    getWord(){
        const englishWord = this.englishWord.value
        const turkishWord = this.turkishWord.value
        if(englishWord === "" || turkishWord === ""){
            alert('you must fill the entire field')
        }else{
            document.getElementById('english-input').value = ""
            document.getElementById('turkish-input').value = ""

            const listObj = {
                english: englishWord,
                turkish: turkishWord
            }
            this.addWord(listObj)
            this.addWordToLocalStorage(listObj)
        }
    }
    getWordToLocalStorage(){
        let books;
        if(localStorage.getItem('todos') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('todos'))
        }
        return books;
    }
    addWordToLocalStorage(word){
        const words = this.getWordToLocalStorage()
        words.push(word)
        localStorage.setItem('todos', JSON.stringify(words))
    }
    addWord(sentence){
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between text-capitalize'
        li.innerHTML = `
        <h5>${sentence.english}</h5>
        <button class="btn btn-danger btn-sm remove">X</button>
        `
        this.bodyList.insertBefore(li, this.bodyList.childNodes[0])
        this.turkishList(sentence)
    }
    // Push Turkish Words to turkishWordList
    turkishList(sentence){
        let expense = {
            turkish: sentence.turkish,
            english: sentence.english
        }
        this.wordList.push(expense)
        console.log(this.wordList)
    }
    showTurkish
    // Remove Word From Localstorage
    removeFromLocalStorage(target){
        let lists = this.getWordToLocalStorage()
        lists.forEach((value, index) => {
            if(target === value.english){
                lists.splice(index, 1)
            }
        })
        localStorage.setItem('todos', JSON.stringify(lists))
    }
    // When Click On Random Button
    randomButton(){
        if(this.wordList.length == 0){
            Feedback.addMessage('You must enter a word !!!','danger')
        }else{
            const random = Math.floor(Math.random() * this.wordList.length)
            const english = this.wordList[random].english
            const turkish = this.wordList[random].turkish.toLowerCase()
            this.turkishWordList.push(turkish)
            console.log(this.turkishWordList)
            this.word.innerHTML = english
            this.confirmWord()
        }
    }
    confirmWord(){
        this.answerİnput.classList.add('visible1')
        this.randomBtn.classList.add('visible2')
    }
    showWord(){
        if(this.answerİnput.value === ""){
            Feedback.addMessage('Enter something !!!', 'danger')
        }else{
            this.synchronize()
        }
    }
    synchronize(){
        const length = this.turkishWordList[this.turkishWordList.length - 1]
        if(this.answerİnput.value.toLowerCase() == length){
            this.correct++
            this.correctWord.textContent = this.correct
            this.answerİnput.value = ""
            this.againGame(length, this.iconCorrect)
            Feedback.addMessage('Correct!!!', 'light')
        }else{
            this.wrong++
            this.wrongWord.textContent = this.wrong
            this.answerİnput.value = ""
            this.againGame(length, this.iconWrong)
            Feedback.addMessage('Wrong!!!', 'danger')
        }
    }
    againGame(length, which){
        which.classList.add('visible3')
        this.trueOrFalse.innerHTML = length    
        this.randomBtn.classList.remove('visible2')
        this.word.innerHTML = "................"
        setTimeout(() => {
            this.trueOrFalse.innerHTML = "---------"
            which.classList.remove('visible3')
        }, 3000)
    }
    filterTodoList(e){
        const value = this.filterİnput.value.toLowerCase()
        const lists = document.querySelectorAll('.list-group-item')
        lists.forEach((item) => {
            let text = item.textContent.toLowerCase()
            if(text.indexOf(value) === -1){
                item.setAttribute("style", "display: none !important")
            }else{
                item.setAttribute("style", "display: block")
            }
        })

    }
}
function events(){
    const addButton = document.getElementById('add-button')
    const bodyList = document.querySelector('#list-body')
    const randomButton = document.getElementById('random-button')
    const confirmButton = document.getElementById('confirm-button')
    const filterinput = document.getElementById('filter-input')
    let ui = new UI()

    
    addButton.addEventListener('click', () => {
        ui.getWord()
    })
    bodyList.addEventListener('click', (el) => {
        if(el.target.classList.contains('remove')){
              el.target.parentElement.remove()
              ui.removeFromLocalStorage(el.target.parentElement.firstElementChild.textContent)
          }
     })
    randomButton.addEventListener('click', () => {
        ui.randomButton()
    })
    confirmButton.addEventListener('click', ()=> {
        ui.showWord()
    })
    filterinput.addEventListener('keyup', ()=> {
        ui.filterTodoList()
    })
}
document.addEventListener('DOMContentLoaded', ()=> {
    events()
})
        
        