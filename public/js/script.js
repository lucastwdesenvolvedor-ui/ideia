let devsData = [];
let botaoPesquisar = document.getElementById('botao-pesquisar');

async function fetchDevs(){

 const res = await fetch('/all/produtos');
 return await res.json();
}


function addDev(Produto){

const card = document.createElement('div');
card.className = 'card';

const img = document.createElement('img');
img.src = Produto.imagem_url;
img.alt = 'imagem do produto';

const h3 = document.createElement('h3');
h3.textContent = Produto.produto;

const p = document.createElement('p');
p.textContent = Produto.descricao;

const button = document.createElement('button');
button.textContent = 'Ver Produto';
button.addEventListener('click', () => {
    window.location.href = Produto.link;
});

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

    const filtrados = devsData.fi.lter(dev =>
        dev.nome.toLowerCase().includes(Termo) ||
        dev.skills.toLowerCase().includes(Termo)
    );

    renderDevs(filtrados);
    if(filtrados.length === 0){
        devsContainer.innerHTML = '<p>Nenhum Produto encontrado.</p>';
    }

});

init();
