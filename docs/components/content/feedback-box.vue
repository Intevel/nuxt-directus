<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { ref } from 'vue'

const isSubmitted = ref(false)

function submitFeedback (feedback: string) {
  useTrackEvent('feedback', { props: { path: useRoute().path, feedback } })
  isSubmitted.value = true
}
</script>

<template>
  <div class="feedback-box-wrapper">
    <div v-if="!isSubmitted">
      <p>What do you think?</p>
      <h2>How helpful was this article?</h2>
      <div class="feedback-box-list">
        <div class="feedback-box-item" @click="submitFeedback('Worst Doc ever 🥲')">
          <h3>Worst Doc ever 🥲</h3>
        </div>
        <div class="feedback-box-item" @click="submitFeedback('Not helpful 🤬')">
          <h3>Not helpful 🤬</h3>
        </div>
        <div class="feedback-box-item" @click="submitFeedback('Helpful 😊')">
          <h3>Helpful 😊</h3>
        </div>
        <div class="feedback-box-item" @click="submitFeedback('Super Helpful 😍')">
          <h3>Super Helpful 😍</h3>
        </div>
      </div>
    </div>
    <div v-else class="transition-opacity">
      <h2>Thank you for your feedback!</h2>
    </div>
  </div>
</template>

<style scoped>
.feedback-box-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: start;
  padding: 1rem;
  border: 2px #9661ffcc dashed;
  border-radius: 5px;
}

p {
  color: gray;
  font-size: 1rem;
}

h2 {
  font-size: 1.2rem;
  font-weight: bold;
}

.feedback-box-list {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 1rem;
}

.feedback-box-item {
  padding: 0.3rem 0.5rem;
  border: 2px #3c3c3c6c solid;
  border-radius: 10px;
  margin-right: 0.8rem;
}

.feedback-box-item:hover {
  cursor: pointer;
  background-color: #9661ff;
  color: white;
}

</style>
