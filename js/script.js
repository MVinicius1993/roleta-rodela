import champion from "../datadragon/champion.json" assert { type: "json" }
import position from "../datadragon/positions.json" assert { type: "json" }
import item from "../datadragon/item.json" assert { type: "json" }

main();

let itemsInfo;
let championsPositions;
let championsPool1;
let championsPool2;
let numeroFinalRodil;
let numeroFinalTibinha;
let desafios;
let isLocal = false

let index = 0;
const delay1 = 150;
const delay2 = 200;
const delay3 = 250;
const delay4 = 300;
const finalDelay = 5000;

async function main() {
    const championsInfo = await getChampionsInfo();
    const positionsInfo = await getPositionsInfo();

    itemsInfo = await getItems();
    championsPositions = await setChampionsPositions(championsInfo, positionsInfo)
    desafios = generateUniqueRandomNumbers(1, 9)
}

async function getChampionsInfo() {
    return champion.data;
}

async function getPositionsInfo() {
    return position.data;
}

async function getItems() {
    const filteredItems = []
    Object.values(item.data).forEach(item => {
        if(item.gold.total > 2199 && item.maps[11] === true) return filteredItems.push(item)
    })
    return filteredItems;
}

async function setChampionsPositions(champions, positions) {
    let role = [];

    for (const champ of Object.keys(champions)) {
        for (const position of Object.keys(positions[champions[champ].key])) {
            if(positions[champions[champ].key][position].playRate > 0.5) {
                role.push(position)
            }
        }
        champions[champ].ROLES = role;
        role = [];
    }

    return champions;
}

async function roleSelectedRodil(evt) {
    const topSelected = document.getElementById('inlineCheckbox1').checked;
    const jungleSelected = document.getElementById('inlineCheckbox2').checked;
    const midSelected = document.getElementById('inlineCheckbox3').checked;
    const botSelected = document.getElementById('inlineCheckbox4').checked;
    const supportSelected = document.getElementById('inlineCheckbox5').checked;

    const topChampions = await getTopChampions();
    const jungleChampions = await getJungleChampions();
    const midChampions = await getMidChampions();
    const botChampions = await getBotChampions();
    const supportChampions = await getSupportChampions();

    let championsRools = [];

    if(topSelected) championsRools = championsRools.concat(topChampions)
    if(jungleSelected) championsRools = championsRools.concat(jungleChampions)
    if(midSelected) championsRools = championsRools.concat(midChampions)
    if(botSelected) championsRools = championsRools.concat(botChampions)
    if(supportSelected) championsRools = championsRools.concat(supportChampions)

    const divChampions = document.getElementById('champions')
    divChampions.innerHTML = ''

    for (const [index, champ] of championsRools.entries()) {
        const champion = document.createElement("img");
        champion.src = `${isLocal ? '..' : 'https://mvinicius1993.github.io/roleta-rodela'}/datadragon/imagens/champions/${champ.id}_0.jpg`;
        champion.id = `rodil-${champ.key}`;
        champion.style.paddingLeft = '40px'
        champion.classList.add( index > 0 ? 'notSelected' : 'selected')
        divChampions.appendChild(champion)
    }

    championsPool1 = championsRools;
}

async function roleSelectedTibinha(evt) {
    const topSelected = document.getElementById('inlineCheckbox6').checked;
    const jungleSelected = document.getElementById('inlineCheckbox7').checked;
    const midSelected = document.getElementById('inlineCheckbox8').checked;
    const botSelected = document.getElementById('inlineCheckbox9').checked;
    const supportSelected = document.getElementById('inlineCheckbox10').checked;

    const topChampions = await getTopChampions();
    const jungleChampions = await getJungleChampions();
    const midChampions = await getMidChampions();
    const botChampions = await getBotChampions();
    const supportChampions = await getSupportChampions();

    let championsRools = [];

    if(topSelected) championsRools = championsRools.concat(topChampions)
    if(jungleSelected) championsRools = championsRools.concat(jungleChampions)
    if(midSelected) championsRools = championsRools.concat(midChampions)
    if(botSelected) championsRools = championsRools.concat(botChampions)
    if(supportSelected) championsRools = championsRools.concat(supportChampions)

    const divChampions = document.getElementById('champions2')
    divChampions.innerHTML = ''

    for (const [index, champ] of championsRools.entries()) {
        const champion = document.createElement("img");
        champion.src = `${isLocal ? '..' : 'https://mvinicius1993.github.io/roleta-rodela'}/datadragon/imagens/champions/${champ.id}_0.jpg`;
        champion.id = `tibinha-${champ.key}`;
        champion.style.paddingLeft = '40px'
        champion.classList.add( index > 0 ? 'notSelected' : 'selected')
        divChampions.appendChild(champion)
    }

    championsPool2 = championsRools;
}

async function getTopChampions() {
    let champions = []

    for (const champ of Object.keys(championsPositions)) {
        if(championsPositions[champ].ROLES.includes('TOP')) champions.push(championsPositions[champ])
    }

    return champions;
}

async function getJungleChampions() {
    let champions = []

    for (const champ of Object.keys(championsPositions)) {
        if(championsPositions[champ].ROLES.includes('JUNGLE')) champions.push(championsPositions[champ])
    }

    return champions;
}

async function getMidChampions() {
    let champions = []

    for (const champ of Object.keys(championsPositions)) {
        if(championsPositions[champ].ROLES.includes('MIDDLE')) champions.push(championsPositions[champ])
    }

    return champions;
}

async function getBotChampions() {
    let champions = []

    for (const champ of Object.keys(championsPositions)) {
        if(championsPositions[champ].ROLES.includes('BOTTOM')) champions.push(championsPositions[champ])
    }

    return champions;
}

async function getSupportChampions() {
    let champions = []

    for (const champ of Object.keys(championsPositions)) {
        if(championsPositions[champ].ROLES.includes('UTILITY')) champions.push(championsPositions[champ])
    }

    return champions;
}

async function rodilRoll() {
    const numeros = championsPool1.map(e => parseInt(e.key));

    const divChampions = document.getElementById('champions')

    var children = divChampions.children;

    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove('selected');
        children[i].classList.add('notSelected');
    }

    for (const numId of numeros) {
        document.getElementById(`rodil-${numeroFinalRodil}`)?.classList.add('notSelected');
        document.getElementById(`rodil-${numeroFinalRodil}`)?.classList.remove('selected');
        document.getElementById('rodilRoll').disabled = true
    }
    
    function atualizarClasse(indexAtual, indexProximo) {
        if (numeros[indexAtual] !== undefined) {
            const elementoAtual = document.getElementById(`rodil-${numeros[indexAtual]}`);
            elementoAtual?.classList.add('notSelected');
            elementoAtual?.classList.remove('selected');
        }

        if (numeros[indexProximo] !== undefined) {
            const elementoProximo = document.getElementById(`rodil-${numeros[indexProximo]}`);
            elementoProximo?.classList.remove('notSelected');
            elementoProximo?.classList.add('selected');
        }
    }

    function iniciarIntervalo(tempo, proximoDelay) {
        return setInterval(() => {
            const proximoIndex = (index + 1) % numeros.length;
            atualizarClasse(index, proximoIndex);
            index = proximoIndex;
        }, tempo);
    }

    const intervalo1 = iniciarIntervalo(delay1, delay2);

    setTimeout(() => {
        clearInterval(intervalo1);
        const intervalo2 = iniciarIntervalo(delay2, delay3);

        setTimeout(() => {
            clearInterval(intervalo2);
            const intervalo3 = iniciarIntervalo(delay3, delay4);

            setTimeout(() => {
                clearInterval(intervalo3);
                const intervalo4 = iniciarIntervalo(delay4, finalDelay);

                setTimeout(() => {
                    clearInterval(intervalo4);
                    for (const numId of numeros) {
                        const elemento = document.getElementById(`rodil-${numId}`);
                        elemento?.classList.remove('selected');
                        elemento?.classList.add('notSelected');
                    }

                    const numeroFinal = numeros[Math.floor(Math.random() * numeros.length)];
                    const elementoFinal = document.getElementById(`rodil-${numeroFinal}`);
                    elementoFinal?.classList.add('selected');
                    elementoFinal?.classList.remove('notSelected');
                    numeroFinalRodil = numeroFinal;
                    document.getElementById('rodilRoll').disabled = false;
                }, finalDelay);
            }, 1000);
        }, 1000);
    }, 1000);
}

async function tibinhaRoll() {
    const numeros = championsPool2.map(e => parseInt(e.key));

    const divChampions = document.getElementById('champions2')

    var children = divChampions.children;

    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove('selected');
        children[i].classList.add('notSelected');
    }

    for (const numId of numeros) {
        document.getElementById(`tibinha-${numeroFinalTibinha}`)?.classList.add('notSelected');
        document.getElementById(`tibinha-${numeroFinalTibinha}`)?.classList.remove('selected');
        document.getElementById('tibinhaRoll2').disabled = true
    }
    
    function atualizarClasse(indexAtual, indexProximo) {
        if (numeros[indexAtual] !== undefined) {
            const elementoAtual = document.getElementById(`tibinha-${numeros[indexAtual]}`);
            elementoAtual?.classList.add('notSelected');
            elementoAtual?.classList.remove('selected');
        }

        if (numeros[indexProximo] !== undefined) {
            const elementoProximo = document.getElementById(`tibinha-${numeros[indexProximo]}`);
            elementoProximo?.classList.remove('notSelected');
            elementoProximo?.classList.add('selected');
        }
    }

    function iniciarIntervalo(tempo, proximoDelay) {
        return setInterval(() => {
            const proximoIndex = (index + 1) % numeros.length;
            atualizarClasse(index, proximoIndex);
            index = proximoIndex;
        }, tempo);
    }

    const intervalo1 = iniciarIntervalo(delay1, delay2);

    setTimeout(() => {
        clearInterval(intervalo1);
        const intervalo2 = iniciarIntervalo(delay2, delay3);

        setTimeout(() => {
            clearInterval(intervalo2);
            const intervalo3 = iniciarIntervalo(delay3, delay4);

            setTimeout(() => {
                clearInterval(intervalo3);
                const intervalo4 = iniciarIntervalo(delay4, finalDelay);

                setTimeout(() => {
                    clearInterval(intervalo4);
                    for (const numId of numeros) {
                        const elemento = document.getElementById(`tibinha-${numId}`);
                        elemento?.classList.remove('selected');
                        elemento?.classList.add('notSelected');
                    }

                    const numeroFinal = numeros[Math.floor(Math.random() * numeros.length)];
                    const elementoFinal = document.getElementById(`tibinha-${numeroFinal}`);
                    elementoFinal?.classList.add('selected');
                    elementoFinal?.classList.remove('notSelected');
                    numeroFinalTibinha = numeroFinal;
                    document.getElementById('tibinhaRoll2').disabled = false;
                }, finalDelay);
            }, 1000);
        }, 1000);
    }, 1000);
}

function generateUniqueRandomNumbers(min, max) {
    const numbers = [];
    
    // Preencher o array com números de min a max
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }
    
    // Embaralhar o array
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Troca os elementos
    }
    
    return numbers;
}

function revelarDesafio() {

    const itemSort = itemsInfo[Math.floor(Math.random() * itemsInfo.length)]; 

    const desafiosText = [
        {text: "Trocar hotkey do Flash com a Ultimate", id: '1'},
        {text: "Não pode usar Smite", id: '2'},
        {text: "Inverter lane com o tibinha", id: '3'},
        {text: "Não pode gankar o tibinha", id: '4'},
        {text: `Voce tem que buildar ${itemSort.name}  <img style="width: 30px" src='${isLocal ? '..' : 'https://mvinicius1993.github.io/roleta-rodela'}/datadragon/imagens/item/${itemSort.image.full}'/>`, id: '5'},
        {text: "Divar uma lane AGORA", id: '6'},
        {text: "Camera fixa", id: '7'},
        {text: "Não pode wardar nem usar trincket", id: '8'},
        {text: "Tibinha não pode sair da top side", id: '9'},
        {text: "A cada 5 minutos o tibinha se mata", id: '10'},
        {text: "A cada 5 minutos o rodil se mata na top lane", id: '11'}
    ]

    const htmlDesafios = document.getElementById('desafios');
    
    // Obter todos os spans existentes
    const existingSpans = Array.from(htmlDesafios.getElementsByTagName('span'));
    
    // Obter IDs dos desafios já exibidos
    const existingIds = existingSpans.map(span => parseInt(span.id.split('-')[1]));
    
    // Filtrar desafios não exibidos
    const availableDesafios = desafiosText.filter(desafio => !existingIds.includes(parseInt(desafio.id)));
    
    if (availableDesafios.length === 0) {
        console.log("Todos os desafios já foram exibidos.");
        return;
    }
    
    // Escolher um desafio aleatório
    const randomIndex = Math.floor(Math.random() * availableDesafios.length);
    const selectedDesafio = availableDesafios[randomIndex];
    
    // Criar e adicionar o novo span
    const span = document.createElement('span');
    span.innerHTML = selectedDesafio.text.toUpperCase();
    span.style.height = '50px'
    span.classList.add('desafioSpan')
    span.id = `desafio-${selectedDesafio.id}`; // Atribuir um ID único ao span
    htmlDesafios.appendChild(span);
}

window.roleSelectedRodil = roleSelectedRodil
window.roleSelectedTibinha = roleSelectedTibinha
window.rodilRoll = rodilRoll
window.tibinhaRoll = tibinhaRoll
window.revelarDesafio = revelarDesafio  