import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import './Chatbot.css';

const DUMMY_RESPONSES = [
    { keywords: ['hi', 'hello', 'hey'], response: "Hi there! I'm Agraay's virtual assistant. How can I help you today?" },
    { keywords: ['price', 'pricing', 'cost', 'plan'], response: "Agraay offers premium plans starting from just ₹50 for the first month, and our best value annual plan at ₹1,999/yr. You can find all the details on our homepage!" },
    { keywords: ['security', 'secure', 'safe', 'bank'], response: "We take security seriously! Agraay uses bank-level encryption to ensure your financial data is always safe." },
    { keywords: ['expense', 'add', 'transaction'], response: "To add a new expense or income, just log into your Dashboard and tap the 'New Expense' or 'Add Transaction' button." },
    { keywords: ['dashboard', 'login', 'account'], response: "You can access your dashboard by clicking the 'Log In' button in the top menu and entering your credentials." }
];

const DEFAULT_RESPONSE = "I'm a dummy bot right now, but I can answer simple questions about pricing, security, and using Agraay. What would you like to know?";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm Agraay's support assistant. Ask me about pricing, security, or how to use the app!" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInputValue('');

        // Simulate bot thinking
        setTimeout(() => {
            let botResponse = DEFAULT_RESPONSE;
            const lowerInput = userMessage.toLowerCase();

            for (const item of DUMMY_RESPONSES) {
                if (item.keywords.some(kw => lowerInput.includes(kw))) {
                    botResponse = item.response;
                    break;
                }
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        }, 600);
    };

    return (
        <div className="chatbot-container">
            {isOpen ? (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div>
                            <div className="chatbot-title">Agraay Support</div>
                            <div className="chatbot-subtitle">Online</div>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chatbot-message ${msg.role}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" disabled={!inputValue.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            ) : (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <MessageCircle size={24} color="white" />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
