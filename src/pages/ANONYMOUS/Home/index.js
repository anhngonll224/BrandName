import { HomeStyled } from "./styled"
import HeroSection from "./component/HeroSection"
import ListCompany from "./component/ListCompany"
import LayoutCommon from "src/components/Common/Layout"

function Dashboard() {
  return (
    <HomeStyled>
      <HeroSection />
      <LayoutCommon>
        <ListCompany />
      </LayoutCommon>
    </HomeStyled>
  )
}
export default Dashboard
