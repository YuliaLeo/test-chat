<template>
    <div class="chat">
        <h1 class="chat__header">Vue Test Chat</h1>
        <div class="chat__messages">
            <div v-for="message in messages" class="message">
              <div class="message__header">
                  <span class="message__author">{{message.author}}</span>
                  <span class="message__timestamp">{{message.timestamp}}</span>
              </div>
              <div class="message__text">{{message.text}}</div>
            </div>
        </div>
        <div class="chat__new-message new-message">
            <input type="text" placeholder="Type here..." class="new-message__input" v-model="newMessage" />
            <button class="new-message__btn" @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newMessage: '',
            messages: [
                {
                    author: 'Julius Caesar',
                    timestamp: '12:44 pm',
                    text: 'Thank you for contacting our online support center. How may I assist you today?'
                }
            ]
        };
    },
  methods: {
      sendMessage() {
          if (this.newMessage.trim() !== '') {
              this.messages.push({
                  author: 'Current User',
                  timestamp: new Date().toLocaleTimeString(),
                  text: this.newMessage
              });

              this.newMessage = '';
          }
      }
  }
};
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

&__header {
   background-color: var(--chat-header-background-color);
   color: var(--chat-header-color);
   padding: var(--chat-padding);
   font-size: var(--chat-header-font-size);
 }

&__messages {
   flex: 1 1 auto;
   overflow-y: scroll;
 }
}

.message {
  display: grid;
  gap: var(--standard-gap);
  padding: var(--chat-padding);

&__header {
   display: flex;
   justify-content: space-between;
 }

&__author {
   font-weight: bold;
 }
}

.new-message {
  display: flex;
  padding: var(--chat-padding);

&__input {
   flex: 1 1 auto;
   padding: var(--chat-padding);
 }

&__btn {
   background-color: var(--button-primary-color);
   color: var(--button-text-color);
   border: none;
   padding: var(--send-message-btn-padding);
   cursor: pointer;
 }
}
</style>