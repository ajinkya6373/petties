import { useEffect, useRef } from "react";
import {
    ToastContainer,
    Image
} from "./style/toast"
import { useUserAuth } from "../../context";
export default function Toast({imgUrl }) {
    const {  
        toastMsg,
        toastType, 
        setToastMsg,
        setToastType, } = useUserAuth();
    const toastRef = useRef(null);
    useEffect(() => {
        if (toastMsg.length > 0) { 
            toastRef.current.style.display = "flex"; 
        }
        let timerid = setTimeout(() => {
            toastRef.current.style.display = "none";
            setToastMsg("")
            setToastType("")
        }, 2000);

        return () => {
            clearTimeout(timerid);
        };
    }, [toastMsg, toastType]);

    return (
        <ToastContainer
            ref={toastRef}
            style={{display: toastMsg ? "flex" : "none"}}
            toastMsg
            toastType={toastType}
        >
            {imgUrl && <Image src={imgUrl} alt="product" />}
            {toastMsg}
            <img src="/assets/Icons/cross.svg" alt="close"
                style={{ "marginLeft": "18px", "cursor": "pointer","marginRight":"10px"}}
                onClick={() => toastRef.current.style.display = "none"} />
        </ToastContainer>
    );
};