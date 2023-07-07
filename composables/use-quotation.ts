import { QuotationState } from "~/types.d";
import { service, initialContext, QuotationStateFlow } from "~/lib/quotation.flow";

// global state for the quotation wizard
const state = reactive<QuotationState>({
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
    }
});

// useWizard composable function
export function useQuotation() {
    const BUTTON_STEPS = ['general', 'customer', 'review'];

    const stateFlow = shallowRef<QuotationStateFlow>({
        value: 'general',
        context: initialContext
    });

    onMounted(() => service.start());

    service.onTransition((state) => {
        stateFlow.value = state;
        stateFlow.value.context.processing = state.hasTag('processing');
    });

    return {
        state,
        step: computed(() => stateFlow.value.value),
        showButtons: computed(() => BUTTON_STEPS.includes(stateFlow.value.value)),
        errors: computed(() => stateFlow.value.context.errors),
        totalAmount: computed(() => stateFlow.value.context.totalAmount),
        isProcessing: computed(() => stateFlow.value.context.processing),
        next: () => service.send({ type: 'NEXT', data: state }),
        previous: () => service.send('PREVIOUS')
    }
}
