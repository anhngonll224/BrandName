import { Spin } from "antd"
import LoadingOverlay from "src/components/LoadingOverlay"
import styled from "styled-components"
const SpinStyle = styled.div`
  .ant-spin-spinning div div {
    /* position: fixed !important; */
  }
`
export default function SpinCustom(props) {
  const { className } = props

  const spinIcon = <LoadingOverlay isLoadingTable sizeSmall />

  return (
    <SpinStyle>
      <Spin {...props} className={className} indicator={spinIcon} />
    </SpinStyle>
  )
}
