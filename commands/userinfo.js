const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Displays info about yourself.",
  aliases: ["user"],
  usage: [""],
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setAuthor(
        `USER INFORMATION for ${message.author.username}`,
        message.author.avatarURL
      )
      .setThumbnail(`${message.author.avatarURL}`)
      .addField("NAME: ", `${message.author.tag}`)
      .addField("ID: ", `${message.author.id}`)
      .addField("DATE OF CREATION: ", `${message.author.createdAt}`)
      .addField(
        "ROLES: ",
        message.member.roles.map(role => role.name).join(", ")
      );

    message.channel.send(embed);
  }
};