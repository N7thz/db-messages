import { findContactIdByNumberPhone } from "@/actions/blip/find-contact-id-by-number-phone"
import { ContactsQuery } from "./contacts-query"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ contact: string }>
}) {

    const { contact } = await params

    const numberPhone = contact.slice(0, 13)

    const data = await findContactIdByNumberPhone(numberPhone)

    const name = data.resource.fullName

    return {
        title: `conversa com ${name} | db-message` 
    }
}

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