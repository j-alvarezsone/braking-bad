<script setup lang="ts">
  import { toRefs } from 'vue';
  import type { Character } from '../interfaces/Character';

  const props = defineProps<{
    character: Character;
  }>();

  // const replaceByDefaultImage = (event: Event) => {
  //   const target = event.target as HTMLImageElement;
  //   target.src = 'https://via.placeholder.com/150';
  // };

  const { img, name } = toRefs(props.character);
</script>

<template>
  <div class="character_card">
    <img :src="img" alt="Breaking bad images" />
    <h3>{{ name }}</h3>
  </div>
</template>

<style scoped>
  .character_card {
    /* margin-right: 5px;
    margin-left: 5px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 10px; */
  }

  img {
    width: 150px;
    max-width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.1);
  }
</style>
