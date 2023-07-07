<script setup lang="ts">
    import StepHeader from '~/components/StepHeader.vue';
    import { useQuotation } from '~/composables/use-quotation';
    import { Quotation  } from '~/lib/quotation';

    const { state, errors } = useQuotation();
</script>

<template>
<div class="flex-1 flex flex-col bg-slate-800 py-4 px-6">
    <StepHeader title="Customer Information" :step="2" />

    <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col">
            <label for="firstName" class="text-xs uppercase pb-1 text-slate-400 font-semibold">First Name</label>
            <input type="text" name="firstName" class="input"
                v-model="state.customer.firstName" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(errors, 'firstName') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="lastName" class="text-xs uppercase pb-1 text-slate-400 font-semibold">Last Name</label>
            <input type="text" name="lastName" class="input"
                v-model="state.customer.lastName" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(errors, 'lastName') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="email" class="text-xs uppercase pb-1 text-slate-400 font-semibold">E-mail</label>
            <input type="email" name="email" class="input"
                v-model="state.customer.email" />
            <span class="text-sm text-red-400">{{ Quotation.checkError(errors, 'email') }}</span>
        </div>

        <div class="flex flex-col">
            <label for="phone" class="text-xs uppercase pb-1 text-slate-400 font-semibold">Phone</label>
            <input type="text" name="phone" class="input"
                v-model="state.customer.phone" />
        </div>
    </div>
</div>
</template>