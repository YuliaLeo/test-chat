<template>
  <div class="chat">
    <form @submit.prevent="submit" class="chat__body">
      <div class="chat__form">
        <input type="text" placeholder="Name" v-model="form.name" />
        <input type="email" placeholder="Email" v-model="form.email" />
        <textarea placeholder="Question" v-model="form.question"></textarea>
      </div>
      <button type="submit" class="chat__start-btn" :disabled="!isValidForm">Start chat</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  emits: ['submitted'],
  setup(props, { emit }) {
    const form = reactive({
      name: '',
      email: '',
      question: ''
    });

    const isValidForm = computed(() => {
      const isNameValid = form.name.trim() !== '';
      const isEmailValid = form.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      const isQuestionValid = form.question.trim() !== '';
      return isNameValid && isEmailValid && isQuestionValid;
    });

    const submit = () => {
      if (isValidForm.value) {
        emit('submitted', true);
      }
    };

    return { form, isValidForm, submit };
  }
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-items: center;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  transition: max-height 0.3s ease-in-out;
}

.chat__icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100px;
  max-height: 50px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
}

.chat-icon__title {
  margin: 0;
}

.chat-icon__collapse {
  border: none;
  background: none;
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.chat__body {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}

.chat__form input,
.chat__form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.chat__form textarea {
  resize: none;
}

.chat__start-btn {
  padding: 10px 20px;
  background-color: var(--btn-primary-color);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 0 0 70px;
}

.chat__start-btn:disabled {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}

.chat--collapsed .chat__content {
  max-height: 0;
  border: none;
}
</style>