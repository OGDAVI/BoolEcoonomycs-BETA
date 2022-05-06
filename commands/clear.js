module.exports = {
  name: "clear",
  aliases: ["limpar", "purge"],
  run: async (client, message, args, db) => {
    let amount = parseInt(args[0]);
    let deleted = 0;
    if (isNaN(amount) || amount < 1) return message.channel.send(`❌ ${message.author} quantidade invalida!`);
    amount = amount + 1;
    async function clear() {
      let deletar = amount > 100 ? 100 : amount;
      let u = await message.channel.bulkDelete(deletar, true);
      deleted += +u.size;
      amount = amount - deletar;
      if (amount > 0)
        setTimeout(function () {
          clear();
        }, 1000);
      else message.channel.send(`🗑️ ${message.author} ${deleted.toLocaleString()} mensagens deletadas com sucesso!`);
    }
    if (amount > 100) clear();
    else {
      let u = await message.channel.bulkDelete(amount, true);
      deleted = u.size;
      message.channel.send(`🗑️ ${message.author} ${deleted.toLocaleString()} mensagens deletadas com sucesso!`);
    }
  }
}