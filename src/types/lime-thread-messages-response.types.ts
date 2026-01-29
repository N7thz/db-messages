/* ======================================================
 * LIME Thread Messages – Response
 * ====================================================== */

export interface LimeThreadMessagesResponse {
    type: "application/vnd.lime.collection+json"
    method: "get"
    status: "success" | "failure"
    id: string
    from: string
    to: string
    resource: LimeThreadMessagesResource
}

/* ======================================================
 * Resource (Collection)
 * ====================================================== */

export interface LimeThreadMessagesResource {
    total: number
    itemType: "application/vnd.iris.thread-message+json"
    items: LimeThreadMessage[]
}



/* ======================================================
 * LIME Thread Message – Base
 * ====================================================== */

export interface LimeThreadMessage {
    id: string
    direction: "sent" | "received"
    type: string
    date: string // ISO string
    status: "consumed" | "dispatched"
    content: LimeMessageContent
}

/* ======================================================
 * Content Union
 * ====================================================== */

export type LimeMessageContent =
    | LimeTextContent
    | LimeMediaContent
    | LimeSelectContent
    | LimeReplyContent
    | LimeTemplateContent
    | LimeTicketContent
    | LimeInteractiveContent

/* ======================================================
 * Text
 * ====================================================== */

export interface LimeTextContent {
    type: "text/plain"
    content: string
}

/* ======================================================
 * Media
 * ====================================================== */

export interface LimeMediaContent {
    type: "application/vnd.lime.media-link+json"
    content: {
        type: string
        uri: string
    }
}

/* ======================================================
 * Select
 * ====================================================== */

export interface LimeSelectContent {
    type: "application/vnd.lime.select+json"
    content: {
        text: string
        scope?: "immediate"
        options: Array<{
            text: string
        }>
    }
}

/* ======================================================
 * Reply
 * ====================================================== */

export interface LimeReplyContent {
    type: "application/vnd.lime.reply+json"
    content: {
        replied: {
            type: string
            value: string
        }
        inReplyTo: {
            id: string
            type: string
            direction: "sent" | "received"
            value: {
                text: string
                options: Array<{
                    text: string
                }>
                scope?: string
            }
        }
    }
}

/* ======================================================
 * Template (WhatsApp)
 * ====================================================== */

export interface LimeTemplateContent {
    type: "application/json"
    content: {
        type: "template"
        template: {
            name: string
            language: {
                code: string
                policy: string
            }
            components: Array<{
                type: string
                parameters: Array<{
                    type: string
                    text?: string
                }>
            }>
        }
    }
}

/* ======================================================
 * Ticket (Iris)
 * ====================================================== */

export interface LimeTicketContent {
    type: "application/vnd.iris.ticket+json"
    content: {
        id: string
        sequentialId: number
        ownerIdentity: string
        customerIdentity: string
        customerDomain: string
        provider: string
        status: string
        storageDate: string
        externalId: string
        rating: number
        team: string
        unreadMessages: number
        closed: boolean
        priority: number
        customerInput?: {
            type: string
            value: string
        }
    }
}

/* ======================================================
 * Interactive (WhatsApp)
 * ====================================================== */

export interface LimeInteractiveContent {
    recipient_type: "individual"
    type: "interactive"
    interactive: LimeInteractive
}

export type LimeInteractive =
    | LimeInteractiveButton
    | LimeInteractiveList

/* ---------- Button ---------- */

export interface LimeInteractiveButton {
    type: "button"
    body: {
        text: string
    }
    action: {
        buttons: LimeInteractiveReplyButton[]
    }
}

export interface LimeInteractiveReplyButton {
    type: "reply"
    reply: {
        id: number | string
        title: string
    }
}

/* ---------- List ---------- */

export interface LimeInteractiveList {
    type: "list"
    body: {
        text: string
    }
    action: {
        button: string
        sections: Array<{
            title: string
            rows: Array<{
                id: string
                title: string
                description?: string
            }>
        }>
    }
}