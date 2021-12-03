const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: "help",
  description:
    "Lists all of my commands and displays info about specific commands.",
  aliases: ["commands"],
  usage: ["[command name]"],
  cooldown: 4,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      const embed = new Discord.RichEmbed()
        .setColor("#26ff93")
        .setThumbnail("https://i.imgur.com/y63an6R.png")
        .setTitle(
          "**__<:flowerhill:518312403881164800> COMMANDS <:flowerhill:518312403881164800>__**"
        )
        .addField(
          commands.map(command => command.name).join(", "),
          "If you want to get info on a specific command, please send `~help [command name]`!"
        )
        .setFooter(
          "Maid Hedgehog | Flower Hill",
          "https://i.imgur.com/y63an6R.png"
        );

      return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));
    const commandname = args[0].toUpperCase();

    if (!command) {
      const embed = new Discord.RichEmbed()
        .setColor("#26ff93")
        .setDescription(`${message.author.tag}, that\'s not a valid command!`);
      return message.channel.send(embed);
    }

    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setThumbnail("https://i.imgur.com/y63an6R.png")
      .setTitle(
        `**__<:flowerhill:518312403881164800> ${commandname} <:flowerhill:518312403881164800>__**`
      )
      .setDescription(`${command.description}`)
      .addField("ALIASES", `${command.aliases.join(", ")}`)
      .addField("USAGE", `\`${prefix}${command.name} ${command.usage}\``)
      .addField("COOLDOWN", `${command.cooldown || 3} second(s)`)
      .setFooter(
        "Maid Hedgehog | Flower Hill",
        "https://i.imgur.com/y63an6R.png"
      );

    return message.channel.send(embed);
  }
};
