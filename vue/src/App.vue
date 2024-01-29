<template>
    <div>
        <chat-start-form v-if="step === ChatStep.StartChatForm" @submitted="startChat()"></chat-start-form>
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
        applyCustomStyles(styles) {
            Object.keys(styles).forEach(key => {
                document.documentElement.style.setProperty(key, styles[key]);
            });
        },
        startChat() {
            this.step = ChatStep.Chat;
        }
    },
    mounted() {
        window.addEventListener('message', (event) => {
            if (event.origin !== PARENT_ORIGIN) {
                return;
            }
            if (event.data) {
                this.applyCustomStyles(event.data);
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
    --font-family: 'Roboto', sans-serif;
    --font-size: 16px;
    --line-height: 1.5;
    --text-color: #333;
    --chat-padding: 10px;
    --chat-background-color: #fff;
    --chat-header-font-size: 20px;
    --standard-gap: 10px;
    --input-border: 1px solid #ccc;
    --input-border-radius: 4px;
    --text-area-height: 100px;
    --button-height: 60px;
    --button-font-size: 22px;
    --button-primary-color: #349BB1;
    --button-text-color: #fff;
    --disabled-btn-background-color: #ccc;
    --disabled-btn-color: #fff;
    --chat-header-background-color: #349BB1;
    --chat-header-color: #fff;
    --send-message-btn-padding: 0 20px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-family);
    font-size: var(--font-size);
    line-height: var(--line-height);
    color: var(--text-color);
  }

  h1 {
    margin: 0;
  }
</style>