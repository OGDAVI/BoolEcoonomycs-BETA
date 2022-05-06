const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.channel.send(` ${message.author}, você tem que ter a permissão de **Administrador** para usar esse comando!`);
    };

    let user = message.mentions.users.first();

    if (!user) {
        return message.channel.send(` ${message.author}, você precisa mencionar um usuário para adicionar o Dinheiro!`);
    };

    if (isNaN(args[1])) {
        return message.channel.send(` ${message.author}, você precisa colocar um numero valido!`);
    };

    db.add(`money_${user.id}`, args[1]);
    let money = await db.fetch(`money_${user.id}`)

    const embed = new Discord.MessageEmbed()
    .setTitle(":dollar: **|** Cookies adicionado!")
    .setColor("#000001")
    .setDescription(`Foi adicionado **$${args[1]}** para ${user}!\n\n:dollar: Dinheiro Atual: **R$${money}**`)
    .setFooter(`Cookies foi adicionado!`);
    message.reply({embeds:[embed]})
}
module.exports.help = {
    name: "setmoney",
    aliases: ["add"]
    }