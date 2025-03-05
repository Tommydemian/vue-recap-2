<template>
  <nav class="flex items-center justify-start gap-x-2">
    <RouterLink class="text-gray-50 opacity-50" active-class="active-link" to="/">Home</RouterLink>
    <RouterLink class="text-gray-50 opacity-50" active-class="active-link" to="/about"
      >About</RouterLink
    >
    <RouterLink class="text-gray-50 opacity-50" active-class="active-link" to="/users"
      >Users</RouterLink
    >
  </nav>
</template>

<style lang="css" scoped>
.active-link {
  opacity: 1;
}
</style>
