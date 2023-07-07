<script setup lang="ts">
    import StepHeader from '~/components/StepHeader.vue';
    import { useQuotation } from '~/composables/use-quotation';
    import { Quotation  } from '~/lib/quotation';

    const { state } = useQuotation();
</script>

<template>
<div class="flex-1 flex flex-col bg-slate-800 py-4 px-6">
    <StepHeader title="General Information" :step="1" />

    <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col">
            <label for="adults" class="text-xs uppercase pb-1 text-slate-400 font-semibold">Adults</label>
            <input type="number" name="adults" class="input" 
                v-model="state.general.adults" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(state.errors, 'adults') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="children" class="text-xs uppercase pb-1 text-slate-400 font-semibold">Children</label>
            <input type="number" name="children" 
                v-model="state.general.children"
                class="input" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(state.errors, 'children') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="start" class="text-xs uppercase pb-1 text-slate-400 font-semibold">Start</label>
            <input type="date" name="start" 
                v-model="state.general.start"
                class="input" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(state.errors, 'start') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="end" class="text-xs uppercase pb-1 text-slate-400 font-semibold">End</label>
            <input type="date" name="end" 
                v-model="state.general.end"
                class="input" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(state.errors, 'end') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="plan" class="text-xs uppercase pb-1 text-slate-400 font-semibold">Plan</label>
            <select id="plan" name="plan" 
                v-model="state.general.plan"
                class="input">
                <option value="1">Silver</option>
                <option value="2">Gold</option>
                <option value="3">Platinum</option>
            </select>
        </div>
    </div>
</div>
</template>