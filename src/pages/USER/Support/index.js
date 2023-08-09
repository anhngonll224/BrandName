import LayoutCommon from "src/components/Common/Layout"
import { SupportStyle } from "./styled"
import { Row, Col, Form } from "antd"
import Button from "src/components/MyButton/Button"
import CommonQuestion from "./CommonQuestion"
import { useState } from "react"
import MyQuestion from "./MyQuestion"
import SvgIcon from "src/components/SvgIcon"

const Support = () => {
  const [isMyQuestion, setIsMyQuestion] = useState(false)
  return (
    <SupportStyle>
      <Row className="pt-10 pl-10 pr-10" justify="space-between">
        <Col>
          {isMyQuestion && (
            <div
              className="d-flex-start button-back"
              onClick={() => setIsMyQuestion(false)}
            >
              <SvgIcon name="key-previous" />
              <span className="fw-700 sub-color">Câu hỏi phổ biến</span>
            </div>
          )}
        </Col>
        <Col>
          {/* {!isMyQuestion && (
            <Button
              btnType="primary"
              className="button"
              onClick={() => setIsMyQuestion(true)}
            >
              Xem các yêu cầu đã gửi
            </Button>
          )} */}
        </Col>
      </Row>
      <MyQuestion />
      <br />
      <hr style={{ width: '80%' }} />
      <br />
      <CommonQuestion />
    </SupportStyle>
  )
}
export default Support
