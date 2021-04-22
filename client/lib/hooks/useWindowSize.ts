import {useEffect, useState} from "react";

export interface IWindowDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

export default function useWindowSize(): IWindowDimensions {
    const [windowSize, setWindowSize] = useState<IWindowDimensions>({
        width: 1200,
        height: 800,
        isMobile: false
    });

    const eventHandler = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile: window.innerHeight > window.innerWidth
        });
    }

    useEffect(() => {
        window.addEventListener("resize", eventHandler);

        return () => {
            window.removeEventListener('resize', eventHandler)
        }
    }, []);

    return windowSize
}
