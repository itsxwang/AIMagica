import { useState, useEffect } from "react";

export default function useTypingEffect(textArray: string[], typeSpeed: number, cursorBlinkTime: number) {
    const [displayText, setDisplayText] = useState('|');
    const [curArrIndex, setCurArrIndex] = useState(0);

    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(false);
    useEffect(() => {
        let interval: number;
        const arrayItem: string = textArray[curArrIndex];
        if (displayText.slice(0,-2).length === arrayItem.length && !reverse) {
            setReverse(true);
            setBlink(true);
            setTimeout(() => {
                setBlink(false);
            }, cursorBlinkTime)
            return
        } else if (displayText.length === 1 && reverse) {
            console.log(curArrIndex,'GOOD')
            if (curArrIndex < textArray.length - 1) {
                console.log(curArrIndex);
                setCurArrIndex(curArrIndex + 1);
            } else {
                console.log('end');
                setCurArrIndex(0);
            }
            setReverse(false);
        }
        // setCurArrIndex(currArrIndex+1);
        if (!blink) {
            console.log(arrayItem);
            interval = setInterval(() => {
                if (!reverse) {
                    setDisplayText(arrayItem.slice(0, displayText.slice(0, -1).length + 1) + ' |');
                } else {
                    setDisplayText(displayText.slice(0, -3) + '|');
                }

            }, typeSpeed)

        }
        else {
            interval = setInterval(() => {
                if (displayText.slice(-1) === '|') {
                    setDisplayText(displayText.slice(0, -2) + '  ');
                }
                else if (displayText.slice(-1) === ' ') {
                    setDisplayText(displayText.slice(0, -1) + '|');
                }
            }, 500);
        }

        return () => {
            clearInterval(interval);
        }

    }, [curArrIndex, textArray, typeSpeed, displayText, cursorBlinkTime, reverse,blink])


    return displayText
}