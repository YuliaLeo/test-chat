import React, { useState, useEffect } from 'react';
import StartChatForm from './components/start-chat-form/StartChatForm';
import Chat from './components/chat/Chat';

const PARENT_ORIGIN = 'http://localhost:63342';

enum Step {
  StartChatForm = 'StartChatForm',
  Chat = 'Chat'
}

const App: React.FC = () => {
  const [step, setStep] = useState(Step.StartChatForm);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== PARENT_ORIGIN) {
        return;
      }

      if (event.data?.customStyles) {

        applyCustomStyles(event.data.customStyles);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const applyCustomStyles = (customStyles: Record<string, string>) => {
    Object.keys(customStyles).forEach(key => {
      document.documentElement.style.setProperty(key, customStyles[key]);
    });
  };

  return (
      <div>
        {step === Step.StartChatForm && <StartChatForm onSubmit={() => setStep(Step.Chat)} />}
        {step === Step.Chat && <Chat />}
      </div>
  );
};

export default App;
