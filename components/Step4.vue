<script setup lang="ts">
    function reset() {
        document.location.reload();
    }
</script>

<template>
<div class="flex-1 flex flex-col justify-center items-center bg-slate-800 py-4 px-6">
    <div class="text-cyan-300 text-3xl tracking-wider py-12">Thank you! Your quotation has been submitted.</div>
    <button type="button" class="btn" @click="reset()">Go Home</button>
</div>
</template>
