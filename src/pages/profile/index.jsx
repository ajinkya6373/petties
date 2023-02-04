
import { useAuth } from "../../hooks";
export default function ProfilePage() {
    const { logUserOut } = useAuth();
    const ClickHandler = () => {
        logUserOut();
    }
    return (
        <>
            <h1> profilePage</h1>
            <button onClick={ClickHandler} >log out</button>
        </>
    )
}
