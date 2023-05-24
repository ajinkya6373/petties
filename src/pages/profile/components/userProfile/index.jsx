
import { FormInput } from "../../../../components";
import { ProfileWrapper } from "./profile";
import { useAuth } from "../../../../hooks";
import { useUserAuth } from "../../../../context";
import { Heading } from "../../profile";

export default function UserProfile() {
  const {logUserOut} = useAuth()
  const {userProfile:{email,name}} = useUserAuth()

  return (
    <ProfileWrapper>
      <Heading>Profile Details</Heading>
      <FormInput
        type="text"
        placeholder={name}
        name="name"
        id="name"
        label="Name"
        disabled={true}
      />
      <FormInput
        type="email"
        placeholder={email}
        name="name"
        id="email"
        label="Email"
        disabled={true}
      />
      <button onClick={()=>logUserOut()}>{"Sign out"} </button>
    </ProfileWrapper>
  );
}
