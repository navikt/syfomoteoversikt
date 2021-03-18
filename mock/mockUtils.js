const fs = require("fs");
const path = require("path");

const readDataFromJsonFile = (filename) => {
  const rawData = fs.readFileSync(path.join(__dirname, `/Data/${filename}`));
  return JSON.parse(rawData.toString());
};

const veiledere = readDataFromJsonFile("veiledere.json");
const veilederInfo = readDataFromJsonFile("veilederInfo.json");
const virksomhetsInfo = readDataFromJsonFile("virksomhetsInfo.json");
const brukerInfo = readDataFromJsonFile("brukerInfo.json");
const fnrInfo = readDataFromJsonFile("fnrInfo.json");
const moter = readDataFromJsonFile("moter.json");

module.exports = {
  veiledere: veiledere,
  veilederInfo: veilederInfo,
  virksomhetsInfo: virksomhetsInfo,
  brukerInfo: brukerInfo,
  fnrInfo: fnrInfo,
  moter: moter,
};
