<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import type { Character } from '../interfaces/Character';
  import breakingBadApi from '../../api/breakingBadApi';
  import CharacterCard from './CharacterCard.vue';

  const getCharactersSlow = async (): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data.filter((character) => ![14, 17, 39].includes(character.char_id));
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
  <div class="card_list">
    <CharacterCard v-for="character of characters" :key="character.char_id" :character="character" />
  </div>
</template>

<style scoped>
  .card_list {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .card_list {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 480px) {
    .card_list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
