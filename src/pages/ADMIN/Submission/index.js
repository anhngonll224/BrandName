import { Col, Form, Row, Select, Space, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { DEFAULT_PAGE_SIZE } from "src/constants/pageSizeOptions"
import { getListComboByKey } from "src/lib/utils"
import Submisstion from "src/services/Submisstion"
import BrowseRequest from "../RecordsManagement/modal/BrowseRequest"
import { saveAs } from "file-saver"
import ModalViewPDF from "src/components/Modal/ModalViewPDF"
import Printf from "src/services/Printf"
import SubmissionNextModal from "./components/SubmissionNext/SubmissionNextModal"
export const statusColor = ["#4096ff", "#FF720D", "#00AEAC", "#FF4648"]
const Subbmission = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { Option } = Select
  const [data, setData] = useState()
  const [total, setTotal] = useState(0)
  const [btnShow, setBtnShow] = useState({})
  const [listPagi, setListPagi] = useState()
  const [status, setStatus] = useState()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [openBrowseRequest, setOpenBrowseRequest] = useState(false)
  const [btnChose, setBtnChose] = useState({ IsAccept: true, IsRefuse: true })
  const [rowSelected, setRowSelected] = useState([])

  const [viewFile, setViewFile] = useState(false)
  const [viewSubmis, setViewSubmis] = useState(false)
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: DEFAULT_PAGE_SIZE,
    TextSearch: "",
    Status: 0,
    // Procedure: getListComboByKey(
    //   SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
    //   listSystemKey,
    // )[0]?.CodeValue,
    // TopicMain: "",
  })

  useEffect(() => {
    setBtnChose(pre => {
      let obj = { IsAccept: true, IsRefuse: true }
      if (rowSelected?.length)
        rowSelected?.map(item => {
          if (!item?.IsAccept && !!obj?.IsAccept) {
            obj = { ...obj, IsAccept: false }
          }
          if (!item?.IsRefuse && !!obj?.IsRefuse) {
            obj = { ...obj, IsRefuse: false }
          }
        })
      return {
        ...pre,
        ...obj,
      }
    })
  }, [rowSelected])
  const viewSub = async record => {
    try {
      setLoading(true)
      const res = await Submisstion.getDetail({
        SubmissionID: record?.SubmissionID,
      })
      if (res?.isError) return
      const resView = await Printf.preViewBanKhaiTenDinhDanh({
        ...res?.Object?.Data,
      })

      if (resView?.resView) return
    } finally {
      setLoading(false)
    }
  }
  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: rowSelected?.map(i => i?.SubmissionID),
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.find(item => item?.SubmissionID === selectedRowKeys))
        setRowSelected(
          selectedRows?.filter(item => item?.SubmissionID !== selectedRowKeys),
        )
      else setRowSelected(selectedRows)
    },
    // getCheckboxProps: record => ({
    //   disabled: record.Status !== 2,
    // }),
  }

  const onClickRow = async record => {
    setViewSubmis(record)
    // setViewFile(true)
    // if (rowSelected?.find(item => item?.SubmissionID === record?.SubmissionID))
    //   setRowSelected(
    //     rowSelected?.filter(
    //       item => item?.SubmissionID !== record?.SubmissionID,
    //     ),
    //   )
    // else setRowSelected(prev => [...prev, record])
  }
  const handleOnClickDetail = event => {}
  const columns = [
    {
      title: "Ngày trình",
      dataIndex: "DateSubmit",
      width: 100,
      render: (value, record) => (
        <div>{moment(record?.DateSubmit).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Số phiếu",
      width: 250,
      align: "center",
      dataIndex: "SubmissionCode",
      render: (value, record) => (
        <Tooltip title={value}>
          <div
            className="max-line2"
            onClick={() => handleOnClickDetail(record)}
          >
            {value}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Tên phiếu trình",
      // width: 350,
      align: "center",
      dataIndex: "SubmissionName",
    },
    {
      align: "center",
      title: "Số hồ sơ",
      dataIndex: "NumberDossier",
    },
    {
      align: "center",
      title: "Trạng thái",
      dataIndex: "Status",
      render: (value, record) => (
        <>
          <Space size="middle">
            <div
              style={{ color: `${statusColor[value - 1]}`, fontWeight: "600" }}
            >
              {
                getListComboByKey("SUBMISSION_STATUS", listSystemKey)?.find(
                  item => item?.CodeValue === value,
                )?.Description
              }
            </div>
          </Space>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            <Space>
              {!!record?.IsUpdate && (
                <ButtonCircle
                  title="Chỉnh sửa"
                  iconName="edit-green"
                  onClick={() => {
                    setOpenBrowseRequest(record)
                  }}
                />
              )}
              {!!record?.IsDelete && (
                <ButtonCircle
                  title="Xóa"
                  iconName="delete-red-row"
                  onClick={() => {
                    CB1({
                      title: `Bạn có chắc chắn muốn xoá <strong> ${record?.SubmissionCode}</strong> không?`,
                      icon: "warning-usb",
                      okText: "Đồng ý",
                      onOk: async close => {
                        deleteSubmission(record?.SubmissionID)
                        close()
                      },
                    })
                  }}
                />
              )}
              {!!record?.IsSend && (
                <ButtonCircle
                  title="Gửi đơn"
                  iconName="send-mess-primary"
                  onClick={() => {
                    CB1({
                      title: `Bạn có chắc chắn muốn gửi
                                                    <strong> ${record?.SubmissionCode}</strong> không?`,
                      icon: "notice-success",
                      okText: "Đồng ý",
                      onOk: async close => {
                        sendSubmission(record?.SubmissionID)
                        close()
                      },
                    })
                  }}
                />
              )}
              {!!record?.IsRecallSend && (
                <ButtonCircle
                  title="Thu hồi phiếu trình"
                  onClick={() => {
                    CB1({
                      title: `Bạn có chắc chắn muốn thu hồi phiếu trình
                                                    <strong> ${record?.SubmissionCode}</strong> không?`,
                      icon: "notice-success",
                      okText: "Đồng ý",
                      onOk: async close => {
                        recallSendSubmission(record?.SubmissionID)
                        close()
                      },
                    })
                  }}
                  iconName="re-post"
                />
              )}
              {!!record?.IsRecall && (
                <ButtonCircle
                  title="Thu hồi"
                  onClick={() => {
                    CB1({
                      title: `Bạn có chắc chắn muốn thu hồi
                                                  <strong> ${record?.SubmissionCode}</strong> không?`,
                      icon: "notice-success",
                      okText: "Đồng ý",
                      onOk: async close => {
                        recallSubmission(record?.SubmissionID)
                        close()
                      },
                    })
                  }}
                  iconName="curved-previous"
                />
              )}
              {!!record?.IsAccept && (
                <ButtonCircle
                  title="Duyệt"
                  onClick={() => {
                    CB1({
                      title: `Bạn có chắc chắn muốn duyệt phiếu trình
                                                    <strong> ${record?.SubmissionCode}</strong> không?`,
                      icon: "signSuccess",
                      okText: "Đồng ý",
                      onOk: async close => {
                        accept([record?.SubmissionID])
                        close()
                      },
                    })
                  }}
                  iconName="confirm"
                />
              )}
              {!!record?.IsRefuse && (
                <ButtonCircle
                  title="Từ chối"
                  onClick={() => {
                    CB1({
                      title: `Bạn có chắc chắn muốn từ chối phiếu trình
                                                    <strong> ${record?.SubmissionCode}</strong> không?`,
                      icon: "not-cks",
                      okText: "Đồng ý",
                      onOk: async close => {
                        refuse([record?.SubmissionID])
                        close()
                      },
                    })
                  }}
                  iconName="cancel-post"
                />
              )}
            </Space>
          </FloatActionWrapper>
        </>
      ),
    },
  ]
  // get api list data
  const getList = () => {
    setLoading(true)
    const values = form.getFieldsValue()
    Submisstion.GetList({
      ...pagination,
      ...values,
    })
      .then(res => {
        if (res.isOk) {
          setData(res?.Object?.Data)
          setListPagi(res?.Object)
          setBtnShow(res?.Object?.ButtonShow)
          setStatus(res?.Status)
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    form.setFieldsValue({ Status: 0 })
  }, [])
  useEffect(() => {
    getList()
  }, [pagination])

  const sendSubmission = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.sendSubmission({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return
      Notice({ isSuccess: true, msg: "Gửi thành công!" })
      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }
  const recallSubmission = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.recallSubmission({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return
      Notice({ isSuccess: true, msg: "Thu hồi thành công!" })

      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }
  const recallSendSubmission = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.recallSendSubmission({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return
      Notice({ isSuccess: true, msg: "Thu hồi phiếu thành công!" })

      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }
  const deleteSubmission = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.deleteSub({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return
      Notice({ isSuccess: true, msg: "Xóa phiếu thành công!" })

      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }

  const accept = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.accept({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return
      Notice({ isSuccess: true, msg: "Cập nhật thành công!" })

      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }
  const refuse = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.refuse({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return
      Notice({ isSuccess: true, msg: "Cập nhật thành công!" })

      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }

  const exportSub = async ltSubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.exportSub({
        // ltSubmissionID: ltSubmissionID,
      })
      if (res?.isError) return

      saveAs(res, "Danh sách phiếu trình phê duyệt.xlsx")

      setPagination(pre => ({ ...pre, CurrentPage: pre?.CurrentPage }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Row style={{ marginTop: "15px" }} gutter={16}>
        <Col span={13}>
          <Form.Item name="TextSearch">
            <FlInput
              label="Tìm kiếm "
              search
              allowClear
              onSearch={event => {
                setPagination({
                  ...pagination,
                  TextSearch: event,
                  Status: status,
                })
              }}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form form={form} className="rq-support">
            <Form.Item name="Status">
              <FlSelect
                allowClear
                label="Trạng thái"
                onChange={() =>
                  setPagination({
                    ...pagination,
                    CurrentPage: 1,
                  })
                }
              >
                <Option key={"allStatusTopicmain"} value={0}>
                  Tất cả
                </Option>
                {getListComboByKey("SUBMISSION_STATUS", listSystemKey)?.map(
                  i => (
                    <Option key={i.CodeValue} value={i.CodeValue}>
                      {i?.Description}
                    </Option>
                  ),
                )}
              </FlSelect>
            </Form.Item>
          </Form>
        </Col>
        <Col span={7} style={{ paddingRight: "8px" }}>
          <FlDatePicker
            allowClear
            ranger
            label={["Từ ngày", "Đến ngày"]}
            onChange={date =>
              setPagination({
                ...pagination,
                DateFrom: date ? date[0].format() : null,
                DateTo: date ? date[1].format() : null,
              })
            }
          />
        </Col>
        <Col
          span={24}
          className="title-type-1 d-flex align-items-center justify-content-space-between mb-0 pb-8 pt-0"
        >
          <div>Danh phiếu trình phê duyệt ({listPagi?.Total})</div>
          <div className="d-flex" span={12} style={{ textAlign: "right" }}>
            {!!btnShow?.IsAccept && !!btnChose?.IsAccept && (
              <Button
                btnType="third"
                className="btn-login"
                disabled={!rowSelected?.length}
                style={{ height: "37px", marginRight: "10px" }}
                onClick={() => {
                  CB1({
                    title: `Bạn có chắc chắn muốn duyệt phiếu trình
                                                  đã chọn không?`,
                    icon: "signSuccess",
                    okText: "Đồng ý",
                    onOk: async close => {
                      accept(rowSelected?.map(item => item?.SubmissionID))
                      close()
                    },
                  })
                }}
              >
                Duyệt
              </Button>
            )}
            {!!btnShow?.IsRefuse && !!btnChose?.IsRefuse && (
              <Button
                btnType="third"
                className="btn-login"
                disabled={!rowSelected?.length}
                style={{ height: "37px", marginRight: "10px" }}
                onClick={() => {
                  CB1({
                    title: `Bạn có chắc chắn muốn từ chối phiếu trình đã chọn không?`,
                    icon: "not-cks",
                    okText: "Đồng ý",
                    onOk: async close => {
                      refuse(rowSelected?.map(item => item?.SubmissionID))
                      close()
                    },
                  })
                }}
              >
                <span>Từ chối</span>
              </Button>
            )}
            {!!btnShow?.IsExport && (
              <Button
                btnType="third"
                // disabled={!rowSelected?.length}
                className="btn-login"
                style={{ height: "37px", marginRight: "10px" }}
                onClick={() =>
                  exportSub(rowSelected?.map(item => item?.SubmissionID))
                }
              >
                <span>Xuất Excel</span>
              </Button>
            )}
          </div>
        </Col>
        <Col span={24} style={{ marginTop: "20px" }}>
          <TableCustom
            isPrimary
            pagination={{
              hideOnSinglePage: listPagi?.Total <= 10,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total: listPagi?.Total,
              locale: { items_per_page: "" },
              showSizeChanger: listPagi?.Total > 10,
              onChange: (CurrentPage, PageSize) =>
                setPagination({
                  ...pagination,
                  CurrentPage,
                  PageSize,
                }),
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  onClickRow(record)
                },
              }
            }}
            rowKey="SubmissionID"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        </Col>
      </Row>

      {!!openBrowseRequest && (
        <BrowseRequest
          open={openBrowseRequest}
          //   onOk={getAllUser}
          pagination={pagination}
          onCancel={() => {
            setOpenBrowseRequest(false)
          }}
        />
      )}

      {viewFile && (
        <ModalViewPDF
          open={viewFile}
          onCancel={() => setViewFile(false)}
          fileUrl={viewFile}
        />
      )}
      {viewSubmis && (
        <SubmissionNextModal
          open={viewSubmis}
          onCancel={() => setViewSubmis(false)}
        />
      )}
    </div>
  )
}

export default Subbmission
