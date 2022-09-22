import { useEffect, useRef } from "react";
import {
    ToastContainer,
    Image
} from "./style/toast"

export default function Toast({ msg, imgUrl, msgType }) {
    const toastRef = useRef(null);
    useEffect(() => {
        if (msg.length > 0) { 
            toastRef.current.style.display = "flex"; 
        }
        let timerid = setTimeout(() => {
            toastRef.current.style.display = "none";
        }, 2000);

        return () => {
            clearTimeout(timerid);
        };
    }, [msg, msgType]);

    return (
        <ToastContainer
            ref={toastRef}
            style={{
                display: msg ? "flex" : "none"

            }}
            msg
            msgType={msgType}
        >
            {imgUrl && <Image src={imgUrl} alt="product" />}
            {msg}
            <img src="/assets/Icons/cross.svg" alt=""
                style={{ "marginLeft": "18px", "cursor": "pointer","marginRight":"10px"}}
                onClick={() => toastRef.current.style.display = "none"} />
        </ToastContainer>
    );
};