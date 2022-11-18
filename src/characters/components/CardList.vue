<script setup lang="ts">
  import type { Character } from '../interfaces/Character';
  import CharacterCard from './CharacterCard.vue';

  defineProps<{
    characters: Character[];
  }>();
</script>

<template>
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
