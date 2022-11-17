<script setup lang="ts">
  import { useCharacters } from '../composables/useCharacters';
  const { characters, isLoading, errorMessage, hasError } = useCharacters();
</script>

<template>
  <h1 v-if="isLoading">Loading....</h1>
  <h1 v-if="hasError">{{ errorMessage }}</h1>
  <ul>
    <li v-for="{ char_id, name } of characters" :key="char_id">
      {{ name }}
    </li>
  </ul>
</template>

<style scoped></style>
