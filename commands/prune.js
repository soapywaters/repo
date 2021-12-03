module.exports = {
  name: "prune",
  description:
    "Prunes up to 99 messages. Only moderators can use this command.",
  aliases: ["purge"],
  usage: ["[number of messages to be pruned]"],
  cooldown: 3,
  execute(message, args) {
    const amount = parseInt(args[0]) + 1;
    const modRole = message.guild.roles.find(role => role.name === "Staff");

    if (!message.member.roles.has(modRole.id)) {
      message.channel
        .send(
          `${message.author.tag}, you don't have the permission to use this command.`
        )
        .catch(console.error);
    }
    if (isNaN(amount)) {
      message.channel.send(
        `${message.author.tag}, that doesn\'t seem to be a valid number.`
      );
    } else if (amount <= 1 || amount > 100) {
      message.channel.send(
        `${message.author.tag}, you need to input a number between 1 and 99.`
      );
    }

    message.channel
      .bulkDelete(amount, true)
      .then(messages =>
        message.channel
          .send(`\`${amount}\` messages have been successfully deleted!`)
          .then(msg => msg.delete(3000))
      )
      .catch(err => {
        console.error(err);
        message.channel.send(
          "There was an error trying to prune messages in this channel!"
        );
      });
  }
};
