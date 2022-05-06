const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => { 

if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.channel.send(` ${message.author}, você tem que ter a permissão de **Administrador** para usar esse comando!`)
    };


    let user = message.mentions.users.first();

    if (!user) {
        return message.channel.send(` ${message.author}, você precisa mencionar um usuário para retirar o Dinheiro!`);
    };

    if (isNaN(args[1])) {
        return message.channel.send(` ${message.author}, você precisa colocar um numero valido!`);
    };

    db.subtract(`money_${user.id}`, args[1]);
    let money = await db.fetch(`money_${user.id}`)

    const embed = new Discord.MessageEmbed()
    .setTitle("💵 **|** Cookies removidos!")
    .setColor("#00001")
    .setDescription(`Foi removido **${args[1]}** para ${user}!\n\n💵 Dinheiro Atual: **R$${money}**`)
    .setFooter(`Cookies removidos!`)

    message.reply({embeds:[embed]})
}
module.exports.help = {
    name: "submoney",
    aliases: ["add"]
    }