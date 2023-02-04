import { useState } from "react"
import { Modal, FormInput } from "../../components"
import {
    BtnContainer
} from "./style/addressModal"
import { AddressInput, DummyAddress } from "../../utils/utils"
import { useUserActions } from "../../hooks"
export default function AddressModal({ closeModal, editAddress,setAddress }) {
    const { updateAddress } = useUserActions();
    const [values, setValues] = useState(editAddress ? {
        name: editAddress.name,
        address: editAddress.address,
        city: editAddress.city,
        state: editAddress.state,
        pinCode: editAddress.pinCode,
        mobileNo: editAddress.mobileNo,

    } : {
        name: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        mobileNo: ""

    })

    let isDisabled = values.name === "" || values.address === "" || values.city === "" || values.state === "" || values.mobileNo === "";
    const submitHandler = (e) => {
        e.preventDefault();
        if(updateAddress(editAddress._id, values)){
            closeModal(false);
            setAddress({_id:editAddress._id,...values})
        }
    
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    return (
        <Modal closeModal={closeModal}>
            <h2>Edit Address</h2>
            <form onSubmit={submitHandler}>
                {
                    AddressInput.map((i) => (
                        <FormInput
                            key={i.id} 
                            {...i}
                            value={values[i.name]}
                            onChange={onChange}
                        />
                    ))
                }
                <BtnContainer>
                    <button type="submit" disabled={isDisabled}>Save</button>
                    <button onClick={() => setValues(DummyAddress)} type="button">Fill with dummy Address</button>
                </BtnContainer>
            </form>

        </Modal>
    )
}
