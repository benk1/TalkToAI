import axios from 'axios';
import { useState } from 'react';

interface Message {
	text: string;
	sender: 'user' | 'bot';
}
const apikey = import.meta.env.VITE_OPENAI_API_KEY;

const useChatBot = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const sendMessage = async (message: string) => {
		// const newMessages: Message[] = [
		// 	...messages,
		// 	{ text: message, sender: 'user' },
		// ];
		// setMessages(newMessages);
		setMessages((prev) => [...prev, { text: message, sender: 'user' }]);

		try {
			const response = await axios.post(
				'https://openrouter.ai/api/v1/chat/completions',
				{
					model: 'openai/gpt-3.5-turbo',
					messages: [
						{
							role: 'user',
							content: message,
						},
					],
				},
				{
					headers: {
						Authorization: `Bearer ${apikey}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('RESPONSE', response);
			const botMessage = response.data.choices[0].message.content;
			// setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
			setMessages((prev) => [...prev, { text: botMessage, sender: 'bot' }]);
		} catch (error) {
			console.error('Error fetching AI response:', error);
		}
	};
	return { messages, sendMessage };
};
export default useChatBot;
