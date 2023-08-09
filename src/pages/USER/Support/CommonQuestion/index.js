import { Col, Row } from "antd"
import { useState } from "react"
import { dataQuestion } from "./data"
import { CommonQuestionStyle } from "./styled"
import QuestionDrawer from "./components/QuestionDrawer"

const CommonQuestion = () => {
  const [open, setOpen] = useState(false)
  return (
    <CommonQuestionStyle>
      <Row className="d-flex-center title-type d-flex align-items-center justify-content-space-center mb-0 pb-8 pt-0">
        <div
          className="header-text"
          style={{
            color: "gray",
            fontSize: "29px",
          }}
        >
          CÁC CÂU HỎI PHỔ BIẾN NHẤT
        </div>
      </Row>
      <ul className="d-flex-center">
        <Row className="list-box ">
          {dataQuestion?.map((data, idx) => (
            <Col md={12} key={`question${idx}`}>
              <li className="title-text pointer" onClick={() => setOpen(data)}>
                {data?.TitleQuestion}
              </li>
            </Col>
          ))}
        </Row>
      </ul>

      <QuestionDrawer
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </CommonQuestionStyle>
  )
}
export default CommonQuestion
