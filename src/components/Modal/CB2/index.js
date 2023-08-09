import SvgIcon from "src/components/SvgIcon"

import { ModalStyled, ModalWrapper } from "./styled"
import "./styled.scss"
import { Form, Input } from "antd"
export default function CB2({
  width = 600,
  title,
  formCB2,
  notify,
  nameFormItem = "Reason",
  titleFormItem = "Vui lòng nhập căn cứ xoá Hồ sơ/Tài liệu",
  requiredFormItem = true,
  icon = "warning-usb",
  okText = "Đồng ý",
  cancelText = "Đóng",
  onOk = e => e(),
  ...props
}) {
  formCB2.resetFields()
  ModalStyled.confirm({
    icon: null,
    okText,
    cancelText,
    width,
    onOk,
    maskClosable: true,
    okButtonProps: {
      style: {
        fontWeight: 700,
        borderRadius: 4,
        height: 40,
        background: `#154398`,
      },
    },
    cancelButtonProps: {
      style: {
        fontWeight: 700,
        borderRadius: 4,
        height: 40,
        color: `#154398`,
        border: "1px solid #154398",
      },
    },
    wrapClassName: "cb2",
    ...props,
    content: (
      <ModalWrapper className="form-item-fw-600 d-flex justify-content-center align-items-center flex-column">
        <div className="title-cb2">
          {!!title && (
            <div
              className="textTitle"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>
        <div className="trashCan">
          <SvgIcon name={icon} />
        </div>
        {!!notify ? <div>{notify()}</div> : <></>}
        {!!formCB2 ? (
          <div style={{ width: "100%", padding: " 8px 16px 0px 16px" }}>
            <Form form={formCB2} layout="vertical">
              <Form.Item
                label={titleFormItem}
                name={nameFormItem}
                rules={[
                  {
                    required: requiredFormItem,
                    message: "Thông tin không được để trống!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Nhập"
                  style={{ height: "150px", overflow: "hidden auto" }}
                ></Input.TextArea>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <></>
        )}
      </ModalWrapper>
    ),
  })
}
