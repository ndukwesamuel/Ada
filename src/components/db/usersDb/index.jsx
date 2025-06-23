export const usersDb = [
    {
        id: 1,
        name: "Admin Rue",
        status: "Online",
        messages: [
            {
                from: "Me",
                text: "Hello am new to this system can I get a breakdown on how it works?",
                time: "10:22",
            },
            {
                from: "Agent Rue",
                text: "Yes, we currently run both on our platform here",
                time: "10:24",
            },
        ],
    },
    { id: 2, name: "Admin Daniel", status: "Offline", unread: 10, messages: [] },
    { id: 3, name: "User Rose", status: "Offline", unread: 3, messages: [] },
    { id: 4, name: "User William", status: "Online", messages: [] },
];
