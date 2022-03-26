<template>
  <div>
    <Container
      group-name="kids"
      :get-child-payload="getChildPayloadboys"
      orientation="vertical"
      @drop="onDrop($event, 'boys')"
    >
      <Draggable v-for="(boy, i) in boys" :key="boy.id">
        <div>{{ i + 1 }} -> {{ boy.data }}</div>
      </Draggable>
    </Container>
    <br />
    <Container
      group-name="kids"
      :get-child-payload="getChildPayloadgirls"
      orientation="vertical"
      @drop="onDrop($event, 'girls')"
    >
      <Draggable v-for="(girl, i) in girls" :key="girl.id">
        <div>{{ i + 1 }} -> {{ girl.data }}</div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
  name: "app",
  components: { Container, Draggable },
  data() {
    return {
      boys: [
        { id: 1, data: "yosi" },
        { id: 2, data: "meir" },
        { id: 3, data: "david" },
        { id: 4, data: "moshe" },
      ],
      girls: [
        { id: 1, data: "sara" },
        { id: 2, data: "rebeca" },
        { id: 3, data: "rachel" },
        { id: 4, data: "shifra" },
      ],
    };
  },
  methods: {
    getChildPayloadboys(index) {
      console.log(index);
      return this.boys[index];
    },
    getChildPayloadgirls(index) {
      console.log(index);
      return this.girls[index];
    },
    onDrop(dropResult, type) {
      console.log(dropResult);
      this[type] = this.applyDrag(this[type], dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      console.log('boys', this.boys)
      console.log(result);

      return result;
    },
  },
};
</script>