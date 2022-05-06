const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setColor("WHITE")
.setDescription(`**Veja meus comandos :**\n **Atm** \n **Botinfo** \n **Clear** \n **Daily** \n **Pay** \n **Ping** \n **Ship** \n **Userinfo** \n **Work**`)
message.reply({embeds:[embed]})

}
module.exports.help = {
    name: "help",
    aliases: ["comandos"]
    }