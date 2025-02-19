# Discord Event Bot

This bot is designed to announce Discord scheduled events when they start, pinging interested users. It is built using **TypeScript** and **discord.js**.

## 🚀 Features

- Detects when a **Discord Scheduled Event** starts.
- Notifies a specified channel with an **embed and mentions** all interested users.
- Allows an admin to set the announcement channel dynamically.

---

## 📦 Requirements

Before installing the bot, make sure you have the following installed on your system:

- **[Node.js](https://nodejs.org/)** (v18 or later)
- **[npm](https://www.npmjs.com/)** (included with Node.js)
- **[TypeScript](https://www.typescriptlang.org/)** (installed automatically as a dependency)

---

## 🔧 Installation

1. **Clone the Repository** (or download the ZIP)

   ```sh
   git clone https://github.com/Samtino/DiscordEventBot
   cd DiscordEventBot
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. Create a `.env` File (Copy the example configuration)

   ```sh
   cp .env.example .env
   ```

   Then, open `.env` and set your **Discord Bot Token** and other required environment variables.

4. **Build the TypeScript Project** (Compiles TS to JS)

   ```sh
   npm run build
   ```

5. **Run the Bot**

   ```sh
   npm start
   ```

---

## 🤖 Creating a Discord Bot

To use this bot, you must create a bot in the Discord Developer Portal:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and enter a name for your bot.
3. Navigate to the **Bot** tab and click **Add Bot**.
4. Copy the **Bot Token** and add it to your `.env` file as `DISCORD_TOKEN=your-token-here`.
5. In the **OAuth2** tab, generate an invite link with the `bot` and `applications.commands` scopes.
6. Required permissions are `View Channels`, `Send Messages`, `Embed Links`, `Attach Files`, and `Mention Everyone`
   - You can also assign `Administrator` (at risk of possible malpractice if your token is compromised)
7. Invite the bot to your server using the generated Guild Install link.

---

## ♻️ Automatic Restart on Crash

To ensure the bot restarts automatically if it crashes, you can use one of the following methods:

### Using PM2 (Recommended)

PM2 is a process manager that keeps the bot running and restarts it on crashes.

1. **Install PM2 globally**

   ```sh
   npm install -g pm2
   ```

2. **Start the bot with PM2**

   ```sh
   pm2 start dist/index.js --name "DiscordEventBot"
   ```

3. **Ensure PM2 restarts on system reboot**

   ```sh
   pm2 save
   pm2 startup
   ```

---

## ⚙️ Configuration

- The bot uses `settings.json` to store settings such as the **announcement channel**.
- You can set the announcement channel dynamically with the `/set-announcement-channel` command.

---

## 🛠 Available Scripts

- `npm run build` – Compiles TypeScript files to JavaScript (`dist/` folder).
- `npm start` – Runs the compiled bot.
- `npm run dev` – Runs the bot in development mode using `tsx` (useful for debugging).

---

## 🛠 Issue Tracking

If you encounter issues or bugs, please report them using the following steps:

1. Check the [GitHub Issues](https://github.com/your-repo/issues) to see if your issue is already reported.
2. If not, create a **new issue** with:
   - A clear title and description of the issue.
   - Steps to reproduce the issue.
   - Expected vs actual behavior.
   - Any relevant error logs or screenshots.
3. Tag the issue appropriately for easier tracking.

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 👤 Author & Contact

📧 Email: [samtino00@gmail.com](mailto:samtino00@gmail.com)
🆔 Discord: `samtino` (`105509397211406336`)
🔗 GitHub: [Samtino](https://github.com/Samtino)
