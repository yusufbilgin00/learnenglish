class Feedback{
    static addMessage(message, className){
        const feedback = document.querySelector('.feedback')
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.append(document.createTextNode(message))
        feedback.appendChild(div)
        setTimeout(() => {
            feedback.firstElementChild.remove()
        }, 2000);
    }
}