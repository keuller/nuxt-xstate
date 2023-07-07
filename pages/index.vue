<script setup lang="ts">
    import { useQuotation } from "~/composables/use-quotation";
    import Loading from "~/components/Loading.vue";
    import Step1 from "~/components/Step1.vue";
    import Step2 from "~/components/Step2.vue";
    import Step3 from "~/components/Step3.vue";
    import Step4 from "~/components/Step4.vue";

    const { state, showButtons, next, previous } = useQuotation();
</script>

<template>
<main class="flex-1 flex flex-col items-center">
    <h1 class="text-3xl text-center text-cyan-400 font-bold tracking-wide py-8">Quotation</h1>

    <div class="flex flex-col bg-slate-800 border border-gray-800 rounded-lg w-[52rem] min-h-[23rem] overflow-hidden">
        <Loading v-show="state.step === 'processing'" />

        <Step1 v-show="state.step === 'general'" />

        <Step2 v-show="state.step === 'customer'" />

        <Step3 v-show="state.step === 'review'" />

        <Step4 v-show="state.step === 'end'" />

        <div v-show="showButtons" class="flex items-center justify-between pt-2 pb-4 px-6 gap-4">
            <button type="button" class="btn" 
                :disabled="state.step === 'general'" 
                @click="previous">
                Previous
            </button>
            <button type="button" class="btn" @click="next">
            {{ state.step === 'review' ? 'request' : 'next' }}
            </button>
        </div>
    </div>
</main>
</template>
