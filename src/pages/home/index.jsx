import {
    Wrapper
}from "./style/Home"
import {
    Navbar,
    Slider,
    Shopfor,
    Footer
} from "../../components"
export default function Homepage() {
  return (
    <Wrapper>
         <Navbar/>
         <Slider/>
         <Shopfor/>
         <Footer />
    </Wrapper>
  )
}
