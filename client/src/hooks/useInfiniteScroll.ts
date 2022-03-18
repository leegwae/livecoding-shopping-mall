import { RefObject, useCallback, useRef, useState, useEffect } from "react"
;
const useInifniteScroll = (targetRef: RefObject<HTMLDivElement>) => { 
	const observerRef = useRef<IntersectionObserver>();
	const [intersecting, setIntersecting] = useState(false);

	const getObserver = useCallback(
		() => {
			if (!observerRef.current) {
				observerRef.current = new IntersectionObserver(entries => {
					setIntersecting(entries.some(entry => entry.isIntersecting));
				});
			}
			return observerRef.current;
		},
		[observerRef.current],
	)
	
	useEffect(() => {
		if (targetRef.current) getObserver().observe(targetRef.current);
	}, [targetRef.current]);
	
	return intersecting;
};

export default useInifniteScroll;
