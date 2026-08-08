document.addEventListener('DOMContentLoaded', () => {
    const convContainer = document.getElementById('conversations-container');
    const chatArea = document.getElementById('chat-area');

    function renderConversations() {
        if (!convContainer) return;
        convContainer.innerHTML = '';
        
        mockConversations.forEach(conv => {
            const user = mockUsers.find(u => u.id === conv.userId);
            const item = document.createElement('div');
            item.className = 'conversation-item';
            item.innerHTML = `
                <img src="${user.avatar}" class="avatar">
                <div class="conv-info">
                    <h4>${user.name}</h4>
                    <p>${conv.lastMessage}</p>
                </div>
                <div class="conv-meta">
                    <span class="time">${conv.time}</span>
                    ${conv.unreadCount > 0 ? `<span class="badge">${conv.unreadCount}</span>` : ''}
                </div>
            `;
            item.addEventListener('click', () => loadChat(user, conv.id));
            convContainer.appendChild(item);
        });
    }

    function loadChat(user, convId) {
        const messages = mockMessages[convId] || [];
        chatArea.innerHTML = `
            <div class="chat-header">
                <div class="chat-user-info">
                    <img src="${user.avatar}" class="avatar">
                    <div>
                        <h3>${user.name}</h3>
                        <span class="status">${user.online ? '● Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            <div class="chat-messages" id="chat-messages">
                ${messages.map(m => `
                    <div class="message ${m.sender === 'me' ? 'sent' : 'received'}">
                        <p>${m.text}</p>
                        <span class="msg-time">${m.time}</span>
                    </div>
                `).join('')}
            </div>
            <div class="chat-composer">
                <input type="text" id="msg-input" placeholder="Type a message...">
                <button id="send-btn">Send</button>
            </div>
        `;

        const sendBtn = document.getElementById('send-btn');
        const msgInput = document.getElementById('msg-input');
        
        const sendMessage = () => {
            const text = msgInput.value.trim();
            if(!text) return;
            
            if(!mockMessages[convId]) mockMessages[convId] = [];
            mockMessages[convId].push({
                sender: 'me',
                text: text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'sent'
            });
            msgInput.value = '';
            loadChat(user, convId);
        };

        sendBtn.addEventListener('click', sendMessage);
        msgInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') sendMessage();
        });
    }

    renderConversations();
});
