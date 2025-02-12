import { useState, useEffect, useMemo } from 'react';

function useDebouncedMemo(factory, deps, delay) {
    const [state, setState] = useState(factory);

    useEffect(() => {
        const handler = setTimeout(() => {
            setState(factory);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, deps);

    return useMemo(() => state, [state]);
}

export default useDebouncedMemo;