import { Col, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import ContactSer from "src/services/ContactSer"
import CommentRefuse from "../component/CommentRefuse"
import {
  StyleModalDetailRequest,
  StyleModalDetailRequestFooter,
} from "../styled"
import InforRequest from "./InforRequest"

export const COLOR = ["#00AEAC", "#FF4648", "#172B4D"]
const ModalDetailRequest = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState()
  const [detailContact, setDetailContact] = useState()
  const [form] = Form.useForm()
  const getDetailContact = async () => {
    try {
      setLoading(true)
      const res = await ContactSer.getDetailContact({
        ContactID: open?.ContactID,
      })
      if (res?.isError) return
      setDetailContact(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDetailContact()
    form.setFieldsValue({
      SupportContent: open?.record.SupportContent,
      Content: open?.record?.Content
    })
  }, [open?.record])



  const handleSubmit = async status => {
    const value = await form.validateFields()
    setLoading(true)
    let object
    object = {
      lstContactID: [open?.ContactID],
      Status: status,
      SupportContent: value?.Note,
    }
    ContactSer.confirmSupport(object)
      .then(res => {
        if (res.isOk) {
          Notice({ msg: "Cập nhật thành công" })
          onCancel()
          onOk()
        }
      })
      .finally(() => setLoading(false))
  }
  const handleUpdate = async () => {
    const value = await form.validateFields()
    setLoading(true)
    let object = {
      ContactID: open?.ContactID,
      Email: open.record?.Email,
      PhoneNumber: open?.record?.PhoneNumber,
      Address: open?.record?.Address,
      FullName: open?.record?.FullName,
      SupportContent: value?.SupportContent,
      Content: value?.Content,
      Status: open?.record?.Status,
    }
    ContactSer.UpdateContact(object)
      .then(res => {
        if (res.isOk) {
          Notice({ msg: "Cập nhật thành công" })
          onCancel()
          onOk()
        }
      })
      .finally(() => setLoading(false))
  }

  const renderFooter = () => {
    return (
      <StyleModalDetailRequestFooter>
        <Col span={24}>
          <div className="spb">
            <div className="fle">
              {!!open?.record?.IsAccept && (
                <Button
                  loading={loading}
                  btnType="primary"
                  className="btn-hover-shadow"
                  onClick={() => handleSubmit(2)}
                >
                  Xác nhận hỗ trợ
                </Button>
              )}
              {!!open?.record?.IsRefuse && (
                <Button
                  loading={loading}
                  style={{ marginLeft: "8px" }}
                  className="btn-hover-shadow"
                  btnType="third"
                  onClick={() => handleSubmit(3)}
                >
                  Từ chối
                </Button>
              )}
            </div>
          </div>
        </Col>
      </StyleModalDetailRequestFooter>
    )
  }
  const renderFooter2 = () => {
    return (
      <StyleModalDetailRequestFooter>
        <Col span={24}>
          <div className="spb">
            <div></div>
            <div className="fle">
              {!!open?.record?.IsRecall && (
                <>
                  <Button
                    loading={loading}
                    style={{ marginLeft: "8px" }}
                    className="btn-hover-shadow"
                    btnType="primary"
                    onClick={() => {
                      handleUpdate()
                    }}
                  >
                    Ghi lại
                  </Button>
                  <Button
                    loading={loading}
                    style={{ marginLeft: "8px" }}
                    className="btn-hover-shadow"
                    btnType="primary"
                    onClick={() => {
                      handleSubmit(4)
                    }}
                  >
                    Thu hồi
                  </Button>
                </>
              )}
            </div>
          </div>
        </Col>
      </StyleModalDetailRequestFooter>
    )
  }
  return (
    <CustomModal
      open={!!open}
      onCancel={onCancel}
      width={1024}
      title={`Chi tiết phiếu yêu cầu hỗ trợ`}
      footer={open?.record?.Status === 1 ? renderFooter() : renderFooter2()}
    >
      <StyleModalDetailRequest>
        <SpinCustom spinning={loading}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <InforRequest detailContact={detailContact} />
            </Col>
            <Col span={24}>
              <CommentRefuse />
            </Col>
            <Col span={24}>
              {!!(detailContact?.Status === 1) ? (
                <Form form={form} layout="vertical">
                  <Row>
                    <Col span={12}>
                      <Form.Item label="Nội dung cần hỗ trợ:" name="Content" style={{ width: '95%' }}>
                        <Input.TextArea style={{ overflow: 'auto' }} placeholder="Nhập nội dung" rows={5} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Nội dung hỗ trợ/Từ chối" name="Note">
                        <Input.TextArea style={{ overflow: 'auto' }} placeholder="Nhập nội dung" rows={5} />
                      </Form.Item>
                    </Col>
                  </Row>

                </Form>
              )
                : !!(detailContact?.Status === 2 || detailContact?.Status === 3) && (
                  <Form form={form} layout="vertical">
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Nội dung cần hỗ trợ:" name="Content" style={{ width: '95%' }}>
                          <Input.TextArea style={{ overflow: 'auto' }} placeholder="Nhập nội dung" rows={5} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Nội dung đã hỗ trợ/Từ chối:" name="SupportContent">
                          <Input.TextArea style={{ overflow: 'auto' }} placeholder="Nhập nội dung" rows={5} />
                        </Form.Item>
                      </Col>
                    </Row>

                  </Form>
                )
              }
            </Col>
          </Row>
        </SpinCustom>
      </StyleModalDetailRequest>
    </CustomModal>
  )
}

export default ModalDetailRequest
