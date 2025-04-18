import { RefObject, useEffect, useRef } from 'react';

function useChatScroll<T>(dep: T): RefObject<HTMLDivElement | null> {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [dep]);
	return ref;
}

export default useChatScroll;
