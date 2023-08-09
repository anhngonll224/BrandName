import LayoutCommon from "src/components/Common/Layout"
import SpinCustom from "src/components/Spin"
import ContactInfo from "./component/ContactInfo"
import FormContact from "./component/FormContact"
import Maps from "./component/Maps"
import { ContactStyled } from "./styled"
import { useSelector } from "react-redux"
const Contact = () => {
  const { footer } = useSelector(state => state.banner)
  return (
    <ContactStyled>
      <LayoutCommon>
        <FormContact />
        <ContactInfo />
        <div
          className="map-contact"
          dangerouslySetInnerHTML={{
            __html: footer?.Map || "",
          }}
        />
      </LayoutCommon>
    </ContactStyled>
  )
}
export default Contact
