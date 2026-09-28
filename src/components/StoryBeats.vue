<script setup lang="ts">
import { ref } from 'vue'

const { beats, nextLabel, fullLabel } = defineProps<{
  beats: string[]
  nextLabel: string
  fullLabel: string
}>()

const revealed = ref(1)
const done = () => revealed.value >= beats.length
</script>

<template>
  <div class="story-beats">
    <div v-for="(beat, i) in beats.slice(0, revealed)" :key="i" class="prose beat" v-html="beat" />
    <div v-if="!done()" class="beat-controls">
      <button type="button" class="beat-next" @click="revealed += 1">
        {{ nextLabel }}
      </button>
      <button type="button" class="beat-full" @click="revealed = beats.length">
        {{ fullLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.story-beats {
  display: grid;
  gap: 1rem;
}

.beat {
  animation: beat-in 0.25s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .beat {
    animation: none;
  }
}

@keyframes beat-in {
  from {
    opacity: 0;
    transform: translateY(0.35rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.beat-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.beat-controls button {
  font: inherit;
  background: transparent;
  color: var(--fg);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  padding: 0.4em 0.8em;
  cursor: pointer;
}

.beat-controls button:hover,
.beat-controls button:focus-visible {
  background: var(--fg);
  color: var(--bg);
}

.beat-full {
  color: var(--fg-dim);
}
</style>
