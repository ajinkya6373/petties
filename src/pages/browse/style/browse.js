import styled from "styled-components/macro";

export const Wrapper = styled.div`
display:flex;
margin-top:8px;
margin-bottom:40px;
`
export const SideBar = styled.div`
display:flex;
flex-direction: column;
min-width: 252px;
margin-left: 24px;
`

export const PetLabel = styled.span`
font-weight: 500;
font-size: 16px;
line-height: 20px;
color: #000000;
margin-bottom: 24px;
span{
    color:#999BA4;
}
`
export const FilterClear = styled.div`
display:flex;
justify-content: space-between;
margin-bottom:16px;
`
export const Filter = styled.span`
font-size: 16px;
line-height: 20px;
`
export const Clear = styled(Filter)`
color:#CC0C39;
cursor:pointer;
`
export const FilterContainer = styled.div`
border: 1px solid #D9D9D9;
width: 100%;
`
export const FilterType = styled.div`
font-weight: 500;
font-size: 14px;
line-height: 17px;
margin-left:24px;
margin-top:20px;
color: #000000;
`
export const CheckBoxContainer = styled.div`
margin-left:24px;
margin-top:18px;
margin-bottom:24px;
ul{
    list-style: none;

    li{
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        height: 17px;
        margin-bottom:8px;
        display:flex;
        align-items: center;
    }
    input{
        border: 1px solid #999BA4;
        width: 14px;
        height: 14px;
        margin-right:8px;
    }
    span{
        color:#999BA4;
    }
}
`
export const Divider = styled.div`
width:100%;
height:0px;
border: 1px solid #D9D9D9;
margin-bottom:4px;
`

export const ProductSection = styled.div`
display:flex;
flex-direction: column;
flex: 1;
`


export const ProductWrapper = styled.div`
display:flex;
flex-wrap:wrap;
row-gap:40px;

`

export const CheckBox = ({ Categories,setCheck,checkList,type}) => {
    const updateFilterList =(oldArray,value)=>{
        return oldArray.includes(value) ? oldArray.filter((i)=>i!==value) : oldArray = [...oldArray,value];
    }

    return <CheckBoxContainer >
        <ul>
            {     
                Categories.map((i) => {
                   
                    return <li key ={i}>
                      {type !== "radio" ? <input 
                        type="checkbox" 
                        value={i} 
                        onChange={(e)=>setCheck(prv =>updateFilterList(prv,e.target.value))}  
                        checked={checkList.includes(i)}
                      
                        />   :
                        <input  type="radio" value={i} onChange={(e)=>setCheck(e.target.value)} checked ={checkList===i} name="radio"/>
                            
                        }
                         {i} 
                    </li>
                })
            }
        </ul>
    </CheckBoxContainer>
}


export const DropDownContainer = styled.div`
    margin-top:46px;
    margin-right:50px;
    margin-bottom:32px;
    position:relative;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    outline: none;
    select{
        float:right;
        width: 225px;
        height: 37px;
    }
    option{
        color: #999BA4;
        margin:10px 0px 10px 9px;
        
    }
    :focus{
        outline: none;
    }
`
export const DropDown = ({ DropdowmItems,setSort}) => {
   
    return <DropDownContainer>
        <select onChange={(e)=>setSort(e.target.value)}>
            {
                DropdowmItems.map((i) => {
                    return <option value={i} key={i} >Sort by : {i}</option>
                })
            }
        </select>
    </DropDownContainer>
}