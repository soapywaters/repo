const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Gets the URL of your avatar.",
  aliases: ["icon", "pfp"],
  usage: [""],
  cooldown: 2,
  cooldown: 2,
  execute(message) {
    if (!message.mentions.users.size) {
      const embed = new Discord.RichEmbed()
        .setColor("#26ff93")
        .setAuthor(
          `AVATAR for ${message.author.username}`,
          message.author.avatarURL
        )
        .setImage(`${message.author.avatarURL}`);

      return message.channel.send(embed);
    }
  }
};
