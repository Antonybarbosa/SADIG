const datefns = require("date-fns");
const ParseDate = require("date-fns/parse");
const fr = require('date-fns/locale/fr')

data = new Date();

console.log('Hoje é: ' + data.toLocaleString());

dataAtual = data.setDate(data.getDate() - 14);
console.log(data.toLocaleString())
//dataAtual = datefns.format(dataAtual, "yyyyMMdd")
console.log(ParseDate(data.toLocaleString(), "yyyyMMdd", new Date(),{locale: fr} ))

