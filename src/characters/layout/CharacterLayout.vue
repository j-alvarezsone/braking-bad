<script setup lang="ts">
  import NavBar from '@/shared/components/NavBar.vue';
  import type { RouterLink } from '../../router/link-routes';
  import { characterRoute } from '../router';

  const routeLinks: RouterLink[] = characterRoute
    .children!.filter((route) => (route.props as { visible: boolean }).visible)
    .map((route) => ({
      name: route.name as string,
      path: route.path,
      title: (route.props as { title: string; visible: boolean })?.title,
    }));
</script>

<template>
  <h1>Character</h1>

  <NavBar :show-icon="false" :links="routeLinks" />
  <RouterView />
</template>

<style scoped></style>
