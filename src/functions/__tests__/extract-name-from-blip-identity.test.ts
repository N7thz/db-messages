import { extractNameFromBlipIdentity } from '../extract-name-from-blip-identity'

describe('extractNameFromBlipIdentity', () => {
    it('should return null if identity is undefined', () => {
        expect(extractNameFromBlipIdentity(undefined)).toBeNull()
    })

    it('should extract name from standard identity', () => {
        expect(extractNameFromBlipIdentity('john.doe@messenger.gw.msging.net')).toBe('john doe')
    })

    it('should handle identity without dot', () => {
        expect(extractNameFromBlipIdentity('johndoe@messenger.gw.msging.net')).toBe('johndoe')
    })

    it('should handle identity with percent sign', () => {
        expect(extractNameFromBlipIdentity('john.doe%tenant@messenger.gw.msging.net')).toBe('john doe')
    })

    it('should handle identity with multiple dots', () => {
        // According to the implementation, it only takes the first two parts
        expect(extractNameFromBlipIdentity('john.doe.extra@messenger.gw.msging.net')).toBe('john doe')
    })

    it('should handle simple identity', () => {
        expect(extractNameFromBlipIdentity('john')).toBe('john')
    })
})
