"use client"

import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { signUpSchema, type FormSignUpProps } from "@/schemas/sign-up-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const FormSignUp = () => {
	const [visible, setVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<FormSignUpProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(signUpSchema),
	})

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = form

	const { push } = useRouter()

	async function onSubmit({ email, name, password }: FormSignUpProps) {
		await authClient.signUp.email(
			{
				email,
				name,
				password,
			},
			{
				onRequest: () => setIsLoading(true),
				onSuccess: () => {
					toast({
						title: "Usuario criado com sucesso",
						onAutoClose: () => push("/sign-in"),
					})
				},
				onError: ({ error }) => {
					console.log(error.message)

					setIsLoading(false)

					toast({
						title: "Error",
						description: error.message,
						variant: "destructive",
					})
				},
			}
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col">
				<div className="space-y-2">
					<Input
						placeholder="name@email.com"
						{...register("email")}
						className={cn(
							errors.email && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
					/>
					{errors.email && <SpanErrorMessage message={errors.email.message} />}
				</div>
				<div className="space-y-2">
					<Input
						placeholder="user name"
						{...register("name")}
						className={cn(
							errors.name && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
					/>
					{errors.name && <SpanErrorMessage message={errors.name.message} />}
				</div>
				<div className="space-y-2">
					<Input
						type={visible ? "text" : "password"}
						placeholder="**********"
						{...register("password")}
						className={cn(
							errors.password && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
					/>
					{errors.password && (
						<SpanErrorMessage message={errors.password.message} />
					)}
				</div>
				<div className="space-y-2">
					<Input
						type={visible ? "text" : "password"}
						placeholder="**********"
						{...register("confirmPassword")}
						className={cn(
							errors.confirmPassword && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
					/>
					{errors.confirmPassword && (
						<SpanErrorMessage message={errors.confirmPassword.message} />
					)}
					<Button
						type="button"
						variant={"link"}
						className="p-0"
						onClick={() => setVisible(visible => !visible)}>
						{visible ? "esconder senha" : "mostrar senha"}
					</Button>
				</div>
				<Button asChild type="button" variant={"link"} className="w-full">
					<Link href="/sign-in" prefetch={false}>
						Já tenho conta
					</Link>
				</Button>
				<Separator />
				<Button type="submit" className="w-1/2 self-end" disabled={isLoading}>
					{isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
				</Button>
			</form>
		</Form>
	)
}
