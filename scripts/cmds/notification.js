const nix = {
  name: "notification",
  version: "1.0.0",
  aliases: ["notify", "noti"],
  description: "Envoie une notification à tous les groupes",
  author: "Kyo soma",
  prefix: true,
  category: "owner",
  type: "admin",
  cooldown: 5,
  guide: "{pn} <message>"
};

async function onStart({ bot, args, message, msg, usages }) {
  if (!args[0]) return message.reply("Veuillez entrer un message.");
  message.reply("Notification envoyée à tous les groupes :\n" + args.join(" "));
}

module.exports = { nix, onStart };
