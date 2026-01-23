import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"

export const auth = betterAuth({
	session: {
		expiresIn: 60 * 60 * 24,
	},
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	account: {
		accountLinking: {
			enabled: true,
		},
	},
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
})
