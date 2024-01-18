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
        <div className="chat">
            <form onSubmit={handleSubmit} className="chat__body">
                <div className="chat__form">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        placeholder="Your Question"
                        required
                    />
                </div>
                <button type="submit" className="chat__start-btn">Start Chat</button>
            </form>
        </div>
    );
};

export default StartChatForm;