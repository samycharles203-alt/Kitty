module.exports = {
  nix: {
    name: 'start',
    prefix: false,
    role: 0,
    category: 'utility',
    aliases: ['help', 'commands'],
    author: 'SAM ARCFOX',
    version: '2.0.0',
  },

  async onStart({ message, args, event, bot }) {
    if (!global.teamnix?.cmds) {
      return message.reply("❌ Command system unavailable.");
    }

    const commands = [...global.teamnix.cmds.values()];
    const perPage = 6;
    let page = 0;

    const buildHelp = (pageIndex) => {
      const start = pageIndex * perPage;
      const slice = commands.slice(start, start + perPage);

      let text = `
˚ ༘♡ ·˚꒰🥍🏀 𝐒𝐖𝐄𝐄𝐓 𝐊𝐈𝐓𝐓𝐘 𝐁𝐎𝐓 🍒🧃꒱ ₊˚ˑ༄
━━━━━━━━━━━━━━━━━━━━━━
📚 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 — Page ${pageIndex + 1}
━━━━━━━━━━━━━━━━━━━━━━
`.trim() + '\n\n';

      slice.forEach(cmd => {
        text += `❥ ${cmd.nix.name} 〔 ${cmd.nix.category || 'other'} 〕\n`;
      });

      text += `
━━━━━━━━━━━━━━━━━━━━━━
👑 Créateur :
⏤͟͟͞͞🍒🎸𝄒× •-•-•⟮ 𝐒𝐀𝐌 𝐀𝐑𝐂𝐅𝐎𝐗 ⟯•-•-• × ﹝⌨˓👑˒๖ۣ•҉📰🇨🇮
━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      return text;
    };

    const keyboard = (pageIndex) => ({
      inline_keyboard: [
        [
          ...(pageIndex > 0
            ? [{ text: '⬅️ Précédent', callback_data: `help_${pageIndex - 1}` }]
            : []),
          ...(commands.length > (pageIndex + 1) * perPage
            ? [{ text: '➡️ Suivant', callback_data: `help_${pageIndex + 1}` }]
            : [])
        ],
        [
          { text: '🍒 Groupe', url: 'https://t.me/+AeazH36wrEcxM2Q0' },
          { text: '🧢 Dev', url: 'https://t.me/Samy_Charles_02' }
        ]
      ]
    });

    // 📌 CALLBACK HANDLER
    if (event?.callback_query) {
      const data = event.callback_query.data;
      if (!data.startsWith('help_')) return;

      page = Number(data.split('_')[1]);

      return bot.editMessageText(
        buildHelp(page),
        {
          chat_id: event.callback_query.message.chat.id,
          message_id: event.callback_query.message.message_id,
          reply_markup: keyboard(page)
        }
      );
    }

    // 🚀 PREMIER ENVOI
    await message.reply(buildHelp(page), {
      reply_markup: keyboard(page)
    });
  }
};
