<template>
<h2>{{year}} Draft</h2>
<p>Draft data currenly unavailable</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: "MyDraft",
    props: {
    year: String,
    },
    })
</script>

<style scoped>
h2 {
    margin-left: 5px;
  }
p {
    margin-left: 5px;
  }
</style>