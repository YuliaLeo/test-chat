<template>
    <form @submit.prevent="submit" class="start-chat">
        <div class="start-chat__body">
            <input type="text" placeholder="Name" class="start-chat__input" v-model="form.name" />
            <input type="email" placeholder="Email" class="start-chat__input" v-model="form.email" />
            <textarea placeholder="Question" class="start-chat__textarea" v-model="form.question"></textarea>
        </div>
        <button type="submit" class="start-chat__btn" :disabled="!isValidForm">Start Vue chat</button>
    </form>
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

<style lang="scss" scoped>
.start-chat {
  height: 100vh;
  width: 100%;
  padding: var(--chat-padding);
  display: flex;
  flex-direction: column;
  justify-items: center;
  gap: var(--standard-gap);
  box-sizing: border-box;
  background-color: var(--chat-background-color);
}

.start-chat__body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: var(--standard-gap);
}

.start-chat__input,
.start-chat__textarea {
  width: 100%;
  padding: var(--chat-padding);
  box-sizing: border-box;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
}

.start-chat__textarea {
  resize: none;
  height: var(--text-area-height);
}

.start-chat__btn {
  flex: 0 0 var(--button-height);
  padding: var(--chat-padding);
  border: none;
  border-radius: var(--input-border-radius);
  box-sizing: border-box;
  font-size: var(--button-font-size);
  background-color: var(--button-primary-color);
  color: var(--button-text-color);
  cursor: pointer;

&:disabled {
   background-color: var(--disabled-btn-background-color);
   color: var(--disabled-btn-color);
   cursor: not-allowed;
 }
}
</style>