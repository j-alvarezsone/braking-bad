<script setup lang="ts">
  import CardList from '@/characters/components/CardList.vue';
  import { useQuery } from '@tanstack/vue-query';
  import type { Character } from '../interfaces/Character';
  import breakingBadApi from '../../api/breakingBadApi';

  defineProps<{
    title: string;
    visible: boolean;
  }>();

  const getCharacters = async (): Promise<Character[]> => {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data.filter((character) => ![14, 17, 39].includes(character.char_id));
  };

  const { isLoading, data: characters } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });
</script>

<template>
  <h1 v-if="isLoading">Loading....</h1>
  <template v-else>
    <h2>{{ title }}</h2>
    <CardList v-if="characters" :characters="characters" />
  </template>
</template>

<style scoped></style>
