<script setup lang="ts">
  import CardList from '@/characters/components/CardList.vue';

  defineProps<{
    title: string;
    visible: boolean;
  }>();
</script>

<template>
  <h1>{{ title }}</h1>
  <CardList />
</template>

<style scoped></style>
