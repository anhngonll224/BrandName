import { Col, Row, Collapse } from "antd"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import CustomerContactService from "src/services/CustomerContactService"
import styled from "styled-components"
import ModalInsertUpdateCustomer from "./ModalInsertUpdateCustomer"
import moment from "moment"
import ListBrandName from "../../ListBrandName"
const Styled = styled.div`
  .box-info {
    background: #f7f7f7;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 16px;
  }
`
const CustomerDetail = ({ open, onCancel, customerInfo, onOk, pagination }) => {
  const [loading, setLoading] = useState(false)
  const [openInsert, setOpenInsert] = useState(false)
  const footer = (
    <div className="d-flex justify-content-flex-end">
      <Button
        loading={loading}
        btnType="primary"
        onClick={() => {
          setOpenInsert(customerInfo)
        }}
      >
        Sửa
      </Button>
      <Button
        loading={loading}
        onClick={() => {
          onReset(customerInfo?.UserID)
        }}
      >
        Reset mật khẩu
      </Button>
    </div>
  )

  const onReset = async UserID => {
    const res = await CustomerContactService.resetPassword({ UserID })
    if (res?.isError) return
    Notice({ msg: "Reset mật khẩu thàng công !" })
    onCancel()
  }
  return (
    <CustomModal
      footer={footer}
      open={!!open}
      onCancel={onCancel}
      title={
        !!customerInfo.TaxCode
          ? "Chi tiết Doanh nghiệp/ Tổ chức"
          : "Chi tiết khách hàng"
      }
    >
      <Styled>
        <div className="box-info">
          <Row gutter={[20, 8]}>
            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Tên đăng nhập:</span>{" "}
                {customerInfo?.UserName}
              </span>
            </Col>
            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Tên khách hàng:</span>{" "}
                {customerInfo?.FullName}
              </span>
            </Col>

            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Số điện thoại:</span>{" "}
                {customerInfo?.PhoneNumber}
              </span>
            </Col>

            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Email:</span> {customerInfo?.Email}
              </span>
            </Col>
            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Địa chỉ:</span>{" "}
                {customerInfo?.FullAddress}
              </span>
            </Col>

            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Trạng thái:</span>{" "}
                {customerInfo?.IsActive ? "Đang hoạt động" : "Không hoạt động"}
              </span>
            </Col>
            <Col md={12} xs={24}>
              <span>
                <span className="fw-600">Ngày sinh:</span>{" "}
                {!!customerInfo?.Birthday
                  ? moment(customerInfo?.Birthday)?.format("DD-MM-YYYY")
                  : ""}
              </span>
            </Col>
            {!!customerInfo?.TaxCode ? (
              <Col md={12} xs={24}>
                <span>
                  <span className="fw-600">Mã số thuế:</span>{" "}
                  {customerInfo?.TaxCode}
                </span>
              </Col>
            ) : (
              <Col md={12} xs={24}>
                <span>
                  <span className="fw-600">Giới tính:</span>
                  {customerInfo?.Sex === 1
                    ? " Nam"
                    : customerInfo?.Sex === 2
                    ? " Nữ"
                    : " Khác"}
                </span>
              </Col>
            )}
            {/* table list brandname đã sở hữ*/}
            <Col span={24}></Col>
          </Row>
        </div>
        <div className="mt-16">
          <Collapse>
            <Collapse.Panel
              header={
                <div
                  className="text-uppercase fw-600"
                  style={{ color: "#154398" }}
                >
                  Danh sách tên định danh đang sử dụng
                </div>
              }
            >
              <ListBrandName IsAdmin={true} customerInfo={customerInfo} />
            </Collapse.Panel>
          </Collapse>
        </div>
      </Styled>

      {!!openInsert && (
        <ModalInsertUpdateCustomer
          pagination={pagination}
          open={openInsert}
          onCancel={() => setOpenInsert(false)}
          onOk={onOk}
        />
      )}
    </CustomModal>
  )
}

export default CustomerDetail
