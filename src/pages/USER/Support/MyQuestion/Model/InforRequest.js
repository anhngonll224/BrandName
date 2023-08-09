import { Col, Input, Row } from "antd"
import moment from "moment"
import { useSelector } from "react-redux"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import { COLOR } from "./ModalDetailRequest"
const { TextArea } = Input
const InforRequest = ({ detailContact }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const listStatus = getListComboByKey(
    SYSTEM_KEY?.SUBMIT_SUPPORT_REQUEST_STATUS,
    listSystemKey,
  )?.map(i => ({ ...i, label: i?.Description, value: i?.CodeValue }))
  return (
    <Row className={"bd-infor "}>
      {/* dong 1 */}
      <Col span={12} className="mb-16">
        <span className="title-field">Mã yêu cầu:</span>{" "}
        {detailContact?.RequestCode}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Trạng thái:</span>{" "}
        <span
          style={{
            color: `${COLOR[detailContact?.Status - 1]}`,
            fontWeight: "600",
          }}
        >
          {
            listStatus?.find(i => i?.CodeValue === detailContact?.Status)
              ?.Description
          }
        </span>
      </Col>
      {/* dong 1 */}
      {/* dong 2 */}
      <Col span={12} className="mb-16">
        <span className="title-field">Họ và tên:</span>{" "}
        {detailContact?.FullName}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Số điện thoại:</span>{" "}
        {detailContact?.PhoneNumber}
      </Col>
      {/* dong 2 */}
      {/* dong 3 */}
      <Col span={12} className="mb-16">
        <span className="title-field">Địa chỉ:</span> {detailContact?.Address}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Người trả lời:</span>{" "}
        {detailContact?.Address}
      </Col>
      {/* dong 3 */}
      {/* dong 4 */}
      <Col span={12} className="mb-16">
        <span className="title-field">Email:</span> {detailContact?.Email}
      </Col>
      <Col span={12} className="mb-16">
        <span className="title-field">Thời gian yêu cầu:</span>{" "}
        {moment(detailContact?.CreateDate).format("DD/MM/YYYY")}
      </Col>
      {/* dong 4 */}
      {/* dong 5 */}
      {/* <Col span={12} className="mb-16">

      </Col> */}
      <Col span={12} className="mb-16">
        <span className="title-field">Thời gian hỗ trợ: </span>
        {moment(detailContact?.UpdateTime).format("DD/MM/YYYY")}
      </Col>
      {/* dong 5 */}
      {/* dong 6 */}
      {/* dong 6 */}
      {/* dong 7 */}
      {/* <Col span={12} className="mb-16">
        <span className="title-field">Tiêu đề hỗ trợ:</span>{" "}
        {detailContact?.Email}
      </Col> */}
      <Col span={24} className="mb-16">
        <div className="title-field">File đính kèm:</div>
        {!!detailContact?.UrlImage?.length &&
          detailContact?.UrlImage?.map((item, idx) => (
            <a
              href={item?.FileUrl}
              target="_blank"
              rel="noreferrer"
              key={`RecruitFile${idx}`}
            >
              <i>{item?.FileName}</i>
              <span>, </span>
            </a>
          ))}
      </Col>
      {/* dong 7 */}
      {/* dong 8 */}

      <Col span={12} className="mb-16">
        <span className="title-field">Vấn đề cần hỗ trợ:</span>
        <div>{detailContact?.Content}</div>
      </Col>
      <Col span={12}>
        <span className="title-field"> Nội dung đã hỗ trợ/Từ chối:</span>
        <div>{detailContact?.SupportContent}</div>
      </Col>
    </Row>
  )
}

export default InforRequest
