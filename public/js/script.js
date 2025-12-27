let devsData = [];
let botaoPesquisar = document.getElementById('botao-pesquisar');

async function fetchDevs(){

 const res = await fetch('/all/devs');
 return await res.json();
}


function addDev(dev){

const card = document.createElement('div');
card.className = 'card';

const img = document.createElement('img');
img.src = dev.img;
img.alt = 'Dev';

const h3 = document.createElement('h3');
h3.textContent = dev.nome;

const p = document.createElement('p');
p.textContent = dev.skills;

const button = document.createElement('button');
button.textContent = 'Ver Perfil';

card.append( img, h3, p, button)
 return card;
}

const devsContainer = document.querySelector('.devs');

function renderDevs(lista){
    devsContainer.innerHTML = '';
    lista.forEach(dev =>{
        const devCard = addDev(dev);
        devsContainer.appendChild(devCard);
    })

}

async function init(){
    devsData = await fetchDevs();
    renderDevs(devsData);
}

const inputSearch = document.getElementById('search');

inputSearch.addEventListener('input', () => {
    const Termo = inputSearch.value.trim().toLowerCase();

    if(Termo === ''){
        renderDevs(devsData);
        return;
    }

    const filtrados = devsData.filter(dev =>
        dev.nome.toLowerCase().includes(Termo) ||
        dev.skills.toLowerCase().includes(Termo)
    );

    renderDevs(filtrados);
    if(filtrados.length === 0){
        devsContainer.innerHTML = '<p>Nenhum desenvolvedor encontrado.</p>';
    }

});

init();
