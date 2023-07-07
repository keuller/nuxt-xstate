<script setup lang="ts">
    defineProps({
        step: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            default: ""
        }
    })
</script>

<template>
<div class="flex justify-between items-center pb-4">
    <h1 class="text-3xl text-left text-cyan-400 font-semibold tracking-wide">{{title}}</h1>
    <div class="text-xl"><span class="font-bold text-cyan-400">{{step}}</span> <span class="text-slate-400">/ 3</span></div>
</div>
</template>