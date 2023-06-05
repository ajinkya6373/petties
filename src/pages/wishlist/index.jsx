import { useUserData } from "../../context"
import { Footer, Navbar, Productcard, Toast } from '../../components';
import { WishlistWrapper } from "./wishlist";
export default function WishListPage() {
 const { userData:{wishList} } = useUserData();
  return (
    <>
      <Navbar/>
      <Toast/>
      <WishlistWrapper>
        {
          wishList.length>0
          ? wishList.map((p)=>{
                return <Productcard key={p._id} data={p}/>
            })
            : <h4>No products in wishList</h4>
        }
      </WishlistWrapper>
        <Footer/>
    </>
  )
}
