import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(8, 'Your email must be at least 8 characters long')
    .max(30, 'Your email must be less than 30 characters long'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Your password must be at least 8 characters long')
    .max(30, 'Your password must be less than 30 characters long')
})

export type LoginType = z.infer<typeof LoginSchema>
