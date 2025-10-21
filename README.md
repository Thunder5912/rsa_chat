# 🔐 RSA Secure Chat Application

A modern, end-to-end encrypted chat application using RSA cryptography. Built with React and featuring a beautiful, responsive UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)
![Tailwind](https://img.shields.io/badge/tailwind-3.x-blue.svg)

## ✨ Features

- 🔒 **End-to-End Encryption** - All messages encrypted using RSA algorithm
- 👥 **Multi-User Support** - Chat with specific users or broadcast to everyone
- 🔑 **Automatic Key Generation** - RSA key pairs generated automatically
- 💬 **Real-Time Messaging** - Instant message delivery
- 🎨 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔐 **Key Management** - View and copy your public/private keys
- 🌐 **Broadcast Messages** - Send encrypted messages to all users

## 🚀 Demo

The application provides a secure chat interface where:
- Users register with a username
- RSA key pairs are automatically generated
- Messages are encrypted before sending
- Recipients can decrypt messages using their private key

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **RSA Cryptography** - End-to-end encryption

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rsa-secure-chat.git
cd rsa-secure-chat
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1"
}
```

## 🔐 How RSA Encryption Works

This application implements RSA encryption with the following components:

### Key Generation
- Two prime numbers: p = 61, q = 53
- Modulus: n = p × q = 3233
- Public exponent: e = 17
- Private exponent: d (calculated using Extended Euclidean Algorithm)

### Encryption Process
1. Message is converted to ASCII codes
2. Each character is encrypted using: `C = M^e mod n`
3. Encrypted values are transmitted

### Decryption Process
1. Encrypted values received
2. Each value is decrypted using: `M = C^d mod n`
3. ASCII codes converted back to text

## 🎯 Usage

### Registering a User
1. Enter your name in the registration screen
2. Click "Generate Keys & Join"
3. Your RSA key pair will be automatically generated

### Sending Messages
1. Select a recipient from the sidebar (or choose "Everyone" for broadcast)
2. Type your message in the input field
3. Click "Send" or press Enter
4. Message is automatically encrypted before sending

### Viewing Keys
1. Click "Show Key Info" in the sidebar
2. View your public and private keys
3. Copy keys to clipboard if needed

## 🏗️ Project Structure

```
rsa-secure-chat/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Main RSA Chat component
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## 🔒 Security Features

- **RSA Encryption**: Industry-standard asymmetric encryption
- **Key Pair Generation**: Automatic generation of secure key pairs
- **End-to-End**: Messages encrypted on sender's device, decrypted on recipient's device
- **No Storage**: Keys stored in memory only (session-based)

## ⚠️ Important Notes

- This is a **demonstration application** for educational purposes
- Uses simplified RSA with small prime numbers
- For production use, implement proper key exchange protocols
- Consider using established libraries like Web Crypto API
- Add backend server for real multi-user functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Adithya M
Adithya R
Aditya Sathyanarayanan

## 🙏 Acknowledgments

- RSA algorithm invented by Ron Rivest, Adi Shamir, and Leonard Adleman
- Inspired by modern encrypted messaging applications
- Icons by Lucide React

## 📸 Screenshots

### Registration Screen
![Registration](screenshots/registration.png)

### Chat Interface
![Chat](screenshots/chat.png)

### Key Management
![Keys](screenshots/keys.png)

---

⭐ Star this repository if you find it helpful!

## 🐛 Known Issues

- Currently single-session only (no persistent storage)
- Simplified RSA implementation for demonstration
- No actual network communication (simulated chat)

## 🗺️ Roadmap

- [ ] Add WebSocket support for real-time multi-user chat
- [ ] Implement proper key exchange protocol (Diffie-Hellman)
- [ ] Add message history persistence
- [ ] Implement user authentication
- [ ] Add file encryption/decryption
- [ ] Mobile app version
- [ ] Add digital signatures for message verification

## 💡 Learn More

To learn more about RSA encryption:
- [RSA Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
- [How RSA Works](https://www.youtube.com/watch?v=wXB-V_Keiu8)
- [Cryptography Course](https://www.coursera.org/learn/crypto)
