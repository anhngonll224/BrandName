import { Col, Empty, Input, Row, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import Dossier from "src/services/Dossier"
import { TabsActiveContainer } from "./styles"
import { SetBrowse, SetCommentComp, SetHistory } from "./SetActivities"
const { TextArea } = Input

const Activities = ({ dataDetail, open }) => {
  const [comment, setComment] = useState("")
  const [historyAll, setHistoryAll] = useState([])
  const [listComment, setListComment] = useState([])
  const [listHistory, setListHistory] = useState([])
  const [listBrowsingFlow, setListBrowsingFlow] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAllHistoryAll, setShowAllHistoryAll] = useState(false)
  const [showAllComment, setShowAllComment] = useState(false)
  const [showAllHistory, setShowAllHistory] = useState(false)
  const [showAllBrowsingFlow, setShowAllBrowsingFlow] = useState(false)

  const convert = (item, index) => {
    switch (item.Type) {
      case 1:
        return <SetCommentComp item={item} index={`SetCommentComp${index}`} />
      case 2:
        return <SetHistory item={item} index={`SetHistory${index}`} />
      case 3:
        return <SetBrowse item={item} index={`SetBrowse${index}`} />
      default:
        return <></>
    }
  }

  const getList = type => {
    setLoading(true)
    Dossier.GetListHistoryDossier({
      DossierID: dataDetail?.DossierID,
      Type: type,
    })
      .then(res => {
        if (res.isOk) {
          if (type === 0) setHistoryAll(res?.Object)
          if (type === 1) setListHistory(res?.Object)
          if (type === 2) setListComment(res?.Object)
          if (type === 3) setListBrowsingFlow(res?.Object)
        }
      })
      .finally(() => setLoading(false))

    setLoading(true)
  }
  useEffect(() => {
    getList(0)
    getList(1)
    getList(2)
    getList(3)
  }, [])
  const commentDossier = async () => {
    try {
      setLoading(true)
      const res = await Dossier.commentDossier({
        Content: comment,
        DossierID: dataDetail?.DossierID,
      })
      if (res?.isError) return
      Notice({ msg: `gửi nhận xét thành công !` })
      // Đặt giá trị của comment thành chuỗi rỗng để làm trống ô nhập liệu

      getList(2)
      setComment("")
      // setViewDetail(res?.Object?.Data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TabsActiveContainer>
      <Tabs>
        <Tabs.TabPane tab="Tất cả" key={1}>
          {!historyAll?.length ? (
            <Empty description="Chưa có nhận xét, lịch sử hay luồng duyệt nào về hồ sơ này trước đây" />
          ) : (
            <div className="box-list-content">
              {historyAll?.length && showAllHistoryAll
                ? historyAll?.map((item, index) => convert(item, index))
                : historyAll
                    ?.slice(0, 5)
                    .map((item, index) => convert(item, index))}
              {historyAll.length > 5 ? (
                showAllHistoryAll ? (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllHistoryAll(false)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color mt-8">
                        Thu nhỏ
                      </div>
                      <div className="d-flex-center white "></div>
                    </Col>
                  </Row>
                ) : (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllHistoryAll(true)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color ">Xem thêm</div>
                      <div className="d-flex-center white ">
                        <SvgIcon name="arrowDown" />
                      </div>
                    </Col>
                  </Row>
                )
              ) : (
                <></>
              )}
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Nhận xét" key={2}>
          {listComment.length === 0 ? (
            <Empty description="Chưa có nhận xét nào về hồ sơ này trước đây" />
          ) : (
            <div className="box-list-content">
              {listComment?.length && showAllComment
                ? listComment.map((item, index) => (
                    <SetCommentComp
                      item={item}
                      index={`SetCommentComp1${index}`}
                    />
                  ))
                : listComment
                    .slice(0, 5)
                    .map((item, index) => (
                      <SetCommentComp
                        item={item}
                        index={`SetCommentComp2${index}`}
                      />
                    ))}
              {listComment.length > 5 ? (
                showAllComment ? (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllComment(false)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color mt-8">
                        Thu nhỏ
                      </div>
                      <div className="d-flex-center white ">
                        {/* <SvgIcon name="arrowDown" /> */}
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllComment(true)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color ">Xem thêm</div>
                      <div className="d-flex-center white ">
                        <SvgIcon name="arrowDown" />
                      </div>
                    </Col>
                  </Row>
                )
              ) : (
                <></>
              )}
            </div>
          )}
          <Row className=" p-10">
            <TextArea
              value={comment}
              onChange={e => setComment(e.target.value)}
              Row={4}
              placeholder="Nhận xét của bạn"
            ></TextArea>
          </Row>
          <Row className="d-flex-end pt-10">
            <Button btnType="primary" onClick={() => commentDossier()}>
              Gửi nhận xét
            </Button>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch sử" key={3}>
          {listHistory.length === 0 ? (
            <Empty description="Chưa có lịch sử nào về hồ sơ này trước đây" />
          ) : (
            <div className="box-list-content">
              {listHistory?.length && showAllHistory
                ? listHistory.map((item, index) => (
                    <SetHistory item={item} index={`his2${index}`} />
                  ))
                : listHistory
                    .slice(0, 5)
                    .map((item, index) => (
                      <SetHistory item={item} index={`his2${index}`} />
                    ))}
              {listHistory.length > 5 ? (
                showAllHistory ? (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllHistory(false)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color mt-8">
                        Thu nhỏ
                      </div>
                      <div className="d-flex-center white ">
                        {/* <SvgIcon name="arrowDown" /> */}
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllHistory(true)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color ">Xem thêm</div>
                      <div className="d-flex-center white ">
                        <SvgIcon name="arrowDown" />
                      </div>
                    </Col>
                  </Row>
                )
              ) : (
                <></>
              )}
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Luồng duyệt" key={4}>
          {listBrowsingFlow.length === 0 ? (
            <Empty description="Chưa có thay đổi nào về luồng duyệt của hồ sơ này trước đây" />
          ) : (
            <div className="box-list-content">
              {listBrowsingFlow?.length && showAllBrowsingFlow
                ? listBrowsingFlow?.map((item, index) => (
                    <SetBrowse item={item} index={`SetBrowse3${index}`} />
                  ))
                : listBrowsingFlow
                    .slice(0, 5)
                    .map((item, index) => (
                      <SetBrowse item={item} index={`SetBrowse2${index}`} />
                    ))}
              {listBrowsingFlow.length > 5 ? (
                showAllBrowsingFlow ? (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllBrowsingFlow(false)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color mt-8">
                        Thu nhỏ
                      </div>
                      <div className="d-flex-center white ">
                        {/* <SvgIcon name="arrowDown" /> */}
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row
                    className="show-all"
                    onClick={() => setShowAllBrowsingFlow(true)}
                  >
                    <Col>
                      <div className="d-flex-center sub-color ">Xem thêm</div>
                      <div className="d-flex-center white ">
                        <SvgIcon name="arrowDown" />
                      </div>
                    </Col>
                  </Row>
                )
              ) : (
                <></>
              )}
            </div>
          )}
        </Tabs.TabPane>
      </Tabs>
    </TabsActiveContainer>
  )
}

export default Activities
