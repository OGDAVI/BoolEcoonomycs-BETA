const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  config: {
    name: "pay",
    noalias: [""],
    category: "economia",
    description: "Pague a Alguém",
    
  },
  run: async (bot, message, args) => {

  let user2 = message.author
    if (!args[0]) return message.channel.send("**Mencione um usuário!**");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**Mencione um usuário válido!**");

    let member = db.fetch(`money_${user2.id}`);

    const embed1 = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription(`❌ **Mencione alguém para pagar.**`);

    if (!args[0]) {
      return message.channel.send({ embeds: [embed1] })
    }
    const embed2 = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription(`❌ **Você não pode pagar a si mesmo.**`);

    if (user.user.id === message.author.id) {
      return message.channel.send({ embeds: [embed2] })
    }

    const embed3 = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription(`❌ **Especifique um valor a pagar.**`);

    if (!args[1]) {
      return message.channel.send({ embeds: [embed3] })
    }
    const embed4 = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription(`⚠️ **Insira um valor válido!**`);

    if (isNaN(args[1])) {
      return message.channel.send({ embeds: [embed4] })
    }
    const embed5 = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription(`❌ **Você não tem essa quantia!**`);

    if (member < args[1]) {
      return message.channel.send({ embeds: [embed5] })
    }
      
      const row = new Discord.MessageActionRow();

    const yes = new Discord.MessageButton()
      .setCustomId("yes")
      .setLabel("Enviar")
      .setStyle("SUCCESS")
      .setDisabled(false);

    const no = new Discord.MessageButton()
      .setCustomId("no")
      .setLabel("Cancelar")
      .setStyle("DANGER")
      .setDisabled(false);

    row.addComponents([yes, no]);

    const msg = await message.reply({
      content: `${message.author}, Você deseja enviar **${args[1]}** Cookies para ${user}?`,
      components: [row],
    });

    let collect;

    const filter = (interaction) => {
      return interaction.isButton() && interaction.message.id === msg.id;
    };

    const collector = msg.createMessageComponentCollector({
      filter: filter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id != message.author.id)
        return i.reply({
          content: `Você não executou o comando para poder usar os botões.`,
          ephemeral: true,
        });

      collect = i;

      switch (i.customId) {
        case "yes": {
          message.reply(`Pagamento Realizado Com Sucesso, ${message.author} Enviou **${args[1]}** Para ${user}!`);

          msg.delete();
          break;
        }

        case "no": {
          msg.delete();

          return message.reply(
            `${message.author}, cancelado, o pagamento nao foi realizado.`
          );
        }
      }
    });

    collector.on("end", (i) => {
      if (collect) return;
      i.update({ components: [] });
    });

    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${user2.id}`, args[1]);
    
    }
}