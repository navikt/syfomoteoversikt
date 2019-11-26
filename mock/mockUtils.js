const fs = require('fs');
const path = require('path');

const readDataFromJsonFile = (filename) => {
    const rawData = fs.readFileSync(path.join(__dirname, `/Data/${filename}`));
    return JSON.parse(rawData.toString());
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const randomChoice = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const generatePerson = () => {
    const e = ['Banan', 'Eple', 'Fersken', 'Rambutan', 'Durian', 'Stjernefrukt', 'Tomat', 'Drue', 'Vannmelon', 'Nektarin', 'Mandarin', 'Persimon'];
    const f = ['Rød', 'Gul', 'Blå', 'Grønn', 'Rosa', 'Oransje', 'Sort', 'Lilla', 'Hvit', 'Turkis', 'Fiolett', 'Infrarød'];

    const navn = `${randomChoice(f)} ${randomChoice(e)}`;
    const fnr = getRandomInt(31999999999).toString().padStart(11, '0');

    return {
        navn,
        fnr,
        skjermingskode: 'INGEN',
    };
};

const generatePersons = (amount) => new Array(amount).fill({}).map(_ => generatePerson());


const veiledere = readDataFromJsonFile('veiledere.json');
const veilederInfo = readDataFromJsonFile('veilederInfo.json');
const enheter = readDataFromJsonFile('enheter.json')
const aktivEnhet = readDataFromJsonFile('aktivEnhet.json');
const virksomhetsInfo = readDataFromJsonFile('virksomhetsInfo.json');
const brukerInfo = readDataFromJsonFile('brukerInfo.json');
const fnrInfo = readDataFromJsonFile('fnrInfo.json');
const moter = readDataFromJsonFile('moter.json');

module.exports = {
    generatePersons: generatePersons,
    veiledere: veiledere,
    veilederInfo: veilederInfo,
    enheter: enheter,
    aktivEnhet: aktivEnhet,
    virksomhetsInfo: virksomhetsInfo,
    brukerInfo: brukerInfo,
    fnrInfo: fnrInfo,
    moter: moter
};

