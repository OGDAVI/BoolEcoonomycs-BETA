const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const cooldowns = {}

module.exports =  {
    name: "daily",
    description: "Resgate seu dinheiro diário.",
    type: "CHAT_INPUT",
    
    run: async (client, message, args) => {

        if(!cooldowns[message.author.id])cooldowns[message.author.id]={ lastCmd:null};let ultimoCmd=cooldowns[message.author.id].lastCmd;
        let timeout = ms("1 hour")
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        message.reply({ content: `**Espere \`${time}\` para poder resgatar seu daily novamente!**` });return;}else{cooldowns[message.author.id].lastCmd=Date.now()};

        let quantia = Math.ceil(Math.random()* 20000 );
        db.add(`money_${message.author.id}`, quantia);

        message.reply(`**Você resgatou \`${quantia}\` cookies em seu dinheiro diário.\nUtilize o comando c!atm para ver seu total de moedas**.`)

    }
}