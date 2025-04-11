import { useState } from 'react';
import { LuBot, LuSendHorizontal } from 'react-icons/lu';
import useChatBot from '../hooks/useChatBot';
import Markdown from 'react-markdown';
import useChatScroll from '../hooks/useChatScroll';

const ChatComponents = () => {
	const [input, setInput] = useState('');
	const { messages, sendMessage } = useChatBot();

	const ref = useChatScroll(messages);

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim()) {
			sendMessage(input);
			setInput('');
		}
	};
	return (
		<div className=" flex flex-col h-[80vh] bg-white">
			<h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center items-center gap-2">
				OpenAI Chatbot <LuBot size={25} />
			</h2>
			<div ref={ref} className="flex-1 overflow-auto p-4 space-y-2">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`p-3 rounded-lg ${
							msg.sender === 'user'
								? 'bg-blue-500 text-white ml-auto'
								: 'bg-gray-300 text-gray-800 mr-auto'
						} max-w-[80%] whitespace-pre-wrap break-words overflow-x-auto`}
					>
						<Markdown>{msg.text}</Markdown>
					</div>
				))}
			</div>
			<form onSubmit={handleSend} className="flex items-center p-4 bg-gray-50">
				<input
					type="text"
					className="flex-1 p-2 border rounded-lg focus:outline-none"
					placeholder="Your message here"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit" className="px-2">
					<LuSendHorizontal size={25} />
				</button>
			</form>
		</div>
	);
};

export default ChatComponents;
