module.exports = {
  nix: {
    name: 'start',
    prefix: false,
    role: 0,
    category: 'utility',
    aliases: ['help', 'commands'],
  },

  async onStart({ message, bot }) {
    if (!global.teamnix?.cmds) {
      return message.reply("❌ Command system unavailable.");
    }

    const commands = [...global.teamnix.cmds.values()];

    // 📚 MESSAGE HELP (SANS INFOS)
    let msg = `
˚ ༘♡ ·˚꒰🥍🏀 𝐒𝐖𝐄𝐄𝐓 𝐊𝐈𝐓𝐓𝐘 𝐁𝐎𝐓 🍒🧃꒱ ₊˚ˑ༄
━━━━━━━━━━━━━━━━━━━━━━
📚 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒
━━━━━━━━━━━━━━━━━━━━━━
`.trim() + '\n\n';

    commands
      .filter((cmd, i, self) =>
        i === self.findIndex(c => c.nix.name === cmd.nix.name)
      )
      .forEach(cmd => {
        msg += `• /${cmd.nix.name}\n`;
      });

    // 🔘 BOUTONS (SEULEMENT DEV + GROUPE)
    const keyboard = {
      inline_keyboard: [
        [
          { text: '🍒 Groupe', url: 'https://t.me/+AeazH36wrEcxM2Q0' },
          { text: '🧢 Dev', url: 'https://t.me/Samy_Charles_02' }
        ]
      ]
    };

    // 📤 ENVOI DU HELP
    await message.reply(msg, {
      reply_markup: keyboard
    });

    // 🎧 ENVOI AUTOMATIQUE DE L’AUDIO
    await bot.sendAudio(
      message.chat.id,
      'https://t.me/axislaboffical/9462'
    );
  }
};
