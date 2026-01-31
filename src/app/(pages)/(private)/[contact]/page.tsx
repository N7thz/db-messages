import { ContactsQuery } from "./contacts-query"

export default async function Contact({
    params,
}: {
    params: Promise<{ contact: string }>
}) {

    const contact = decodeURIComponent((await params).contact)

    return (
        <ContactsQuery identity={contact} />
    )
}