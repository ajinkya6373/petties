import {
    Wrapper
}from "./style/Home"
import {
    Navbar,
    Slider,
    Shopfor,
    Footer,
    Toast
} from "../../components"
export default function Homepage() {
  return (
    <Wrapper>
      <Toast/>
         <Navbar/>
         <Slider/>
         <Shopfor/>
         <Footer />
    </Wrapper>
  )
}
