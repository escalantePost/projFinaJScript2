const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const mensagem = document.getElementById('mensagem')
const ul = document.getElementById('repo')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    checkInputs()
})

function checkInputs() {

    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const mensagemValue = mensagem.value.trim()
    
    console.log(usernameValue);

    if(usernameValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(username, 'Preencha esse campo')
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(username)
    }

    if(emailValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(email, 'Preencha esse campo')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email inválido')
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(email)
    }
   
    if(mensagemValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(mensagem, 'Preencha esse campo')

    } else {
        // adicionar a classe de sucesso
        setSuccessFor(mensagem)
    }

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'form-control error'
}

function setErrorFor(textarea, message) {
    const formControl = textarea.parentElement;
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'form-control error'
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control success'
}

function setSuccessFor(textarea) {
    const formControl = textarea.parentElement;

    formControl.className = 'form-control success'
}

function isEmail(email) {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
}

function getApiGitHub(){
    fetch('https://api.github.com/users/escalantePost/repos')
    .then(async res =>{
        if(!res.ok){
            throw new Error(res.status)
        }
        let data = await res.json()
        data.map(item =>{
           let li = document.createElement('li')
           li.innerHTML= `
            <strong>${item.name.toUpperCase()}</strong>
            <span>${item.url}</span>
            <span>Data Criação: 
                ${Intl.DateTimeFormat('pt-BR')
                    .format(new Date(item.created_at))}
            </span>
           ` 
           ul.appendChild(li)
        })
    }).catch(e => console.log(e))
}

getApiGitHub()