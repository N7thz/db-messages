import { formatChatDate } from '../format-chat-date'

describe('formatChatDate', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should return "Hoje" for today\'s date', () => {
        const date = new Date(2023, 10, 15, 12, 0, 0)
        jest.setSystemTime(date)
        expect(formatChatDate(date)).toBe('Hoje')
    })

    it('should return "Ontem" for yesterday\'s date', () => {
        const today = new Date(2023, 10, 15, 12, 0, 0)
        const yesterday = new Date(2023, 10, 14, 12, 0, 0)
        jest.setSystemTime(today)
        expect(formatChatDate(yesterday)).toBe('Ontem')
    })

    it('should return formatted date for other days', () => {
        const today = new Date(2023, 10, 15, 12, 0, 0)
        const otherDate = new Date(2023, 9, 10, 12, 0, 0) // Oct 10, 2023
        jest.setSystemTime(today)
        // ptBR locale: "10 de outubro de 2023"
        expect(formatChatDate(otherDate)).toBe('10 de outubro de 2023')
    })
})
