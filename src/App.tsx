import ChatComponents from './components/ChatComponents';

const App = () => {
	return (
		<div className="max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
			<div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden"></div>
			<ChatComponents />
		</div>
	);
};

export default App;
