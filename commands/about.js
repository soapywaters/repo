const Discord = require("discord.js");

module.exports = {
  name: "about",
  description: "Display info about Maid Hedgehog.",
  aliases: ["botinfo", "info"],
  usage: [""],
  cooldown: 2,
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setThumbnail("https://i.imgur.com/y63an6R.png")
      .addField(
        "**__<:flowerhill:518312403881164800> GREETINGS, COMRADES! <:flowerhill:518312403881164800>__**",
        "**Maid Hedgehog** is an exclusive bot for the Squirrel and Hedgehog server!"
      )
      .addField(
        "**__<:flowerhill:518312403881164800> WHAT MAID HEDGEHOG CAN DO <:flowerhill:518312403881164800>__**",
        "❀Display user and server info\n❀Prune up to 99 messages\n❀Fun commands like `crysball` and `ratewaifu` \n❀And much more!"
      )
      .addField("COMMANDS: ", "Type `~help` for the **full list of commands**!")
      .setFooter(
        "Maid Hedgehog | Flower Hill",
        "https://i.imgur.com/y63an6R.png"
      );

    return message.channel.send(embed);
  }
};
