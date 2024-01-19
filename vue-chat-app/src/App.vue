<template>
  <div>
    <chat-start-form v-if="step === ChatStep.StartChatForm" @submitted="step = ChatStep.Chat"></chat-start-form>
    <chat v-else-if="step === ChatStep.Chat"></chat>
  </div>
</template>

<script>
import ChatStartForm from './components/ChatStartForm.vue';
import Chat from './components/Chat.vue';
import {ChatStep} from "@/interfaces/ChatStep";

const PARENT_ORIGIN = 'http://localhost:63342';

export default {
  components: {
    ChatStartForm,
    Chat
  },
  data() {
    return {
      step: ChatStep.StartChatForm
    };
  },
  methods: {
    applyCustomStyles(customStyles) {
      Object.keys(customStyles).forEach(key => {
        document.documentElement.style.setProperty(key, customStyles[key]);
      });
    }
  },
  mounted() {
    window.addEventListener('message', (event) => {
      if (event.origin !== PARENT_ORIGIN) {
        return;
      }
      if (event.data?.customStyles) {
        this.applyCustomStyles(event.data.customStyles);
      }
    });
  },
  computed: {
    ChatStep() {
      return ChatStep
    }
  }
};
</script>

<style>
:root {
  --btn-primary-color: #349BB1;
}
</style>