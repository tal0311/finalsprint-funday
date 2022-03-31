<template>
  <section class="task-updates">
    <textarea
      type="text"
      v-model="commentText"
      placeholder="Write an update..."
      @keydown.enter="addTaskComment"
    />

    <div class="activity-action-container flex">
      <button class="update" @click="addTaskComment">Update</button>
    </div>
    <ul class="update-list clean-list">
      <li v-for="(comment, idx) in task.comments" :key="idx">
        <h4 class="comment-title">{{ comment.creator }}</h4>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-updates',
  emits: ['addTaskComment'],
  props: {
    task: Object,
  },
  data() {
    return {
      commentText: null,
      writing: false,
    }
  },
  methods: {
    addTaskComment() {
      this.$emit('addTaskComment', this.commentText)
    },
  },
}
</script>
