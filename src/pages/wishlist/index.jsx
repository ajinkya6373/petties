import { useUserData } from "../../context"
import { Footer, Navbar, Productcard, Toast } from '../../components';
import { WishlistWrapper } from "./wishlist";
export default function WishListPage() {
 const { userData } = useUserData();
  return (
    <>
      <Navbar/>
      <Toast/>
      <WishlistWrapper>
        {
            userData.wishList.map((p)=>{
                return <Productcard key={p._id} data={p}/>
            })
        }
      </WishlistWrapper>
        <Footer/>
    </>
  )
}
