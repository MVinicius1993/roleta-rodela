main();

let championsPositions;
let championsPool1;
let championsPool2;
let numeroFinalRodil;
let numeroFinalTibinha;
let desafios;

const challenges = {
    
}

async function main() {
    const championsInfo = await getChampionsInfo();
    const positionsInfo = await getPositionsInfo();

    championsPositions = await setChampionsPositions(championsInfo, positionsInfo)
    desafios = generateUniqueRandomNumbers(1, 9)
}

async function getChampionsInfo() {
    return await fetch('https://github.com/MVinicius1993/roleta-rodela/datadragon/champion.json').then(async (results) => {
        const resultJson = await results.json();
        return resultJson.data;
    });
}

async function getPositionsInfo() {
    return await fetch('https://github.com/MVinicius1993/roleta-rodela/datadragon/positions.json').then(async (results) => {
        const resultJson = await results.json();
        return resultJson.data;
    });
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
        champion.src = `https://mvinicius1993.github.io/roleta-rodela/datadragon/imagens/champions/${champ.id}_0.jpg`;
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
        champion.src = `https://mvinicius1993.github.io/roleta-rodela/datadragon/imagens/champions/${champ.id}_0.jpg`;
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

    for (const numId of numeros) {
        document.getElementById(`rodil-${numeroFinalRodil}`)?.classList.remove('selected');
        document.getElementById(`rodil-${numeroFinalRodil}`)?.classList.add('notSelected');
        document.getElementById('rodilRoll').disabled = true
    }
    
    return new Promise((resolve) => {
        let index = 0;

        const intervalo = setInterval(() => {
            if (numeros[index] !== undefined) {
                document.getElementById(`rodil-${numeros[index]}`)?.classList.add('notSelected');
                document.getElementById(`rodil-${numeros[index]}`)?.classList.remove('selected');
            }

            if (numeros[(index + 1) % numeros.length] !== undefined) {
                document.getElementById(`rodil-${numeros[(index + 1) % numeros.length]}`)?.classList.remove('notSelected');
                document.getElementById(`rodil-${numeros[(index + 1) % numeros.length]}`)?.classList.add('selected');
            }

            // Atualiza o índice
            index = (index + 1) % numeros.length;
        }, 50); // A cada 100 ms

        // Após 3 segundos, para a roleta e escolhe um número final
        setTimeout(() => {
            clearInterval(intervalo);

            for (const numId of numeros) {
                document.getElementById(`rodil-${numId}`)?.classList.remove('selected');
                document.getElementById(`rodil-${numId}`)?.classList.add('notSelected');
            }

            const numeroFinal = numeros[Math.floor(Math.random() * numeros.length)];

            document.getElementById(`rodil-${numeroFinal}`)?.classList.add('selected');
            document.getElementById(`rodil-${numeroFinal}`)?.classList.remove('notSelected');
            numeroFinalRodil = numeroFinal;
            document.getElementById('rodilRoll').disabled = false
        }, 3000); // Tempo total da roleta (3 segundos)
    });
}

async function tibinhaRoll() {
    const numeros = championsPool2.map(e => parseInt(e.key));

    for (const numId of numeros) {
        document.getElementById(`tibinha-$numeroFinalTibinha}`)?.classList.remove('selected');
        document.getElementById(`tibinha-$numeroFinalTibinha}`)?.classList.add('notSelected');
        document.getElementById('tibinhaRoll2').disabled = true
    }
    
    return new Promise((resolve) => {
        let index = 0;

        const intervalo = setInterval(() => {
            if (numeros[index] !== undefined) {
                document.getElementById(`tibinha-${numeros[index]}`)?.classList.add('notSelected');
                document.getElementById(`tibinha-${numeros[index]}`)?.classList.remove('selected');
            }

            if (numeros[(index + 1) % numeros.length] !== undefined) {
                document.getElementById(`tibinha-${numeros[(index + 1) % numeros.length]}`)?.classList.remove('notSelected');
                document.getElementById(`tibinha-${numeros[(index + 1) % numeros.length]}`)?.classList.add('selected');
            }

            // Atualiza o índice
            index = (index + 1) % numeros.length;
        }, 50); // A cada 100 ms

        // Após 3 segundos, para a roleta e escolhe um número final
        setTimeout(() => {
            clearInterval(intervalo);

            for (const numId of numeros) {
                document.getElementById(`tibinha-${numId}`)?.classList.remove('selected');
                document.getElementById(`tibinha-${numId}`)?.classList.add('notSelected');
            }

            const numeroFinal = numeros[Math.floor(Math.random() * numeros.length)];

            document.getElementById(`tibinha-${numeroFinal}`)?.classList.add('selected');
            document.getElementById(`tibinha-${numeroFinal}`)?.classList.remove('notSelected');
            numeroFinalTibinha = numeroFinal;
            document.getElementById('tibinhaRoll2').disabled = false
        }, 3000); // Tempo total da roleta (3 segundos)
    });
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

    const desafiosText = [
        {text: "Trocar hotkey do Flash com a Ultimate", id: '1'},
        {text: "Não pode usar Smite", id: '2'},
        {text: "Inverter lane com o tibinha (tibinha vai pra jungle e vc pro top)", id: '3'},
        {text: "Não pode gankar o tibinha", id: '4'},
        {text: "Voce tem que buildar o item => (random item aqui)", id: '5'},
        {text: "Divar uma lane AGORA", id: '6'},
        {text: "Camera fixa", id: '7'},
        {text: "Não pode wardar nem usar trincket", id: '8'},
        {text: "Tibinha não pode sair da top side (so no rio e top)", id: '9'},
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
    span.innerHTML = selectedDesafio.text;
    span.id = `desafio-${selectedDesafio.id}`; // Atribuir um ID único ao span
    htmlDesafios.appendChild(span);
}