<script setup lang="ts">
import type { Locale } from '../i18n/config'
import { ref } from 'vue'
import { matchResponse } from '../lib/eliza'

const { lang, placeholder, prompt } = defineProps<{
  lang: Locale
  placeholder: string
  prompt: string
}>()

interface Line {
  question: string
  answer: string
}

const query = ref('')
const lines = ref<Line[]>([])
const focused = ref(false)

function ask() {
  const question = query.value.trim()
  if (!question)
    return

  lines.value.push({ question, answer: matchResponse(question, lang) })
  query.value = ''
}
</script>

<template>
  <div class="eli-query">
    <ul v-if="lines.length" class="eli-log" aria-live="polite">
      <li v-for="(line, i) in lines" :key="i">
        <p class="eli-question">
          <span class="sigil">&gt;</span> {{ line.question }}
        </p>
        <p class="eli-answer">
          {{ line.answer }}
        </p>
      </li>
    </ul>
    <form class="eli-form" @submit.prevent="ask">
      <label class="visually-hidden" for="eli-input">{{ prompt }}</label>
      <span class="sigil" aria-hidden="true">&gt;</span>
      <span class="input-wrap">
        <span v-if="!query && !focused" class="idle-cursor" aria-hidden="true" />
        <input
          id="eli-input"
          v-model="query"
          type="text"
          autocomplete="off"
          spellcheck="false"
          :placeholder="placeholder"
          @focus="focused = true"
          @blur="focused = false"
        >
      </span>
    </form>
  </div>
</template>

<style scoped>
.eli-query {
  margin-top: 0.75rem;
}

.eli-log {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.eli-question {
  margin: 0;
  color: var(--fg-dim);
}

.eli-answer {
  margin: 0.15rem 0 0;
}

.eli-form {
  display: flex;
  align-items: baseline;
  gap: 0.5ch;
}

.sigil {
  color: var(--fg-dim);
}

.input-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
}

.idle-cursor {
  position: absolute;
  left: 0;
  top: 0.1em;
  width: 0.6ch;
  height: 1em;
  background: var(--fg);
}

@media (prefers-reduced-motion: no-preference) {
  .idle-cursor {
    animation: idle-cursor-blink 1.05s steps(1, end) infinite;
  }
}

@keyframes idle-cursor-blink {
  50% {
    opacity: 0;
  }
}

.eli-form input {
  width: 100%;
  padding-left: 1.2ch;
  background: transparent;
  border: 0;
  color: var(--fg);
  font: inherit;
  caret-color: var(--fg);
}

.eli-form input::placeholder {
  color: var(--fg-dim);
}

.eli-form input:focus {
  outline: none;
}

.eli-form:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
