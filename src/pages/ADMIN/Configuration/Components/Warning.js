import React, { useEffect } from "react"
import { Row, Col, Form, Modal, Space } from "antd"
import Button from "src/components/MyButton/Button"
import { WarningStyled } from "../styled"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
const Warning = () => {
  const [form] = Form.useForm()
  const [showInput, setShowInput] = useState(false)
  const data = [
    {
      ReportTime: "2 ngày trước hạn gửi",
      extensionTime: "12 ngày trước hạn gửi",
      PayTime: "12 ngày trước hạn nộp",
      timeSentWarning: "2 ngày trước hạn gửi",
      extendedWaringTime: "12 ngày trước hạn gửi",
      slowTimeWaring: "12 ngày trước hạn nộp",
    },
  ]
  useEffect(() => {
    form.setFieldsValue({
      ReportTime: data[0].ReportTime,
      extensionTime: data[0].extensionTime,
      PayTime: data[0].PayTime,
      timeSentWarning: data[0].timeSentWarning,
      extendedWaringTime: data[0].extendedWaringTime,
      slowTimeWaring: data[0].slowTimeWaring,
    })
  }, [])
  return (
    <WarningStyled>
      <Form layout="vertical" form={form}>
        <Row className="body-table">
          <Col span={24}>
            <Row>
              <Col span={22}></Col>
              <Col span={2}>
                <Button
                  style={{
                    width: "100%",
                  }}
                  btnType="primary"
                  onClick={() => setShowInput(!showInput)}
                >
                  {" "}
                  {!!showInput ? "Lưu" : "Sửa"}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col className="border-margin" span={10}>
            <Row className="border-1" gutter={[10, 5]}>
              <Col
                span={12}
                style={{
                  fontSize: "15px",
                  fonFamily: "auto",
                }}
              >
                <div>Thời gian gửi báo cáo</div>
                <div>Thời gian gia hạn</div>
                <div>Thời gian nộp phí duy trì</div>
              </Col>
              {!!showInput ? (
                <Col
                  span={12}
                  style={{
                    paddingLeft: "25px",
                    fontSize: "15px",
                    fonFamily: "auto",
                  }}
                >
                  <div>
                    <Form.Item
                      style={{ marginBottom: "6px" }}
                      name="ReportTime"
                    >
                      <FlInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      style={{ marginBottom: "6px" }}
                      name="extensionTime"
                    >
                      <FlInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="PayTime" style={{ marginBottom: "6px" }}>
                      <FlInput />
                    </Form.Item>
                  </div>
                </Col>
              ) : (
                <Col
                  span={12}
                  style={{
                    paddingLeft: "25px",
                    fontSize: "15px",
                    fonFamily: "auto",
                  }}
                >
                  <div>2 ngày trước hạn gửi</div>
                  <div>12 ngày trước hạn gửi</div>
                  <div>12 ngày trước hạn nộp</div>
                </Col>
              )}
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col className="border-margin" span={12}>
            <Row className="border-2">
              <Col
                span={12}
                style={{
                  fontSize: "15px",
                  fonFamily: "auto",
                }}
              >
                <div>Thời gian cảnh báo gửi báo cáo</div>
                <div>Thời cảnh báo gian gia hạn</div>
                <div>Thời cảnh báo chậm nộp phí duy trì</div>
              </Col>
              {!!showInput ? (
                <Col
                  span={12}
                  style={{
                    paddingLeft: "25px",
                    fontSize: "15px",
                    fonFamily: "auto",
                  }}
                >
                  <div>
                    <Form.Item
                      style={{ marginBottom: "6px" }}
                      name="timeSentWarning"
                    >
                      <FlInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      style={{ marginBottom: "6px" }}
                      name="extendedWaringTime"
                    >
                      <FlInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      name="slowTimeWaring"
                      style={{ marginBottom: "6px" }}
                    >
                      <FlInput />
                    </Form.Item>
                  </div>
                </Col>
              ) : (
                <Col
                  span={12}
                  style={{
                    paddingLeft: "25px",
                    fontSize: "15px",
                    fonFamily: "auto",
                  }}
                >
                  <div>2 ngày trước hạn gửi</div>
                  <div>12 ngày trước hạn gửi</div>
                  <div>12 ngày trước hạn nộp</div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Form>
    </WarningStyled>
  )
}

export default Warning
