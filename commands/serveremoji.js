const Discord = require("discord.js");

module.exports = {
  name: "serveremoji",
  description: "Displays the server's custom emojis.",
  aliases: ["emoji", "emoticon"],
  usage: [""],
  cooldown: 2,
  guildOnly: true,
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setThumbnail(`${message.guild.iconURL}`)
      .setTitle(
        "**__<:flowerhill:518312403881164800> CUSTOM EMOJIS <:flowerhill:518312403881164800>__**"
      )
      .setDescription(
        message.guild.emojis.map(e => e + "`:" + e.name + ":`").join("\n")
      );

    return message.channel.send(embed);
  }
};
