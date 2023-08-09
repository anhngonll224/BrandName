import LayoutCommon from "src/components/Common/Layout"
import { PaymentStyle } from "./styled"
import { Col, Row, Tabs } from "antd"
import { useState } from "react"
import MomoQR from "src/assets/images/payment/momo.svg"

const Payment = () => {
  const [isMyQuestion, setIsMyQuestion] = useState(false)
  return (
    <PaymentStyle>
      <LayoutCommon>
        <Tabs>
          <Tabs.TabPane tab="Momo" key={1}>
            <div className="d-flex-center">
              <img
                src={MomoQR}
                style={{
                  width: "90%",
                }}
                alt="QR thanh toán"
              ></img>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Viettelpay" key={2}></Tabs.TabPane>
          <Tabs.TabPane tab="Thẻ nội địa" key={3}></Tabs.TabPane>
          <Tabs.TabPane tab="Thẻ quốc tế" key={4}></Tabs.TabPane>
        </Tabs>
      </LayoutCommon>
    </PaymentStyle>
  )
}
export default Payment
