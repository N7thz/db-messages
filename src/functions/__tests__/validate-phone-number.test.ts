import { describe, it, expect } from 'vitest'
import { phoneNumberBRSchema } from '../validate-phone-number'

describe('phoneNumberBRSchema', () => {
    it('should format a valid mobile number without DDI', () => {
        expect(phoneNumberBRSchema.parse('11999999999')).toBe('(11) 99999-9999')
    })

    it('should format a valid landline number without DDI', () => {
        expect(phoneNumberBRSchema.parse('1188888888')).toBe('(11) 8888-8888')
    })

    it('should remove DDI 55 and format', () => {
        expect(phoneNumberBRSchema.parse('5511999999999')).toBe('(11) 99999-9999')
    })

    it('should handle duplicated 55 prefix', () => {
        expect(phoneNumberBRSchema.parse('555511999999999')).toBe('(11) 99999-9999')
    })

    it('should remove non-digits and format', () => {
        expect(phoneNumberBRSchema.parse('+55 (11) 99999-9999')).toBe('(11) 99999-9999')
    })

    it('should throw error for invalid length', () => {
        expect(() => phoneNumberBRSchema.parse('119999999')).toThrow('Número de telefone brasileiro inválido')
        expect(() => phoneNumberBRSchema.parse('119999999999')).toThrow('Número de telefone brasileiro inválido')
    })
})
