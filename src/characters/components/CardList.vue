<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  // import { useCharacters } from '../composables/useCharacters';
  import type { Character } from '../interfaces/Character';
  import breakingBadApi from '../../api/breakingBadApi';
  // const { characters, isLoading, errorMessage, hasError } = useCharacters();

  const getCharactersSlow = async (): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
  };

  const {
    isLoading,
    isError,
    data: characters,
    error,
  } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharactersSlow,
    refetchOnReconnect: 'always',
  });
</script>

<template>
  <h1 v-if="isLoading">Loading....</h1>
  <h1 v-if="isError">{{ error }}</h1>
  <ul>
    <li v-for="{ char_id, name } of characters" :key="char_id">
      {{ name }}
    </li>
  </ul>
</template>

<style scoped></style>
