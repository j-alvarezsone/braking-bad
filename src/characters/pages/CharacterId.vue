<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import useCharacter from '../composables/useCharacter';

  defineProps<{
    title: string;
    visible: boolean;
  }>();

  const router = useRouter();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const { character, hasError, errorMessage, isLoading } = useCharacter(id);

  watchEffect(() => {
    if (!isLoading.value && hasError.value) {
      router.replace('/characters');
    }
  });
</script>

<template>
  <h1 v-if="isLoading">Loading....</h1>
  <h1 v-else-if="hasError">{{ errorMessage }}</h1>
  <template v-else-if="character">
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
