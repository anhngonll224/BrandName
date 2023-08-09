import { LoadingOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Empty, Input, Spin, Tabs, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CB1 from "src/components/Modal/CB1"
import SvgIcon from "src/components/SvgIcon"
import NotifyApi from "src/services/NotifyService"
import InfiniteScrollCustom from "./InfiniteScrollCustom"
import { WrapNotify, WrapNotifyItem } from "./styled"

const NotifyForm = ({
  listNotify,
  loading,
  getList,
  onClose,
  paginationNof,
  setPaginationNof,
}) => {
  const navigate = useNavigate()
  const [isloading, setLoading] = useState(false)
  const onSearch = textSearch => {
    setPaginationNof(pre => ({ ...pre, PageSize: 20, TextSearch: textSearch }))
  }

  const [hasMore, setHasMore] = useState(true)

  const getMorePost = () => {
    setPaginationNof(pre => ({
      ...pre,
      PageSize: pre?.PageSize + pre?.PageSize,
    }))
  }
  useEffect(() => {
    if (listNotify?.Total <= listNotify?.Data?.length) setHasMore(false)
  }, [listNotify])

  const handleReadAll = () => {
    setLoading(true)
    NotifyApi.MarkAsRead("")
      .then(res => {
        if (res?.isOk) {
          !!getList && getList("")
        }
      })
      .finally(() => setLoading(false))
  }

  const handleDeleteAll = () => {
    onClose()

    CB1({
      title: `Bạn có chắc chắn muốn xóa tất cả thông báo không?`,
      icon: "trashRed",
      okText: "Xác nhận",
      onOk: async close => {
        setLoading(true)
        NotifyApi.DeleteNotifyForUser("")
          .then(res => {
            if (res?.isOk) {
              !!getList && getList("")
            }
          })
          .finally(() => setLoading(false))
        close()
      },
    })
  }

  const handleClick = notify => {
    setLoading(true)
    NotifyApi.MarkAsRead(notify?.NotifyId)
      .then(res => {
        if (res?.isOk) {
          !!getList && getList("")
        }
      })
      .finally(() => setLoading(false))
    onClose()
    switch (notify?.Type) {
      case 1:
        navigate("/quan-ly-ho-so/cho-xu-ly", {
          state: { DossierID: notify?.ReferenceId },
        })
        break
      default:
        break
    }
  }
  return (
    <WrapNotify>
      <Spin
        spinning={loading || isloading}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      >
        <div className="container">
          <div className="header-notify">
            <div className="title">Thông báo</div>
            <div className="link-name d-flex" onClick={handleReadAll}>
              Đánh dấu đã đọc <SvgIcon name="checks" className="icon" />
            </div>
          </div>
          {/* <Search
            placeholder="Tìm kiếm"
            onChange={onSearch}
            loading={loading}
          /> */}

          <Input.Search
            placeholder="Tìm kiếm"
            onSearch={onSearch}
            enterButton
          />
          <div className="wrap-tabs">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={`Tất cả (${!!listNotify?.Total ? listNotify?.Total : 0})`}
                key="1"
              >
                <div className="body-notify" id="scrollableDiv">
                  {(!!listNotify?.Data ? listNotify?.Data?.length : 0) > 0 ? (
                    <InfiniteScrollCustom
                      dataLength={listNotify?.Data?.length}
                      next={getMorePost}
                      scrollableTarget="scrollableDiv"
                      hasMore={hasMore}
                    >
                      {listNotify?.Data?.map(notify => (
                        <NotifyItem
                          notify={notify}
                          key={notify?.NotifyId}
                          handleClick={() => handleClick(notify)}
                        />
                      ))}
                    </InfiniteScrollCustom>
                  ) : (
                    <Empty
                      description={"Chưa có thông báo nào!"}
                      style={{ paddingBottom: 24 }}
                    />
                  )}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={`Chưa đọc (${
                  !!listNotify?.TotalIsRead ? listNotify?.TotalIsRead : 0
                })`}
                key="2"
              >
                <div className="body-notify" id="scrollableDiv2">
                  {(!!listNotify?.Data && listNotify?.Data?.length
                    ? listNotify?.Data.filter(notify => !notify?.IsRead)?.length
                    : 0) > 0 ? (
                    <InfiniteScrollCustom
                      dataLength={listNotify?.Data?.length}
                      next={getMorePost}
                      scrollableTarget="scrollableDiv2"
                      hasMore={hasMore}
                    >
                      {listNotify?.Data?.filter(notify => !notify?.IsRead)?.map(
                        notify => (
                          <NotifyItem
                            notify={notify}
                            key={notify?.NotifyId}
                            handleClick={() => handleClick(notify)}
                          />
                        ),
                      )}
                    </InfiniteScrollCustom>
                  ) : (
                    <Empty
                      description={"Chưa có thông báo nào!"}
                      style={{ paddingBottom: 24 }}
                    />
                  )}
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
          {(!!listNotify?.Data ? listNotify?.Data?.length : 0) > 0 && (
            <div className="footer-notify link-name" onClick={handleDeleteAll}>
              <span>Xoá tất cả</span>
            </div>
          )}
        </div>
      </Spin>
    </WrapNotify>
  )
}
export default NotifyForm

const NotifyItem = ({ notify, handleClick }) => {
  return (
    <WrapNotifyItem
      className={!notify?.IsRead ? "unread" : ""}
      onClick={handleClick}
    >
      <div className="avatar">
        <Avatar
          size={32}
          src={notify?.Logo}
          icon={<UserOutlined style={{ fontSize: "16px" }} />}
        />
      </div>
      <div className="content-notify">
        <div className="hidden-text">
          <span className="account-name">{notify?.Title}:</span>
          <br />
          <Tooltip title={`${notify?.AccountName} - ${notify?.Content}`}>
            <span className="account-name">{notify?.AccountName}</span>{" "}
            <span>{notify?.Content?.split(": ")[0]}</span>{" "}
            <span className="package-name">
              {notify?.Content?.split(":")[1] || notify?.PackageName}
            </span>
          </Tooltip>
        </div>
        <div className="time"> {notify?.TimeAgo}</div>
      </div>
    </WrapNotifyItem>
  )
}
