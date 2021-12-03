const Discord = require("discord.js");

module.exports = {
  name: "serverroles",
  description: "Displays the server's roles.",
  aliases: ["roles", "rolelist"],
  usage: [""],
  cooldown: 2,
  guildOnly: true,
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setThumbnail(`${message.guild.iconURL}`)
      .setTitle(
        "**__<:flowerhill:518312403881164800> SERVER ROLES <:flowerhill:518312403881164800>__**"
      )
      .setDescription(
        message.guild.roles.map(r => "`" + r.name + "`").join(", ")
      );

    return message.channel.send(embed);
  }
};