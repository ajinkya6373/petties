import { createContext,useContext,useState} from "react";

const PetsProductContext = createContext();

export const PetsProductProvider=({children})=> {
 const [product , setProduct] = useState([]);
 const [pets ,setPets] = useState([]);
  return (
    <PetsProductContext.Provider value={{
        product,
        setProduct,
        pets,
        setPets

    }}>
        {children}
    </PetsProductContext.Provider>
  )
}

export const usePetsProduct = () => useContext(PetsProductContext);