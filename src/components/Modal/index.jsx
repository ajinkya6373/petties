
import {
    ModalWrapper,
    ModalContainer,
    Close
} from "./style/modal"
export default function Modal({closeModal,children}){

    return (
        <ModalWrapper>
                <Close src="/assets/Icons/cross.svg" alt="close" onClick={()=>closeModal(false)}/>
            <ModalContainer >
             {children}
            </ModalContainer>
            
        </ModalWrapper>
    )
}
