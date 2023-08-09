import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Col, Row } from "antd"
import moment from "moment"

export const SetCommentComp = ({ item, index }) => {
  return (
    <div key={index} className="wrap-comment">
      <Row className="p-5">
        <Col className="p-5">
          <Avatar size={32} icon={<UserOutlined />} src={item?.Avatar} />
        </Col>
        <Col className="pl-5">
          <Row className="pb-5">
            <div className="fw-700 pr-5">{item?.UserName}</div>
            <div className="fw-700 sub-color pr-5"> - {item?.Note} </div>
            <div className=" sub-color">
              {moment(item?.CreateDate).format("DD/MM/YYYY HH:mm:ss")}
            </div>
          </Row>
          <div className="mh-32">{item?.Content}</div>
        </Col>
      </Row>
    </div>
  )
}
export const SetHistory = ({ item, index }) => {
  return (
    <div key={index} className="wrap-comment">
      <Row className="p-5">
        <Col className="p-5">
          <Avatar size={32} icon={<UserOutlined />} src={item?.Avatar} />
        </Col>
        <Col className="pl-5">
          <Row className="pb-5">
            <div className="fw-700 pr-5">{item?.UserName}</div>
            <div className="fw-700 sub-color pr-5"> - {item?.Note} </div>
            <div className=" sub-color">
              {moment(item?.CreateDate).format("DD/MM/YYYY HH:mm:ss")}
            </div>
          </Row>
          <Row style={{ width: "450px" }}>
            <Col span={8}>
              <div className="fw-700">Thuộc tính</div>
              <div>{item?.status}</div>
            </Col>
            <Col span={8}>
              <div className="fw-700">Giá trị ban đầu</div>
              <div>{item?.NewStatusID}</div>
            </Col>
            <Col span={8}>
              <div className="fw-700">Giá trị hiện tại</div>
              <div>{item?.OldStatusID}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export const SetBrowse = ({ item, index }) => {
  const setColorByStatus = status => {
    switch (status) {
      case 0:
        return "#595959"
      case 1:
        return "#F17000"
      case 2:
        return "#F3C700"
      case 3:
        return "#D70000"
      case 4:
        return "#389e0d"
      case 5:
        return "#006d75"
      case 6:
        return "#ad8b00"
      case 7:
        return "#966BFF"
      case 8:
        return "#2684FF"
      case 9:
        return "#00FF19"
      case 10:
        return "#595959"
      default:
        return ""
    }
  }
  let statusColorOld = setColorByStatus(item?.PreStatus)
  let statusColorNew = setColorByStatus(item?.Status)
  return (
    <div key={index} className="wrap-comment">
      <Row className="p-5">
        <Col className="p-5">
          <Avatar size={32} icon={<UserOutlined />} src={item?.Avatar} />
        </Col>
        <Col className="pl-5">
          <Row className="pb-5">
            <div className="fw-700 pr-5">{item?.UserName}</div>
            <div className="fw-700 sub-color pr-5"> - {item?.Note} </div>
            <div className=" sub-color">
              {moment(item?.CreateDate).format("DD/MM/YYYY HH:mm:ss")}
            </div>
          </Row>
          {!!item?.PreStatusName || !!item?.StatusName ? (
            <Row>
              <div className="p-5" style={{ color: `${statusColorOld}` }}>
                {item?.PreStatusName}
              </div>
              <ArrowRightOutlined className="p-5" color="black" />
              <div className="p-5" style={{ color: `${statusColorNew}` }}>
                {item?.StatusName}
              </div>
            </Row>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </div>
  )
}
