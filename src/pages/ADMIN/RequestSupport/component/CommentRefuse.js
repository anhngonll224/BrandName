import { Col, Image } from "antd"
import moment from "moment"
import { StyleCommentRefuse } from "../styled"

const CommentRefuseItem = () => {
  return (
    <Col span={24} className={"comment-item"}>
      <div className="comment-content">
        <Image
          className="comment-owner-avatar"
          src="https://i.vietgiaitri.com/2020/7/27/top-3-nu-sinh-xinh-dep-noi-bat-trong-bo-dong-phuc-94e-5113016.jpg"
        />
        <div>
          <div className="comment-owner-position">
            admin{" "}
            <span className="comment-owner-activity">đã từ chối yêu cầu</span>
          </div>
          <div>Học viên này không đủ yêu cầu bắt đầu khóa học</div>
        </div>
      </div>
      <div className="comment-owner-activity">
        {moment("2020-12-12").fromNow()}
      </div>
    </Col>
  )
}
const CommentRefuse = () => {
  return (
    <StyleCommentRefuse>
      {/* <Row gutter={[16, 8]}>
        <Col span={24}>
          <div className="cmr-title">
            <SvgIcon name="activity" />
            <span>tiến độ xử lý</span>
          </div>
        </Col>
        <Col span={24}>
          <CommentRefuseItem />
          <CommentRefuseItem />
        </Col>
      </Row> */}
    </StyleCommentRefuse>
  )
}

export default CommentRefuse
