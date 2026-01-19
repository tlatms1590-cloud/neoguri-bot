const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 주사위 이미지 (1~6)
const diceImages = {
  1: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg",
  2: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg",
  3: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg",
  4: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg",
  5: "https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg",
  6: "https://upload.wikimedia.org/wikipedia/commons/2/26/Dice-6-b.svg"
};

// 🎬 데구르르 애니메이션 카드
function rollingEmbed() {
  return new EmbedBuilder()
    .setTitle("🎲 주사위")
    .setDescription("데구르르… 🌀")
    .setColor(0x2f3136);
}

// 🎯 결과 카드
function resultEmbed(user, dice) {
  return new EmbedBuilder()
    .setTitle("🎲 주사위")
    .setDescription(`**주사위를 굴려 ${dice}(이)가 나왔어요!**`)
    .setColor(0x2f3136)
    .setImage(diceImages[dice])
    .setFooter({
      text: user.username,
      iconURL: user.displayAvatarURL()
    });
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

client.once("clientReady", async () => {
  console.log("🦝 neoguri 봇 켜짐!");

  const command = new SlashCommandBuilder()
    .setName("주사위")
    .setDescription("주사위를 굴립니다");

  await client.application.commands.create(command);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "주사위") return;

  // 1️⃣ 먼저 애니메이션
  await interaction.reply({
    embeds: [rollingEmbed()]
  });

  // 2️⃣ 1초 후 결과
  setTimeout(async () => {
    const dice = rollDice();
    await interaction.editReply({
      embeds: [resultEmbed(interaction.user, dice)]
    });
  }, 1000);
});

client.login(process.env.BOT_TOKEN);

// --- Render용: 포트 열어두기(무료 Web Service 유지용) ---
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server listening on ${PORT}`);
});

