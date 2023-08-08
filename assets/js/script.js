import { Pessoa } from "./Pessoa.js";

const person1 = new Pessoa('Fulano', 18);
const person2 = new Pessoa('Ciclano', 27);
const person3 = new Pessoa('Beltrano', 31);
const person4 = new Pessoa('Joquebede', 28);
const person5 = new Pessoa('Moshé', 82);
const person6 = new Pessoa('Debinhas', 22);
const person7 = new Pessoa('Jodebergues', 64);
const person8 = new Pessoa('Shonos', 15);
const person9 = new Pessoa('Deres', 28);
const person10 = new Pessoa('Ciclano', 45);

const listaPessoas = new Array(person1, person2, person3, person4, person5, person6, person7, person8, person9, person10);

let idParaExcluir = [];

function excluir(id){
    for(let identificador of id){
        let index = listaPessoas.findIndex(pessoa => pessoa.id == identificador);
        listaPessoas.splice(index, 1);
    }
}

const hamburguer = document.querySelector('.hamburguer');
const menu = document.querySelector('.menu');

hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('clicked');
})

document.addEventListener('click', e => {
    if(e.target.parentElement != hamburguer && e.target != hamburguer && e.target != menu){
        hamburguer.classList.remove('clicked');
    }
})

// AÇÕES CAMPO PESQUISA
const formSearch = document.querySelector('.formSearch');
formSearch.addEventListener('submit', e => e.preventDefault());

const nomePesquisado = document.getElementById('nomePesquisado');
const btnLupa = document.getElementById('btnLupa');

nomePesquisado.addEventListener('keyup', () => mostrar());
btnLupa.addEventListener('click', () => nomePesquisado.focus());

function mostrar(){
    let palavraPesquisada = nomePesquisado.value.trim();
    let li = document.querySelectorAll('li');
    let semResultado = 0;
    for(let pos of li){
        if(!pos.innerHTML.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(palavraPesquisada.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) && palavraPesquisada){
            pos.style.display = 'none';
            semResultado++;
            semResultado == li.length ? (notResultAlert.style.display = 'inline-block', notResultAlert.innerHTML = `Nenhum resultado encontrado para "<b><i class="italic">${palavraPesquisada}</i></b>" 😕`) : notResultAlert.style.display = 'none';
        }  
        else {
            pos.style.display = 'list-item';
            notResultAlert.style.display = 'none';
        }
    }
}

const btnResetSearch =document.getElementById('btnResetSearch');
btnResetSearch.addEventListener('click', () => hiddenNotResultAlert());

function hiddenNotResultAlert(){
    nomePesquisado.value = '';
    mostrar();
}

const notResultAlert = document.getElementById('notResultAlert');
const table = document.querySelector('.table');

window.onload = () => renderizar();

let checkbox, radio;

function renderizar(){
    const elements = listaPessoas.map((pessoa, index) => {
        return `<li><input class="inpCheckbox" type="checkbox" id="${pessoa.id}"><input class="inpRadio" type="radio" name="option" id="${pessoa.id}"><span class="dados"> ${index + 1}) ID: ${pessoa.id} __ Nome: ${pessoa.nome} __ Idade: ${pessoa.idade} anos</span></li> `
    })

    table.innerHTML = `<ul>${elements.join('')}</ul>`;
    checkbox = document.querySelectorAll('.inpCheckbox'); 
    radio = document.querySelectorAll('.inpRadio');
    nomePesquisado.value = '';
}

const btnExcluir = document.getElementById('btnExcluir');
const btnExpansiveDelete = document.querySelector('#btnExpansiveDelete');
const btnAlterar = document.getElementById('btnAlterar');
const btnExpansiveAdd = document.querySelector('#btnExpansiveAdd');
const btnAdd = document.getElementById('btnAdd');
const btnsAddRemove = document.querySelector('.btnsAddRemove');
const fieldBtnDelete = document.querySelector('.fieldBtnDelete');
const fieldBtnChanging = document.querySelector('.fieldBtnChanging');

function checado(){
    for(let id of checkbox){
        if(id.checked){
            idParaExcluir.push(id.getAttribute('id'));
        }
    }
}

let idForChanges;

function showRadioSelected(resultado, id){
    if(resultado){
        for(let pessoa of listaPessoas){
            if(pessoa.id == id){
                campoNome.value = pessoa.nome;
                campoIdade.value = pessoa.idade;
                idForChanges = id;
            }
        }
        formAdd = false;
        addUserScreen.classList.add('visible');
        firstScreen.classList.add('none');
        searchContainer.classList.add('none');
    } else {
        modalForDelete.classList.add('visible');
        infoPopup.innerText = 'Escolha um usuário';
    }
}

function radioSected(showRadioSelected){
    for(let el of radio){
        if(el.checked){
            let id = el.getAttribute('id');
            showRadioSelected(true, id);
            return;
        } 
    }
    showRadioSelected(false);
}

function inputsCheckbox(comando){
    for(let element of checkbox){
        if(comando){
            element.classList.add('visible');
        } else {
            element.checked = false;
            setTimeout(() => {
                element.classList.remove('visible');
            }, 500)
        }
    }
}

function showRadios(comando){
    for(let element of radio){
        if(comando){
            element.classList.add('visible');
        } else {
            element.checked = false;
            element.classList.remove('visible');
        }
    }
}

btnExcluir.addEventListener('click', () => {
    setTimeout(() => {
        btnExpansiveDelete.classList.add('open');
    }, 300);
    setTimeout(() => {
        btnsAddRemove.classList.add('none');
        fieldBtnDelete.classList.add('open');
        btnExpansiveDelete.classList.remove('open');
        inputsCheckbox(true);
    }, 1200)
})

btnAlterar.addEventListener('click', () => {
    btnsAddRemove.classList.add('none');
    fieldBtnChanging.classList.add('visible');
    btnExpansiveDelete.classList.remove('open');
    showRadios(true);
})

const btnIniciarAlteracao = document.getElementById('btnIniciarAlteracao');

btnIniciarAlteracao.addEventListener('click', () => {
    radioSected(showRadioSelected);
    btnSalvarAlteracao.classList.add('visible');
    btnSalvar.classList.add('none');
})

const firstScreen = document.querySelector('.firstScreen');
const searchContainer = document.querySelector('.searchContainer');
const addUserScreen = document.querySelector('.addUserScreen');

btnAdd.addEventListener('click', () => {
    setTimeout(() => {
        btnExpansiveAdd.classList.add('open');
    }, 300)
    setTimeout(() => {
        firstScreen.classList.add('none');
        addUserScreen.classList.add('visible');
        searchContainer.classList.add('none');
        }, 1200);
})

function closeFieldBtnDelete(){
    fieldBtnDelete.classList.remove('open');
    btnsAddRemove.classList.remove('none');
}

const btnCancelar = document.getElementById('btnCancelar');
const btnCancelarAlteracao = document.getElementById('btnCancelarAlteracao');

btnCancelar.addEventListener('click', () => cancelar());
btnCancelarAlteracao.addEventListener('click', () => cancelar());

function cancelar(){
    inputsCheckbox(false);
    showRadios(false);
    setTimeout(() => {
        closeFieldBtnDelete();
        fieldBtnChanging.classList.remove('visible');
        idParaExcluir = [];
        formAdd = true;
        btnSalvarAlteracao.classList.remove('visible');
        btnSalvar.classList.remove('none');
        renderizar();
        hiddenNotResultAlert()
    }, 550)
}

// Modal para não conclusão de exclusão
const modalForDelete = document.querySelector('.modalForDelete');
const btnOkNotDeleted = document.getElementById('btnOkNotDeleted');
const infoPopup = document.getElementById('infoPopup');
const btnConfirmar = document.getElementById('btnConfirmar');

btnConfirmar.addEventListener('click', () => confirmar());

function confirmar(){
    checado();
    if(idParaExcluir.length > 0){
        closeFieldBtnDelete();
        inputsCheckbox(false);
        excluir(idParaExcluir)
        renderizar();
        idParaExcluir = [];
        infoPopup.innerText = 'Excluido';
    } else {
        infoPopup.innerText = 'Selecione para excluir';
    }
    modalForDelete.classList.add('visible');
}

btnOkNotDeleted.addEventListener('click', () => modalForDelete.classList.remove('visible'));

// FORMULÁRIO DE ADD USUÁRIO
const form = document.querySelector('.formUser');
const btnHome = document.getElementById('btnHome');
const btnSalvar = document.getElementById('btnSalvar');
const btnSalvarAlteracao = document.getElementById('btnSalvarAlteracao');

form.addEventListener('submit', (e) => e.preventDefault());

let formAdd = true;

btnHome.addEventListener('click', () => {
        btnExpansiveAdd.classList.remove('open');
        firstScreen.classList.remove('none');
        addUserScreen.classList.remove('visible');
        searchContainer.classList.remove('none');
        campoNome.value = '';
        campoIdade.value = '';
        hiddenNotResultAlert();
})

const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const modal = document.querySelector('.modal');
const btnOkConfirmado = document.getElementById('btnOkConfirmado');
const infoConfirmed = document.getElementById('infoConfirmed');

let podeSalvar = true;

btnSalvar.addEventListener('click', () => {
    let nome = campoNome.value.trim();
    let idade = Number(campoIdade.value);
    if(nome && nome.length > 0 && idade && idade > 0 && Number.isInteger(idade) && formAdd){
        const person = new Pessoa(nome, idade);
        listaPessoas.push(person);        
        modal.classList.add('visible');
        infoConfirmed.innerText = 'Confirmado';
        podeSalvar = true;
    }
})

btnSalvarAlteracao.addEventListener('click', () => {
    let nome = campoNome.value.trim();
    let idade = Number(campoIdade.value);
    if(nome && nome.length > 0 && idade && idade > 0 && Number.isInteger(idade)){
        let indice = listaPessoas.findIndex(pessoa => pessoa.id == idForChanges);
        if(listaPessoas[indice].nome != nome || listaPessoas[indice].idade != idade){
            infoConfirmed.innerText = 'Confirmado';
            listaPessoas[indice].nome = nome;
            listaPessoas[indice].idade = idade;
            podeSalvar = true;
        } else {
            infoConfirmed.innerText = 'Nenhuma alteração feita';
            podeSalvar = false;
        }
        modal.classList.add('visible');
    }
})

btnOkConfirmado.addEventListener('click', () => {
    if(podeSalvar){
        btnHome.click();
        renderizar();
        campoNome.value = '';
        campoIdade.value = '';
        modal.classList.remove('visible');
        
        btnsAddRemove.classList.remove('none');
        fieldBtnChanging.classList.remove('visible');
        btnExpansiveDelete.classList.remove('open');
        showRadios(false);
        btnSalvarAlteracao.classList.remove('visible');
        btnSalvar.classList.remove('none');
        searchContainer.classList.remove('none');
        formAdd = true;
        hiddenNotResultAlert();
    } else {
        modal.classList.remove('visible');
    }
})