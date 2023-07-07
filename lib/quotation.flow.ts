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
    /** @xstate-layout N4IgpgJg5mDOIC5QEcCuB7ALgQ0wS3QDsBaAMwBt0B3AOhkLACdtyBiAOQFEANAFQG0ADAF1EoAA7pYefETEgAHogBsAJgDsNAJzKAzAFYDugCwbBARnMAaEAE9EqgByCax08q2rj+5ccG7BfQBfIJs0LFwCEgpqGgBjVFhMdABbJg4eARF5SWlZQnklBDVNHSNDU3ULaztEfVVzbV1VDUstQVVddVUQsIwcfLJKWgSk1PSABQAlTgA1AEkAeQBVAGUhUSQQXJkowsR1eppdcy9Dz2V9R1V9G3sEFq1tQ0sulp9HR2NekHCBqKGsTiLAS5FwYAAiv1IkRWBAiGAaHhCAA3dAAa0Rfxh0WG8RBqDBmEh0PyCGRaOB+Q2GxyUl2ci2RVUWmMNFUgkCN26XXU6kcd0Q5kCNHMykcynMzn0wuUai0P2xgxiIwJRJJEXyrCYjHQjBo4iJpD1KRoSoBKvx5FB4Khmqi5NR6CpURp2S2O3y+werPZnPq+h5fP5goQflUNHFjnMJ3MMvqxjjitJFrxjDAKLwYCoGT4tI99K9TJUGm0ekMFTMllDp0c2nUui0PhuxnagW+oV+KaIgNo6cz2dY0zmSzW+Ykhb2xeKpbKFZMVZq93M6iexnLJi0nwbxnUyftPctsFQACMUjI7f9YfCGEinZizd3cbFj2eL0-HZScW7NhO8lPQCKSx9DZPktDbCw-AsVQaxXGhBGUQQdC0YUWScQRHH3K9n1oV9z0wS8cW1RhdX1Q1cGNRhTXNQ88Tw98D0IT9nW-ERx22SdGUAlRnG0bxVDlRD+VbLRQ2jVxHB8dRJT5Xc3F0EJO0IdAIDgeQaJwul-y4xREGIZRQ30+DORM0yTPMDs+kY3s6DABhmHILSGQKacZTZEwuhea4ql0UMNAjCVhR0EzpMsrtrMtUZkjSRgnKLbiEE8RoxTlXQTF3AxfFDfRBE0VDEzFU40LCjSbOBa1CVtJ84oA3Swxg2oEF0XiPBjGTWyqYMsJxGz+yzKgap0op6hcRsvnDRxpMCAVGtOZR60bZsQLbEDuuVOjT3wwj4o47SXISpLRUEtK3AbHxjFDTwaHO8xwKqSxLD3TtSstOyIEG-a6ra+a0quaM9BXCzYLZaMDBy04RPcRSgiAA */
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
            entry: ['startProcessing'],
            invoke: {
                src: 'calculateQuotation',
                onError: { target: 'customer' },
                onDone: {
                    target: 'review',
                    actions: ['updateTotalAmount']
                }
            },
            exit: ['endProcessing']
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
            entry: ['startProcessing'],
            invoke: {
                src: 'submitQuotation',
                onError: { target: 'review' },
                onDone: { target: 'end' }
            },
            exit: ['endProcessing']
        },
        end: {
            type: 'final'
        }
    }
}, {
    actions: {
        updateTotalAmount: assign({
            totalAmount: (_, event) => (event as AMOUNT).data
        }),
        startProcessing: assign({ processing: true }),
        endProcessing: assign({ processing: false }),
    },

    guards: {
        validateGeneralInfo(context, event) {
            const { general } = (event as NEXT).data;
            context.errors = Quotation.validateGeneral(general);
            return (context.errors.length === 0);
        },

        validateCustomerInfo(context, event) {
            const { customer } = (event as NEXT).data;
            context.errors = Quotation.validateCustomer(customer);
            return (context.errors.length === 0);
        }
    },

    services: {
        calculateQuotation(context, event) {
            return Quotation.calculate((event as NEXT).data);
        },

        submitQuotation(context, event) {
            return Quotation.requestQuote((event as NEXT).data);
        }
    }
});

export const service = interpret(quotationMachine);
