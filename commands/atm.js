const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {

let money = await db.fetch(`money_${message.author.id}`)
if(money === null) money = 0;

const embed = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`💰**・Seus Cookies:** \`${money.toLocaleString()}\`\n \n**CASO QUEIRE COMPRAR COOKIES VENHA PV DO MEU DONO OGDAVI#2889**`)
message.reply({embeds:[embed]})

}
module.exports.help = {
    name: "atm",
    aliases: ["moedas"]
    }