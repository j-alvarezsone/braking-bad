<script setup lang="ts">
  import type { RouterLink } from '@/router/link-routes';

  interface Props {
    title?: string;
    links: RouterLink[];
    showIcon?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showIcon: true,
  });
</script>

<template>
  <nav>
    <img v-if="showIcon" src="@/assets/logo.svg" alt="Vue logo" width="25" height="25" />
    <span v-if="title">{{ title }}</span>

    <RouterLink v-for="link of links" :key="link.path" :to="{ name: link.name }">{{ link.title }}</RouterLink>
  </nav>
</template>

<style scoped>
  nav {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    margin-top: 0.5rem;
    display: flex;
    align-items: flex-start;
  }
  img {
    margin-right: 5px;
  }

  span {
    margin-right: 10px;
  }

  a {
    margin-right: 5px;
  }
</style>
