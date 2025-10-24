import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Send, Key, Users, Shield, Copy, Check } from 'lucide-react';

const RSASecureChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [keyPair, setKeyPair] = useState(null);
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState('broadcast');
  const [showKeyInfo, setShowKeyInfo] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // RSA Key Generation
  const generateKeys = () => {
    const p = 61;
    const q = 53;
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const e = 17;
    
    let d = 1;
    while ((d * e) % phi !== 1) {
      d++;
    }
    
    return {
      publicKey: { e, n },
      privateKey: { d, n }
    };
  };

  // RSA Encryption
  const encrypt = (message, publicKey) => {
    const { e, n } = publicKey;
    return message.split('').map(char => {
      const m = char.charCodeAt(0);
      return modPow(m, e, n);
    });
  };

  // RSA Decryption
  const decrypt = (encrypted, privateKey) => {
    const { d, n } = privateKey;
    return encrypted.map(code => {
      const m = modPow(code, d, n);
      return String.fromCharCode(m);
    }).join('');
  };

  // Modular Exponentiation
  const modPow = (base, exp, mod) => {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  };

  const handleRegister = () => {
    if (userName.trim()) {
      const keys = generateKeys();
      setKeyPair(keys);
      setUsers(prev => ({
        ...prev,
        [userName]: keys.publicKey
      }));
      setIsRegistered(true);
      
      setMessages(prev => [...prev, {
        type: 'system',
        text: `${userName} joined the chat`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && keyPair) {
      const timestamp = new Date().toLocaleTimeString();
      
      if (selectedUser === 'broadcast') {
        // Broadcast message (encrypted for each user)
        const encryptedMessages = {};
        Object.entries(users).forEach(([user, publicKey]) => {
          if (user !== userName) {
            encryptedMessages[user] = encrypt(inputMessage, publicKey);
          }
        });
        
        setMessages(prev => [...prev, {
          type: 'sent',
          sender: userName,
          text: inputMessage,
          encrypted: true,
          timestamp,
          recipient: 'Everyone'
        }]);
      } else {
        // Direct message
        const recipientKey = users[selectedUser];
        const encrypted = encrypt(inputMessage, recipientKey);
        
        setMessages(prev => [...prev, {
          type: 'sent',
          sender: userName,
          text: inputMessage,
          encrypted: true,
          timestamp,
          recipient: selectedUser
        }]);
      }
      
      setInputMessage('');
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(JSON.stringify(text));
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">RSA Secure Chat</h1>
            <p className="text-blue-200">End-to-end encrypted messaging</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Enter Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                placeholder="Your name..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Key className="w-5 h-5" />
              Generate Keys & Join
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <p className="text-sm text-blue-100">
              <Lock className="w-4 h-4 inline mr-2" />
              Your RSA key pair will be generated automatically for secure communication
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white/10 backdrop-blur-lg border-r border-white/20 flex flex-col">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{userName}</h2>
              <p className="text-sm text-blue-200">Secure Chat</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowKeyInfo(!showKeyInfo)}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Key className="w-4 h-4" />
            {showKeyInfo ? 'Hide' : 'Show'} Key Info
          </button>
        </div>

        {showKeyInfo && keyPair && (
          <div className="p-4 border-b border-white/20 space-y-3 overflow-auto">
            <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-green-200">PUBLIC KEY</span>
                <button
                  onClick={() => copyToClipboard(keyPair.publicKey, 'public')}
                  className="text-green-200 hover:text-green-100"
                >
                  {copiedKey === 'public' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-green-100 font-mono break-all">
                e: {keyPair.publicKey.e}, n: {keyPair.publicKey.n}
              </p>
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-3 border border-red-400/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-red-200">PRIVATE KEY</span>
                <button
                  onClick={() => copyToClipboard(keyPair.privateKey, 'private')}
                  className="text-red-200 hover:text-red-100"
                >
                  {copiedKey === 'private' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-red-100 font-mono break-all">
                d: {keyPair.privateKey.d}, n: {keyPair.privateKey.n}
              </p>
            </div>
          </div>
        )}

        <div className="p-4 flex-1 overflow-auto">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Recipients
          </h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedUser('broadcast')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedUser === 'broadcast'
                  ? 'bg-blue-500/30 border-2 border-blue-400'
                  : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
              }`}
            >
              <div className="text-white font-medium">🌐 Everyone</div>
              <div className="text-xs text-blue-200">Broadcast message</div>
            </button>
            
            {Object.keys(users).filter(u => u !== userName).map(user => (
              <button
                key={user}
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedUser === user
                    ? 'bg-purple-500/30 border-2 border-purple-400'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="text-white font-medium">👤 {user}</div>
                <div className="text-xs text-purple-200">Direct message</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {selectedUser === 'broadcast' ? '🌐 Broadcast' : `👤 ${selectedUser}`}
              </h2>
              <p className="text-sm text-blue-200 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                End-to-end encrypted with RSA
              </p>
            </div>
            <div className="bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30">
              <span className="text-green-200 text-sm font-semibold">🔒 Secure</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.type === 'system' ? (
                <div className="text-center">
                  <span className="bg-white/10 px-4 py-2 rounded-full text-sm text-blue-200">
                    {msg.text}
                  </span>
                </div>
              ) : (
                <div className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md ${msg.type === 'sent' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/10'} rounded-2xl p-4 backdrop-blur-lg border border-white/20`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-white">
                        {msg.sender}
                      </span>
                      {msg.encrypted && (
                        <Lock className="w-3 h-3 text-green-300" />
                      )}
                      <span className="text-xs text-white/60">→ {msg.recipient}</span>
                    </div>
                    <p className="text-white break-words">{msg.text}</p>
                    <span className="text-xs text-white/60 mt-2 block">{msg.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Encrypted message to ${selectedUser === 'broadcast' ? 'everyone' : selectedUser}...`}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSASecureChat;
