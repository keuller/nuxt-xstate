import { FieldError, QuotationState } from '~/types.d';
import { assign, createMachine, interpret } from 'xstate';
import { Quotation } from '~/lib/quotation';

type QuotationContext = {
    totalAmount: number;
    processing: boolean;
    errors: Array<FieldError>;
}

export type QuotationStateFlow = {
    value: any;
    context: QuotationContext;
}

type NEXT = { type: 'NEXT', data: QuotationState }
type PREVIOUS = { type: 'PREVIOUS' }
type AMOUNT = { type: 'AMOUNT', data: number }
type QuotationEvents = PREVIOUS | NEXT | AMOUNT;

export const initialContext = {
    totalAmount: 0,
    processing: false,
    errors: []
}

const quotationMachine = createMachine<QuotationContext, QuotationEvents>({
    id: 'quotation-flow',
    context: initialContext,
    initial: 'general',
    states: {
        general: {
            on: {
                NEXT: {
                    target: 'customer',
                    cond: 'validateGeneralInfo'
                }
            }
        },
        customer: {
            on: {
                NEXT: {
                    target: 'calculateQuotation',
                    cond: 'validateCustomerInfo'
                },
                PREVIOUS: {
                    target: 'general'
                }
            }
        },
        calculateQuotation: {
            invoke: {
                src: 'calculateQuotation',
                onError: { target: 'customer' },
                onDone: { 
                    target: 'review',
                    actions: ['updateTotalAmount']
                }
            },
            tags: ['processing']
        },
        review: {
            on: {
                NEXT: {
                    target: 'submitQuotation'
                },
                PREVIOUS: {
                    target: 'customer'
                }
            }
        },
        submitQuotation: {
            invoke: {
                src: 'requestQuotation',
                onError: { target: 'review' },
                onDone: { target: 'end' }
            },
            tags: ['processing']
        },
        end: {
            type: 'final'
        }
    }
}, {
    actions: {
        updateTotalAmount: assign({
            totalAmount: (_, event) => (event as AMOUNT).data
        })
    },

    guards: {
        validateGeneralInfo(context, event) {
            const { general } = (event as NEXT).data;
            context.errors = Quotation.validateGeneral(general);
            return (context.errors && context.errors.length === 0);
        },
        validateCustomerInfo(context, event) {
            const { customer } = (event as NEXT).data;
            context.errors = Quotation.validateCustomer(customer);
            return (context.errors && context.errors.length === 0);
        }
    },

    services: {
        calculateQuotation(_, event) {
            return Quotation.calculate((event as NEXT).data);
        },
        requestQuotation(_, event) {
            return Quotation.requestQuote((event as NEXT).data);
        }
    }
});

export const service = interpret(quotationMachine);
