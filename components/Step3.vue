<script setup lang="ts">
    import { Quotation } from '~/lib/quotation';
    import { useQuotation } from '~/composables/use-quotation';
    import StepHeader from '~/components/StepHeader.vue';

    const { state, totalAmount } = useQuotation();
</script>

<template>
<div class="flex-1 flex flex-col bg-slate-800 py-4 px-6">
    <StepHeader title="Review" :step="3" />

    <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col">
            <label for="adults" class="text-xs uppercase text-slate-500 font-semibold">Adults</label>
            <span class="px-1 py-2 text-sm text-gray-300 font-bold">{{ state.general.adults }}</span>
        </div>

        <div class="flex flex-col">
            <label for="children" class="text-xs uppercase text-slate-500 font-semibold">Children</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.general.children }}</span>
        </div>

        <div class="flex flex-col">
            <label for="start" class="text-xs uppercase text-slate-500 font-semibold">Start</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.general.start }}</span>
        </div>

        <div class="flex flex-col">
            <label for="end" class="text-xs uppercase text-slate-500 font-semibold">End</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.general.end }}</span>
        </div>

        <div class="flex flex-col">
            <label for="plan" class="text-xs uppercase text-slate-500 font-semibold">Plan</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ Quotation.plan(state.general.plan) }}</span>
        </div>

        <div>&nbsp;</div>

        <div class="flex flex-col">
            <label for="end" class="text-xs uppercase text-slate-500 font-semibold">First Name</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.customer.firstName }}</span>
        </div>

        <div class="flex flex-col">
            <label for="plan" class="text-xs uppercase text-slate-500 font-semibold">Last Name</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.customer.lastName }}</span>
        </div>

        <div class="flex flex-col">
            <label for="end" class="text-xs uppercase text-slate-500 font-semibold">E-mail</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.customer.email }}</span>
        </div>

        <div class="flex flex-col">
            <label for="plan" class="text-xs uppercase text-slate-500 font-semibold">Phone</label>
            <span class="py-2 text-sm text-gray-300 font-bold">{{ state.customer.phone }}</span>
        </div>

        <div class="flex items-center justify-between col-span-2 border border-transparent border-t-slate-400 py-2">
            <span class="font-semibold text-slate-300 uppercase">Total Amount</span>
            <span class="font-bold text-slate-300">{{ totalAmount.toFixed(2) }}</span>
        </div>
    </div>
</div>
</template>