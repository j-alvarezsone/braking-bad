<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import type { Character } from '../interfaces/Character';
  import characterStore from '../../store/characters';
  import breakingBadApi from '../../api/breakingBadApi';
  import { useQuery } from '@tanstack/vue-query';

  const route = useRoute();
  const { id } = route.params as { id: string };

  const getCharacterCacheFirst = async (characterId: string): Promise<Character> => {
    if (characterStore.checkIdInStore(characterId)) {
      return characterStore.ids.list[characterId];
    }

    const { data } = await breakingBadApi.get<Character[]>(`/characters/${characterId}`);
    return data[0];
  };

  const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterCacheFirst(id),
    onSuccess: (character) => {
      characterStore.loadedCharactersById(character);
    },
  });
</script>

<template>
  <h1 v-if="!character">Loading....</h1>
  <template v-else>
    <h1>Character {{ id }}</h1>
    <div class="character_container">
      <img :src="character.img" :alt="character.name" />
      <ul>
        <li>Nick name: {{ character.nickname }}</li>
        <li>Birthday: {{ character.birthday }}</li>
        <li>Category: {{ character.category }}</li>
        <li>occupation: {{ character.occupation.join(', ') }}</li>
        <li>Portrayed: {{ character.portrayed }}</li>
        <li>Status: {{ character.status }}</li>
        <li>Appearance: {{ character.appearance.join(', ') }}</li>
      </ul>
    </div>
  </template>
</template>

<style scoped>
  .character_container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    width: 150px;
    max-width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }
</style>
