
export const userReducer = (state,action)=>{
    switch (action.type) {
        case "INITIALIZE_LISTS":
            return {
                ...state,
                cartList: action.payload.cartList || [],
                paymentList: action.payload.paymentList || [],
                addressList : action.payload.addressList || [],
                orderList:action.payload.orderList || [],
                wishList:action.payload.wishList || []
            }
        case "ADD_TO_WISHLIST":
            return {
                ...state,
                wishList : [...state.wishList,action.payload.product]
            }
            
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishList: state.wishList.filter((p)=>p._id !== action.payload.product._id)

            }
        case "ADD_TO_CART":{
            return {
                ...state,
                cartList:[...state.cartList,action.payload]
            }
        }
        case "REMOVE_FROM_CART":{
            return {
                ...state,
                cartList:state.cartList.filter((p)=>p.product._id !== action.payload.product)
            }
        }
        case "INCREMENT_CART":{
            return{
                ...state,
                cartList:state.cartList.map((p)=> {
                    if(p.product._id ===action.payload.product){
                       return {
                        ...p,
                        quantity:p.quantity + 1
                       }
                    }
                    return p;
                })
            }
        }
        case "DECREMENT_CART":{
            return{
                ...state,
                cartList:state.cartList.map((p)=> {
                    if(p.product._id ===action.payload.product){
                       return {
                        ...p,
                        quantity:p.quantity - 1
                       }
                    }
                    return p;
                })
            }
        }
        case "UPDATE_ADDRESS":{
            return{
                ...state,
                addressList:state.addressList.map((a)=>{
                    if(a._id===action.payload._id){
                        return{
                        ...action.payload
                        }
                    }
                    return a;
                })
            }
        }
        case "FLUSH_DATA":
            return {
              cartList: [],
              wishList: [],
              paymentList: [],
              addressList: [],
              orderList: [],
            };
        default:
            break;
    }


    
}