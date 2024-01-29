import React, {useState} from 'react';
import './StartChatForm.scss';

interface StartChatFormProps {
    onSubmit: () => void;
}

const StartChatForm: React.FC<StartChatFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        question: ''
    });

    const isValidForm = () => {
        return formData.name && formData.email.includes('@') && formData.question;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (isValidForm()) {
            onSubmit();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="start-chat">
            <div className="start-chat__body">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className='start-chat__input'
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className='start-chat__input'
                    required
                />
                <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Your Question"
                    className='start-chat__textarea'
                    required
                />
            </div>
            <button type="submit" className='start-chat__btn' disabled={!isValidForm()}>Start React Chat</button>
        </form>
    );
};

export default StartChatForm;