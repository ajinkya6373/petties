import React from 'react'
import { useUserAuth, useUserData } from "../../context"
import { Productard } from '../../components';
export default function WishListPage() {
 const { userDispatch, userData } = useUserData();
 console.log(userData.wishList);
  return (
    <div>
        {
            userData.wishList.map((p)=>{
                return <Productard key={p._id} data={p}/>
            })
        }

    </div>
  )
}
