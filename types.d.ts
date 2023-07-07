import { z } from 'zod';

const PLANS = ['1', '2', '3'] as const;

export const GeneralInfoSchema = z.object({
    adults: z.number().nonnegative({ message: 'Value cannot be less than 0' }).min(1).max(5),
    children: z.number().nonnegative({ message: 'Value cannot be less than 0' }).min(0).max(5),
    start: z.string().nonempty({ message: 'Start date cannot be empty' }),
    end: z.string().nonempty({ message: 'End date cannot be empty' }),
    plan: z.enum(PLANS)
});

export type GeneralInfo = z.infer<typeof GeneralInfoSchema>;

export const CustomerSchema = z.object({
    firstName: z.string().min(3, { message: 'Invalid first name value' }),
    lastName: z.string().min(3, { message: 'Invalid last name value' }),
    email: z.string().email({ message: 'Invalid e-mail address' }),
    phone: z.string().optional()
});

export type Customer = z.infer<typeof CustomerSchema>;

export type FieldError = {
    field: string;
    message: string;
}

export type QuotationState = {
    general: GeneralInfo;
    customer: Customer;
}
