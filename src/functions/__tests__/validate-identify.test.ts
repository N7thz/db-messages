import { normalizeWhatsAppIdentify } from '../validate-identify'

describe('normalizeWhatsAppIdentify', () => {
    it('should return original identity if it does not contain @', () => {
        expect(normalizeWhatsAppIdentify('invalid-identity')).toBe('invalid-identity')
    })

    it('should normalize number by removing non-digits', () => {
        expect(normalizeWhatsAppIdentify('55.11.99999-9999@wa.gw.msging.net')).toBe('5511999999999@wa.gw.msging.net')
    })

    it('should handle duplicated 55 prefix (5555)', () => {
        // 55 55 11 99999 9999 -> 15 digits
        // removing first 55 -> 55 11 99999 9999 -> 13 digits (valid)
        expect(normalizeWhatsAppIdentify('555511999999999@wa.gw.msging.net')).toBe('5511999999999@wa.gw.msging.net')
    })

    it('should not remove 5555 if the resulting length is invalid', () => {
        // 5555123@wa.gw.msging.net -> 7 digits
        // removing first 55 -> 55123 -> 5 digits (invalid)
        // so it returns digits@domain
        expect(normalizeWhatsAppIdentify('5555123@wa.gw.msging.net')).toBe('5555123@wa.gw.msging.net')
    })

    it('should return digits@domain for valid 12 digits number', () => {
        expect(normalizeWhatsAppIdentify('551188888888@wa.gw.msging.net')).toBe('551188888888@wa.gw.msging.net')
    })

    it('should return digits@domain for valid 13 digits number', () => {
        expect(normalizeWhatsAppIdentify('5511999999999@wa.gw.msging.net')).toBe('5511999999999@wa.gw.msging.net')
    })
})
