const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Displays info about this server.",
  aliases: ["server"],
  usage: [""],
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setTitle(
        "**__<:flowerhill:518312403881164800> SERVER INFORMATION <:flowerhill:518312403881164800>__**"
      )
      .setThumbnail(`${message.guild.iconURL}`)
      .addField("SERVER NAME: ", `${message.guild.name}`, true)
      .addField("SERVER ID: ", `${message.guild.id}`, true)
      .addField("DATE OF CREATION: ", `${message.guild.createdAt}`)
      .addField("TOTAL MEMBERS: ", `${message.guild.memberCount}`);

    message.channel.send(embed);
  }
};