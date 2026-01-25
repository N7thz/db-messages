import axios from "axios"

const NEXT_PUBLIC_API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

export const api = axios.create({
    headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_API_TOKEN}`,
    }
})