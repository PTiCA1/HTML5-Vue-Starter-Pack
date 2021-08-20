<template>
    <div class="button">
        <div
            class="button__content">
            {{ msg }}
            My button
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const msg = ref('Hello')
</script>
