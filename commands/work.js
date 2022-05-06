const {MessageEmbed} = require("discord.js");;
const db = require('quick.db');
const ms = require("pretty-ms");

module.exports = {

    name: "work",
    alises: ['trabalhar'], 

    run: async(client, message, args) => {

        let timeout = 6000000;

        let user = message.author;
        let guild = message.guild;

        function ms(ms) {
            const seconds = ~~(ms/1000)
            const minutes = ~~(seconds/60)
            const hours = ~~(minutes/60) 
            const days = ~~(hours/24)
            
            return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
        
        }

        let author = await db.fetch(`work_${guild.id}_${user.id}`)  

        if (author !== null && timeout - (Date.now() - author) > 0) {
              
            let time = ms(timeout - (Date.now() - author));

            let error = new MessageEmbed()
            .setTitle(`:x: | Calma lá!`)
            .setColor("RED")
            .setDescription(`**:x: | Voce ja trabalhou demais amigão! Aguarde \`${time.minutes} minutos e ${time.seconds} segundos\`**`)
          
             message.reply({embeds: [error]})

        } else {     

            let amount = Math.floor(Math.random() * 5000) + 10000;

            let sucess = new MessageEmbed()
            .setTitle(`🎓 | HORA DE TRABALHAR`)
            .setColor("GREEN")
            .setDescription(`**💸 | Você conseguiu ${amount} de Cookies trabalhando!**`)
            .setFooter(`Comando Executado por: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

            message.reply({embeds: [sucess]})

            db.add(`money_${user.id}`, amount)
            db.set(`work_${guild.id}_${user.id}`, Date.now())

        }
    }
}