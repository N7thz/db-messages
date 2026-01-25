type Message = {
    type: string
    id: string
    createdAt: Date
    content: string
    from: string
    to: string
}

export const messages: Message[] = [
    {
        type: "message",
        id: "msg_001",
        createdAt: new Date("2026-01-10T10:15:00"),
        content: "Olá! Tudo bem?",
        from: "nathan ferreira",
        to: "carlos silva",
    },
    {
        type: "message",
        id: "msg_002",
        createdAt: new Date("2026-01-10T10:16:30"),
        content: "Tudo sim! E você?",
        from: "carlos silva",
        to: "nathan ferreira",
    },
    {
        type: "message",
        id: "msg_003",
        createdAt: new Date("2026-01-10T10:18:12"),
        content: "Estou bem também 🙂 Podemos revisar o card hoje?",
        from: "nathan ferreira",
        to: "carlos silva",
    },
    {
        type: "system",
        id: "sys_001",
        createdAt: new Date("2026-01-10T10:20:00"),
        content: "Carlos entrou na conversa",
        from: "system",
        to: "conversation",
    },
    {
        type: "message",
        id: "msg_004",
        createdAt: new Date("2026-01-10T10:18:12"),
        content: "slkefçlskefçlkaseçlfksçlfkaçslekfçlskfçlskefçlskeçaflksçlefksçlekafçlsekfçlskafçlsekfçlsakfçlsekflçsakefçlskefçlskaeçflkwseflçsakeflçksalçfkasçlefkasçlefkaçlsefkçslekfçlaskefçlskf",
        from: "nathan ferreira",
        to: "carlos silva",
    },
]
