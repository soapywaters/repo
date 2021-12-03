const Discord = require("discord.js");

module.exports = {
  name: "crysball",
  description: "Asks the magic crystal ball a question!",
  aliases: ["cb"],
  usage: ["[question]"],
  cooldown: 2,
  guildOnly: true,
  execute(message, args) {
    if (!args[2])
      return message.channel.send(
        ":crystal_ball: Don't you have a question for the magic crystal ball?"
      );

    const replies = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes, definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ];

    const result = Math.floor(Math.random() * replies.length);

    const question = args.slice(0).join(" ");

    message.channel.send(
      `**Your question was:** ${question}\n:crystal_ball: **Answer:** ${replies[result]}`
    );
  }
};
