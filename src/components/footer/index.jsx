

import {
    Wrapper,
    InfoSection,
    SectionTitle,
    Divider,
    Item,
    Label,
    Icon,
    Dot

} from "./style/footer"

export default function Footer() {
    return (
        <Wrapper>
            <InfoSection>
                <SectionTitle>Other links</SectionTitle>
                <Divider />
                <Item >
                    <Dot />
                    <Label>Brand</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>Delivary</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>Privacy Policy</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>Secure payment</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>Return Policy</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>Legal Notice</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>FAQ</Label>
                </Item>
                <Item >
                    <Dot />
                    <Label>About Us</Label>
                </Item>


            </InfoSection>
            <InfoSection>
                <SectionTitle>Contact us</SectionTitle>
                <Divider />
                <Item >
                    <Icon src="/assets/Icons/location.svg" />
                    <Label>Location</Label>
                </Item>
                <Divider />
                <Item >
                    <Icon src="/assets/Icons/phone.svg" />
                    <Label>8856953275</Label>
                </Item>
                <Divider />
                <Item >
                    <Icon src="/assets/Icons/mail.svg" />
                    <Label>info@petties.com</Label>
                </Item>


            </InfoSection>
            <InfoSection>
                <SectionTitle>Social Media</SectionTitle>
                <Divider />
                    <Icon src="/assets/Icons/fb.svg" social />
                    <Icon src="/assets/Icons/tw.svg" social/>
                    <Icon src="/assets/Icons/in.svg" social/>
                    <Icon src="/assets/Icons/yt.svg" social/>
           
            </InfoSection>
        </Wrapper>
    )
}
