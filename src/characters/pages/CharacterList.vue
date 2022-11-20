<script setup lang="ts">
  import CardList from '@/characters/components/CardList.vue';
  import { useQuery } from '@tanstack/vue-query';
  import type { Character } from '../interfaces/Character';
  import breakingBadApi from '../../api/breakingBadApi';
  import characterStore from '../../store/characters';

  defineProps<{
    title: string;
    visible: boolean;
  }>();

  const getCharactersCacheFirst = async (): Promise<Character[]> => {
    if (characterStore.characters.count > 0) {
      return characterStore.characters.list;
    }

    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
  };

  useQuery({
    queryKey: ['characters'],
    queryFn: getCharactersCacheFirst,
    onSuccess: (data) => {
      characterStore.loadedCharacters(data);
    },
  });
</script>

<template>
  <h1 v-if="characterStore.characters.isLoading">Loading....</h1>
  <template v-else-if="characterStore.characters.hasError">
    <h1>Failed to load</h1>
    <p>{{ characterStore.characters.errorMessages }}</p>
  </template>
  <template v-else>
    <h2>{{ title }}</h2>
    <CardList :characters="characterStore.characters.list" />
  </template>
</template>

<style scoped></style>
