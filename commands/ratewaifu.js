const Discord = require("discord.js");

module.exports = {
  name: "ratewaifu",
  description: "Rates a waifu!",
  aliases: ["rw"],
  usage: ["[waifu's name]"],
  cooldown: 2,
  execute(message, args) {
    const randomnumber = Math.floor(Math.random() * 100 + 0);
    const waifu = args.slice(0).join(" ");

    if (!args[0])
      return message.channel.send("<:juldythonk:481367196963045386> Do you want me to rate your waifu or not? I haven't got all day...");
    if (args[0] === ("Maid Hedgehog", "<@495812300196937761>")) {
      return message.channel.send("I'm the best there is. **∞/100**");
    } else {
      return message.channel.send(`<:juldythonk:481367196963045386> *Hmm...* I'll have to give ${waifu} a **${randomnumber}/100**`);
    }
  }
};
