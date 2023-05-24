
import {
    Navbar,
    Footer,
    Productcard,
    Toast,

} from "../../components"
import {
    Wrapper,
    SideBar,
    PetLabel,
    FilterClear,
    Filter,
    Clear,
    FilterContainer,
    FilterType,
    CheckBox,
    Divider,
    ProductSection,
    ProductWrapper,
    DropDown
} from "./style/browse"
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { 
    getTransformedProducts,
     DropdowmItems,
     Ratings,
     Price,
     availability } from "../../utils/utils";
import { usePetsProduct } from "../../context";
import { useScrollToTop } from "../../hooks"


export default function BrowsePage() {
    useScrollToTop();
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.getAll('searchTerm');
    const petname = query.get('petname');
    const { product, pets } = usePetsProduct();
    const [chechPetsList, setCheckPets] = useState(() => petname ? [petname] : [])
    const [checkCategoryList, setCheckCategory] = useState([]);
    const [checkavAilabilityList, setCheckAvailability] = useState([]);
    const [checkPriceList, setCheckPrice] = useState([]);
    const [checkRating, setCheckRating] = useState("");
    const [sort, setSort] = useState("Recommended");
    const history = useHistory();
    const Categories = [];
    pets.forEach(element => {
        if (chechPetsList.length > 0) {
            chechPetsList.includes(element.name) && element.services.forEach(s => !Categories.includes(s) && Categories.push(s))
        } else {
            element.services.forEach(s => !Categories.includes(s) && Categories.push(s))

        }

    });
    const Pets = pets?.map(p => p.name) || [];
    const transFormedProductList = getTransformedProducts({
        product,
        chechPetsList,
        checkCategoryList,
        checkavAilabilityList,
        checkPriceList,
        checkRating,
        sort,
        searchTerm,
    })

    const clearFilters = () => {
        setCheckPets([]);
        setCheckCategory([]);
        setCheckAvailability([]);
        setCheckPrice([]);
        setCheckRating()
        setCheckRating([]);
    }

    const clearSearchResult = () => {
        query.delete("searchTerm");
        history.push(`/shopfor?${(query.toString())}`)

    }

    return (
        <>
            <Navbar />
            <Toast imgUrl={product?.imageUrl}/>

            <Wrapper>
                <SideBar>
                    <PetLabel>{chechPetsList.length > 0 ? chechPetsList.toString() : "All"} - <span>{transFormedProductList.length}</span></PetLabel>
                    <FilterClear >
                        <Filter >FILTERS</Filter>
                        <Clear onClick={clearFilters}>CLEAR ALL</Clear>
                    </FilterClear>
                    <FilterContainer>
                        <FilterType >
                            PETS
                        </FilterType>
                        <CheckBox Categories={Pets} setCheck={setCheckPets} checkList={chechPetsList} />
                        <Divider />
                        <FilterType >
                            CATEGORIES
                        </FilterType>
                        <CheckBox Categories={Categories} setCheck={setCheckCategory} checkList={checkCategoryList} />
                        <Divider />
                        <FilterType >
                            AVAILABILITY
                        </FilterType>
                        <CheckBox Categories={availability} setCheck={setCheckAvailability} checkList={checkavAilabilityList} />
                        <Divider />
                        <FilterType >
                            PRICE RANGE
                        </FilterType>
                        <CheckBox Categories={Price} setCheck={setCheckPrice} checkList={checkPriceList} />
                        <Divider />
                        <FilterType >
                            RATING
                        </FilterType>
                        <CheckBox Categories={Ratings} setCheck={setCheckRating} checkList={checkRating} type={"radio"} />
                    </FilterContainer>
                </SideBar>
                <ProductSection>

                    {searchTerm.length > 0 && <h6> search result for {searchTerm.toString()}  <span style={{ cursor: "pointer" }} onClick={clearSearchResult}>❌</span> </h6>}
                    <DropDown DropdowmItems={DropdowmItems} setSort={setSort}></DropDown>
                    <ProductWrapper>
                        {transFormedProductList.map((product) => {
                            return <Productcard key={product._id} data={product} />
                        })}

                    </ProductWrapper>
                </ProductSection>

            </Wrapper>
            <Footer />
        </>


    )
}
