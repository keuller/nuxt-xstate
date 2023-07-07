import {
    QuotationState,
    GeneralInfoSchema,
    GeneralInfo,
    CustomerSchema,
    Customer,
    FieldError,
} from "~/types.d"
import { post } from '~/lib/utils';
import { match } from "ts-pattern";

export namespace Quotation {
    // calculate the total amount for quotation
    // export function hasErrors(state: QuotationState): boolean {
    //     return (state.errors && state.errors.length > 0);
    // }

    export function calculate(state: QuotationState): Promise<number> {
        const { adults, children, plan } = state.general;
        return post('/api/calculate', { adults, children, plan })
            .then(res => res.amount);
    }

    export function requestQuote(state: QuotationState): Promise<unknown> {
        return post('/api/quotation', { ...state })
            .then(res => res);
    }

    // get the plan name based on value
    export function plan(value: string): string {
        return match<string, string>(value)
            .with('1', () => 'Silver')
            .with('2', () => 'Gold')
            .with('3', () => 'Platinum')
            .run();
    }

    export function validateGeneral(data: GeneralInfo): Array<FieldError> {
        let errors: Array<FieldError> = [];
        const result = GeneralInfoSchema.safeParse(data);

        if (!result.success) {
            const issues = result.error.issues;
            for (const issue of issues) {
                errors = [...errors, { field: `${issue.path[0]}`, message: issue.message }]
            }
        }

        return errors;
    }

    export function validateCustomer(data: Customer): Array<FieldError> {
        let errors: Array<FieldError> = [];
        const result = CustomerSchema.safeParse(data);

        if (!result.success) {
            const issues = result.error.issues;
            for (const issue of issues) {
                errors = [...errors, { field: `${issue.path[0]}`, message: issue.message }]
            }
        }

        return errors;
    }

    export function checkError(errors: Array<FieldError>, field: string): string {
        const res = errors.find((err) => err.field === field);
        return (res !== undefined ? res.message : '');
    }

}