<template>
  <div class="chat">
    <div class="chat__header">
      <span class="chat__title">Test</span>
    </div>
    <div class="chat__messages">
      <div v-for="message in messages" :key="message.timestamp" class="message">
        <span class="message__author">{{ message.author }}</span>
        <span class="message__timestamp">{{ message.timestamp }}</span>
        <div class="message__text">{{ message.text }}</div>
      </div>
    </div>
    <div class="chat__new-message">
      <input type="text" placeholder="Type here..." class="chat__input" v-model="newMessage" />
      <button class="chat__button" @click="sendMessage">Send</button>
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

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid #ccc;
}
.chat__header {
  background-color: #349BB1;
  padding: 10px;
}
.chat__title {
  color: white;
}
.chat__messages {
  flex: 1 1 auto;
}
.chat__new-message {
  display: flex;
  padding: 10px;
}
.chat__input {
  flex-grow: 1;
  margin-right: 10px;
}
.chat__button {
  background-color: #349BB1;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.chat__button:hover {
  background-color: #C1EEF7;
}
.message {
  padding: 10px;
}
.message__author {
  font-weight: bold;
}
.message__timestamp {
  float: right;
  opacity: 0.6;
}
.message__text {
  display: block;
  clear: both;
}
</style>