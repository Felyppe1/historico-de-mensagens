function enviarMensagem() {
    //============CRIANDO A DIV TODA=============
    let input = document.querySelector('#type')
    let mensagem = input.value
    if (mensagem == '') {
        alert('Campo de mensagem vazio!')
        return
    }
    let texto = document.createElement('p')
    texto.innerText = mensagem
    let divMensagem = document.createElement('div')
    divMensagem.append(texto)
    input.value = ''  //Pra apagar o que tá escrito no type quando clica em enviar
    let editar = document.createElement('button')//Botão de editar
    editar.innerText = 'Editar'
    editar.setAttribute('id', 'block' + blockMsgId)  //Pra linkar o editar com seu blocoMensagem
    editar.setAttribute('onclick', 'editarMensagem(this)')  //Pra conseguir pegar o id daquele elemento
    let excluir = document.createElement('button')
    excluir.innerText = 'Excluir'
    excluir.setAttribute('id', 'block' + blockMsgId)
    excluir.setAttribute('onclick', 'apagarMensagem(this)')
    let opcoes = document.createElement('div')
    opcoes.append(editar, excluir)
    let blocoMensagem = document.createElement('li') //Div toda
    blocoMensagem.append(divMensagem, opcoes)
    blocoMensagem.setAttribute('id', 'block' + blockMsgId)  //Pra linkar o blocoMensagem com o excluir e editar
    blockMsgId += 1
    //==========ESTILIZANDO A DIV TODA===========
    divMensagem.classList.add('divMessage')  //No css, está como se fosse classe, mas aqui não precisa botar o . antes do nome da classe
    editar.classList.add('edit')
    excluir.classList.add('delete')
    opcoes.classList.add('options')
    blocoMensagem.classList.add('msgContainer')
    let chat = document.querySelector('#chat')
    chat.prepend(blocoMensagem)  
}

function apagarMensagem(btn) {
    //console.log($(this).attr('class'))
    var apagouid = btn.id
    console.log(apagouid)
    if (editando) {
        if (editandoid == apagouid) {
            let blockMsg = document.querySelector('#' + btn.id)
            blockMsg.remove()
            let opcoesEdicao = document.querySelector('.div_options')
            opcoesEdicao.innerHTML = ''
            let enviar = document.querySelector('#sendButton')
            enviar.style.display = 'flex'
            let input = document.querySelector('#type')
            input.value = ''
        }
        else {
            let blockMsg = document.querySelector('#' + btn.id)
            blockMsg.remove()
        }
    }
    else {
        let blockMsg = document.querySelector('#' + btn.id)
        blockMsg.remove()
    }
}

function editarMensagem(btn) {
    let input = document.querySelector('#type')
    //input.style.width = '25.2rem'
    let blockMsg = document.querySelector('#' + btn.id)
    divMensagem = blockMsg.firstElementChild
    input.value = divMensagem.innerText
    let enviar = document.querySelector('#sendButton')
    enviar.style.display = 'none'
    let confirmar = document.createElement('button')
    confirmar.innerText = 'Confirmar'
    confirmar.classList.add('confirm')
    let cancelar = document.createElement('button')
    cancelar.innerText = 'Cancelar'
    cancelar.classList.add('cancel')
    let opcoesEdicao = document.querySelector('.div_options')
    opcoesEdicao.innerHTML = ''
    opcoesEdicao.classList.add('div_options')
    opcoesEdicao.append(confirmar, cancelar)
    //let bottom = document.querySelector('#bottom')
    //bottom.append(opcoesEdicao)
    editando = true
    editandoid = btn.id
    console.log(editandoid)
    confirmar.addEventListener('click', ()=>botaoConfirmar(btn))
    cancelar.addEventListener('click', ()=>botaoCancelar(btn))
    
}

function botaoConfirmar(btn) {
    let input = document.querySelector('#type')
    if (input.value === '') {
        alert('ERRO.\nMensagem vazia')
        return
    }
    let blockMsg = document.querySelector('#' + btn.id)
    divMensagem = blockMsg.firstElementChild
    let paragrafo = document.createElement('p')
    paragrafo.innerText = input.value
    divMensagem.append(paragrafo)
    divMensagem.firstElementChild.remove()
    input.value = ''
    let opcoesEdicao = document.querySelector('.div_options')
    opcoesEdicao.innerHTML = ''
    let enviar = document.querySelector('#sendButton')
    enviar.style.display = 'flex'
    editando = false
}

function botaoCancelar(btn) {
    let input = document.querySelector('#type')
    input.value = ''
    let opcoesEdicao = document.querySelector('.div_options')
    opcoesEdicao.innerHTML = ''
    let enviar = document.querySelector('#sendButton')
    enviar.style.display = 'flex'
    editando = false
}

var blockMsgId = 0
var editando = false
var editandoid = 'block'

let sendButton = document.querySelector('#sendButton')
sendButton.addEventListener('click', ()=>enviarMensagem())

/*let editButton = document.querySelector('#')
editButton.addEventListener('click', ()=>editarMensagem())

window.onclick = e => {
    console.log(e.target.id)
}*/