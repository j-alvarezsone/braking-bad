<script setup lang="ts">
  import CardList from '@/characters/components/CardList.vue';
  import useCharacters from '../composables/useCharacters';

  defineProps<{
    title: string;
    visible: boolean;
  }>();

  const { isLoading, hasError, errorMessage, characters, count } = useCharacters();
</script>

<template>
  <h1 v-if="isLoading">Loading....</h1>
  <template v-else-if="hasError">
    <h1>Failed to load</h1>
    <p>{{ errorMessage }}</p>
  </template>
  <template v-else>
    <h2>{{ title }} - {{ count }}</h2>
    <CardList :characters="characters" />
  </template>
</template>

<style scoped></style>
