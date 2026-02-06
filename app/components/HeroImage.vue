<template>
  <div v-if="imageUrl" class="hero" :class="{ 'hero--compact': compact }" :style="{ backgroundImage: `url(${imageUrl})` }" />
</template>

<script setup lang="ts">
interface Props {
  imageUrl?: string | null
  compact?: boolean
}

const props = defineProps<Props>()

const imageUrl = computed(() => props.imageUrl || null)
const compact = computed(() => props.compact ?? false)
</script>

<style scoped lang="scss">
.hero {
  width: calc(100% + 2.5rem);
  margin: 0 -1.25rem 1.75rem;
  aspect-ratio: 16 / 5;
  background-size: cover;
  background-position: center;
}

.hero--compact {
  margin-bottom: 1.25rem;
}
</style>
