import { QuotationState, Step } from "~/types.d";
import { match } from 'ts-pattern';
import { Quotation } from "~/lib/quotation";

// global state for the quotation wizard
const state = reactive<QuotationState>({
    step: 'general',
    loading: false,
    general: {
        adults: 1,
        children: 0,
        start: '',
        end: '',
        plan: '1'
    },
    customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    },
    totalAmount: 0,
    errors: []
});

// useWizard composable function
export function useQuotation() {
    return {
        state,
        showButtons: computed(() => (state.step !== 'end' && state.step !== 'processing')),
        next: () => {
            if (state.step === 'general') {
                state.errors = Quotation.validateGeneral(state.general);
                if (Quotation.hasErrors(state)) return;

                state.step = 'customer';
                return;
            }

            if (state.step === 'customer') {
                state.errors = Quotation.validateCustomer(state.customer);
                if (Quotation.hasErrors(state)) return;

                state.step = 'processing';
                Quotation.calculate(state)
                    .then(val => {
                        state.totalAmount = val;
                        state.step = 'review';
                    });
                return;
            }

            if (state.step === 'review') {
                state.step = 'processing';
                Quotation.requestQuote(state)
                    .then(res => state.step = 'end');
            }
        },
        
        previous: () => { 
            state.step = match<string, Step>(state.step)
                .with('customer', () => 'general')
                .with('review', () => 'customer')
                .run();
        }
    }
}
