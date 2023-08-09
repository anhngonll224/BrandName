import { Col, Empty, Modal, Row, Select, Space } from "antd"
import { useRef, useState } from "react"
import sign from "src/assets/images/sign/handsign.png"
import img from "src/assets/images/sign/image.png"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import Button from "src/components/MyButton/Button"
import styled from "styled-components"
const SignModalStyle = styled.div`
  .title-modal-sign {
    font-size: 20px;
    color: #00bbde;
    font-weight: bold;
  }
  .sign-box {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ccc;
    padding: 24px;
  }
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
  .ant-upload-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ant-upload-list-item-container {
      width: 300px !important;
      height: 300px !important;
    }
  }
`
const ModalListSign = ({ open, onCancel }) => {
  const [listSign, setListSign] = useState([])

  return (
    <Modal
      title={"Chữ ký số"}
      open={open}
      onCancel={onCancel}
      style={{ top: "12px" }}
      width="60vw"
      footer={
        <Space size={16}>
          <Button btnType="primary" onClick={() => {}}>
            Ghi
          </Button>
        </Space>
      }
    >
      <SignModalStyle>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <FlInput
              style={{ width: "100%" }}
              search
              allowClear
              label="Nhập CMND/CCCD"
              onSearch={value => {}}
            />
          </Col>
          <Col span={4}>
            <FlSelect placeholder="Chọn" style={{ width: "100%" }}>
              {listSign?.map((i, idx) => (
                <Select.Option
                  key={i?.RoleID}
                  value={i?.RoleID}
                  title={i?.RoleName}
                >
                  {i?.RoleName}
                </Select.Option>
              ))}
            </FlSelect>
          </Col>
          <Col span={24}>
            {listSign?.length ? (
              <></>
            ) : (
              <Empty description="Không có chữ ký số" />
            )}
          </Col>
        </Row>
      </SignModalStyle>
    </Modal>
  )
}

export default ModalListSign
