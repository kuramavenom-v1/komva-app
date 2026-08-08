const mockUsers = [
    {
        id: 1,
        username: "ahmed_ali",
        name: "Ahmed Ali",
        avatar: "https://i.pravatar.cc/150?img=1",
        online: true,
        bio: "Hey there! I am using Komva.",
        email: "ahmed@komva.com",
        joined: "January 2026"
    },
    {
        id: 2,
        username: "sara_dev",
        name: "Sara Developer",
        avatar: "https://i.pravatar.cc/150?img=5",
        online: false,
        bio: "Building the future of web apps.",
        email: "sara@komva.com",
        joined: "February 2026"
    }
];

const mockConversations = [
    {
        id: 1,
        userId: 1,
        lastMessage: "Hey! How is the project going?",
        time: "8:42 PM",
        unreadCount: 2
    },
    {
        id: 2,
        userId: 2,
        lastMessage: "Don't forget the meeting tomorrow.",
        time: "Yesterday",
        unreadCount: 0
    }
];

const mockMessages = {
    1: [
        { sender: 1, text: "Hey! How are you?", time: "8:40 PM", status: "read" },
        { sender: "me", text: "I'm good, thanks! Working on Komva.", time: "8:41 PM", status: "read" },
        { sender: 1, text: "Hey! How is the project going?", time: "8:42 PM", status: "delivered" }
    ],
    2: [
        { sender: 2, text: "Don't forget the meeting tomorrow.", time: "Yesterday", status: "read" }
    ]
};
