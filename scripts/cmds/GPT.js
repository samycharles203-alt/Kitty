const nix = {
  name: "gpt",
  version: "1.0.0",
  aliases: ["ai"],
  description: "Interagit avec GPT",
  author: "Kyo Soma",
  prefix: true,
  category: "ai",
  type: "anyone",
  cooldown: 10,
  guide: "{pn} <question>"
};

async function onStart({ args, message }) {
  if (!args[0]) return message.reply("Veuillez entrer une question.");
  message.reply("🤖 GPT est prêt à répondre :\n" + args.join(" "));
}

module.exports = { nix, onStart };
