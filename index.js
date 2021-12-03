const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
  console.log(`${client.user.tag} is now online!`);
  client.user.setActivity('"~help" | Flower Hill');
});

client.on("guildCreate", guild => {
  const channel = guild.channels.find(ch => ch.name === "general");
  if (!channel) return;
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

  return channel.send(embed);
});

client.on("guildMemberAdd", member => {
  const rules = member.guild.channels.find(ch => ch.name === "rules");
  const channel = member.guild.channels.find(ch => ch.name === "waiting-room");
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("#26ff93")
    .setDescription(
      `**__<:flowerhill:518312403881164800> Welcome to the Squirrel and Hedgehog server ${member}! <:flowerhill:518312403881164800>__**\nEnjoy your stay and remember to read the ${rules}!`
    );
  return channel.send(embed);
});

client.on("message", message => {
  const rules = message.guild.channels.find(ch => ch.name === "rules");
  const blacklistWords = ["retard", "faggot", "nigger", "nigga", "tranny", "libtard"];
  if (blacklistWords.some(word => message.content.includes(word))) {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setDescription(
        `${message.author.tag}, this server does **not** allow the word(s) that appeared in your message. Please refer to Rule 5 in ${rules}. Thank you.`);
    message
      .delete(true)
      .then(messages =>
        message.channel.send(embed).then(msg => msg.delete(15000)));
  }

  const responseObject = {
    "Flower Hill": "Long live Flower Hill!",
    "Commander Goseumdochi": "My heart beats for him~! :heart_eyes:",
    flame:
      "<:goseshook:481705397271396352>:airplane::fire: Press F to pay respects to Goseumdochi.",
    wolves: "Where are they? Lemme at 'em!",
    mice: "I'm calling Pest Control!",
    weasels: "We don't need Uncle Bear to defeat you weasly rascals!",
    comrade: "Greetings, comrade!"};

  if (responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setDescription("I can't execute that command inside DMs!");
    return message.channel.send(embed);
  }

  if (command.args && !args.length) {
    let reply = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setDescription(`You didn't provide any arguments, ${message.author}!`);

    if (command.usage) {
      reply += new Discord.RichEmbed()
        .setColor("#26ff93")
        .setDescription(
          `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        );
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const embed = new Discord.RichEmbed()
        .setColor("#26ff93")
        .setDescription(
          `${
            message.author.tag
          }, you're going too fast for me! Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      return message.channel.send(embed);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    const embed = new Discord.RichEmbed()
      .setColor("#26ff93")
      .setDescription(
        `${message.author.tag}, there was an error trying to execute that command!`
      );
    return message.channel.send(embed);
  }
});

client.login(process.env.SECRET);
