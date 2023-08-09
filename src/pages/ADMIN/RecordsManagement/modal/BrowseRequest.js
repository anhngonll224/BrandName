import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Upload,
  message,
} from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DraftEditor from "src/components/DraftEditor"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey, normFile } from "src/lib/utils"
import FileService from "src/services/FileService"
import Submisstion from "src/services/Submisstion"
import styled from "styled-components"
import ModelDetailManagementNotButton from "../Components/ModelDetailManagement"
import { useLocation, useNavigate } from "react-router-dom"
const StyleForm = styled.div`
  .ant-collapse-content-box,
  .ant-collapse-header {
    padding: 0;
  }
`

const BrowseRequest = ({ open, onCancel, count, pagination, setCount }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [Description, setDescription] = useState("")
  const [Description2, setDescription2] = useState("")
  const [Description3, setDescription3] = useState("")
  const [listPrice, setListPrice] = useState([])
  const [listFile, setListFile] = useState([])
  const [listFileDelete, setListFileDelete] = useState([])
  const { listSystemKey } = useSelector(state => state.appGlobal)

  const location = useLocation()
  const navigate = useNavigate()
  const [listData, setListData] = useState({
    ListDossierID: [],
  })
  let dataList = []
  useEffect(() => {
    if (!count?.length) getOnDay()
    else setListPrice(count)
  }, [count])
  useEffect(() => {
    form.setFieldsValue({
      DateSubmit: dayjs(),
    })
  }, [])

  const changeValueTable = (idx, object) =>
    setListPrice(pre =>
      pre?.length
        ? pre?.map((i, index) => {
            if (idx !== index) return i
            return { ...i, ...object }
          })
        : [],
    )

  const handleSubmit = async () => {
    const values = await form.validateFields()

    try {
      let res = {}
      if (!open?.SubmissionID) {
        res = await Submisstion.Insert({
          ...values,
          ...listData,
          DateSubmit: values?.DateSubmit.format(),

          Content: Description2,
          OpinionLDC: Description,
          Recipients: Description3,
        })
      } else {
        res = await Submisstion.update({
          SubmissionID: open?.SubmissionID,
          ...values,
          ...listData,
          DateSubmit: values?.DateSubmit.format(),

          Content: Description2,
          OpinionLDC: Description,
          Recipients: Description3,
        })
      }
      let resUpload
      if ((res.Object.length > 0 && listFile.length) || listFileDelete.length) {
        const formData = new FormData()
        formData.append("GuidID", res.Object || open?.SubmissionID)
        listFile.forEach(item => {
          if (item.originFileObj)
            formData.append("InsertFileList", item.originFileObj)
        })
        listFileDelete.forEach(item => {
          formData.append("DeleteFileList", item)
        })
        resUpload = await FileService.uploadFileList(formData)
      }
      if (res.isError || resUpload?.isError) return
      if (res?.isError) return
      Notice({
        msg: res?.Object ? "Cập nhật thành công." : "Thêm mới thành công.",
      })
      !!setCount && setCount([])
      onCancel()

      if (location?.pathname === "/quan-ly-ho-so/theo-doi") {
        navigate("/quan-ly-ho-so/danh-sach-phieu-trinh-phe-duyet")
      }
    } finally {
      setLoading(false)
    }
  }
  const handleUploadListFile = ({ fileList: newFileList, file }) => {
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error("Kích thước file phải nhỏ hơn 5MB!")
    } else {
      setListFile(newFileList)
    }
  }

  const getDetail = async SubmissionID => {
    try {
      setLoading(true)
      const res = await Submisstion.getDetail({
        SubmissionID: SubmissionID,
      })
      if (res?.isError) return

      form.setFieldsValue({
        ...res?.Object?.Data,
        DateSubmit: res?.Object?.Data?.DateSubmit
          ? dayjs(res?.Object?.Data?.DateSubmit)
          : undefined,
        FileList: res?.Object?.Data?.fileAttack
          ? res?.Object?.Data?.fileAttack?.map(item => ({
              name: item?.FileName,
              url: item?.FileUrl,
            }))
          : [],
      })
      // setListFile(
      //   res?.Object?.Data?.fileAttack
      //     ? res?.Object?.Data?.fileAttack?.map(item => ({
      //         name: item?.FileName,
      //         url: item?.FileUrl,
      //       }))
      //     : [],
      // )
      setDescription(pre => res?.Object?.Data?.OpinionLDC)
      setDescription2(pre => res?.Object?.Data?.Content)
      setDescription3(pre => res?.Object?.Data?.Recipients)
      setListPrice(pre => res?.Object?.Data?.ltDossier)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (open?.SubmissionID) {
      getDetail(open?.SubmissionID)
    }
  }, [open?.SubmissionID])
  useEffect(() => {
    // if (listPrice?.length)
    //   listPrice.map(item => {
    //     dataList.push({
    //       // DossierID: item.DossierID,
    //       // Note: item.Note,
    //       ...item,
    //     })
    //   })
    setListData({
      ListDossierID: listPrice,
    })
    // handleSubmit()
    // deleteProps()
  }, [listPrice])

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button
        loading={loading}
        btnType="primary"
        className="btn-hover-shadow"
        onClick={handleSubmit}
      >
        Ghi lại
      </Button>
    </div>
  )
  // delete table
  const deleteProps = event => {
    let curredList = listPrice
    curredList = curredList.filter(item => item.DossierID !== event)
    setListPrice(curredList)
  }

  const getOnDay = async () => {
    try {
      setLoading(true)
      const res = await Submisstion.getOnDay()
      if (res?.isError) return
      setListPrice(res?.Object?.Data)
    } finally {
      setLoading(false)
    }
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 60,
      align: "center",
      render: (text, row, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: "Tên định danh",
      dataIndex: "IdentifyName",
      key: "IdentifyName",
      width: 200,
      align: "center",
    },
    {
      title: "Tên doanh nghiệp/Hộ kinh doanh cá nhân",
      dataIndex: !!(!!open?.SubmissionID || !count?.length)
        ? "RegisterName"
        : "FullName",
      key: !!(!!open?.SubmissionID || !count?.length)
        ? "RegisterName"
        : "FullName",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "Note",
      key: "Note",
      width: 300,
      render: (value, record, index) => (
        <div className="d-flex justify-content-center align-items-center mh-36">
          <div className=" text-center">
            <Input
              value={value}
              onClick={e => {
                e?.stopPropagation()
              }}
              onChange={event =>
                changeValueTable(index, {
                  Note: event?.target?.value,
                })
              }
            />
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            <ButtonCircle
              title="Xóa"
              iconName="bin"
              onClick={() => {
                deleteProps(record?.DossierID)
                // CB1({
                //   title: `Bạn có chắc chắn muốn xoá người dùng
                //   <strong> ${record?.UserName}</strong> không?`,
                //   icon: "warning-usb",
                //   okText: "Đồng ý",
                //   onOk: async close => {
                //     onDeleteUser(record?.UserID)
                //     close()
                //   },
                // })
              }}
            />
          </FloatActionWrapper>
        </div>
      ),
    },
  ]

  return (
    <CustomModal
      title="Phiếu trình phê duyệt"
      open={!!open}
      onCancel={onCancel}
      width={1200}
      footer={renderFooter()}
    >
      <SpinCustom spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            {/* <Col xs={24} md={12}>
              <Form.Item
                required
                label="Số phiếu"
                rules={[
                  {
                    required: true,
                    message: "Sô phiếu không được để trống!",
                  },
                ]}
                name="Number"
              >
                <Input />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={18}>
              <Form.Item
                name="Location"
                required
                rules={[
                  {
                    required: true,
                    message: "Địa điểm không được để trống!",
                  },
                ]}
                label="Địa điểm"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                required
                name="DateSubmit"
                style={{ width: "100%" }}
                label="Ngày trình"
                rules={[
                  {
                    required: true,
                    message: "Ngày không được để trống!",
                  },
                ]}
              >
                <DatePicker
                  //  defaultValue={dayjs()}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                required
                label="Tên phiếu trình"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống!",
                  },
                ]}
                name="SubmissionName"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Ý kiến chỉ đạo của lãnh đạo cục"
                name="OpinionLDC"
                // trigger="onEditorChange"
                // validateTrigger={["onEditorChange"]}
              >
                <DraftEditor
                  getText={text => {}}
                  getHtml={html => setDescription(html)}
                  value={Description}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Nội dung trình"
                name="Content"
                hasFeedback
                trigger="onEditorChange"
                validateTrigger={["onEditorChange"]}
              >
                <DraftEditor
                  getText={text => text}
                  getHtml={html => setDescription2(html)}
                  value={Description2}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Nơi nhận" name="Recipients">
                {/* <DraftEditor
                  getText={text => { }}
                  getHtml={html => setDescription3(html)}
                  value={Description}
                /> */}
                {/* <TinyEditor setLoading={setLoading} height={"250px"} isSimple /> */}
                <DraftEditor
                  getText={text => text}
                  getHtml={html => setDescription3(html)}
                  value={Description3}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tài liệu đính kèm"
                valuePropName="fileList"
                name="FileList"
                getValueFromEvent={normFile}
              >
                <Upload.Dragger
                  multiple={false}
                  // maxCount={100}
                  beforeUpload={() => false}
                  className="pointer"
                  onChange={handleUploadListFile}
                  onRemove={e => {
                    if (e?.ObjectFileID)
                      setListFileDelete(pre => [...pre, e?.ObjectFileID])
                  }}
                >
                  <Row gutter={16} className="justify-content-center">
                    <Col>
                      <SvgIcon name="cloud" />
                    </Col>
                    <Col>
                      <span>
                        Kéo thả file đính kèm hoặc{" "}
                        <span style={{ color: "#154398" }}>Chọn File</span>
                      </span>
                    </Col>
                  </Row>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            {!!listPrice?.length ? (
              getListComboByKey(
                SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
                listSystemKey,
              )?.map((i, idx) =>
                listPrice?.filter(item => item?.Procedure === i?.CodeValue)
                  ?.length ? (
                  <Col span={24} key={`Collapse${idx}`}>
                    <div className="mt-16">
                      <Collapse
                      // defaultActiveKey={[idx]}
                      >
                        <Collapse.Panel
                          header={
                            <div className="text-uppercase fw-600">{`Hồ sơ ${
                              i?.Description
                            } TÊN ĐỊNH DANH (${
                              listPrice?.filter(
                                item => item?.Procedure === i?.CodeValue,
                              )?.length
                            })`}</div>
                          }
                          key={idx}
                        >
                          <TableCustom
                            isPrimary
                            onRow={record => {
                              return {
                                onClick: () => {
                                  setOpenDetail(record)
                                },
                              }
                            }}
                            className="mb-6"
                            dataSource={listPrice?.filter(
                              item => item?.Procedure === i?.CodeValue,
                            )}
                            columns={columns}
                            textEmpty="Chưa có yêu cầu nào"
                            pagination={false}
                            rowKey="UserID"
                            sticky={{ offsetHeader: -12 }}
                            scroll={{ y: "100%", x: "800px" }}
                          />
                        </Collapse.Panel>
                      </Collapse>
                    </div>
                  </Col>
                ) : (
                  <></>
                ),
              )
            ) : (
              <></>
            )}
          </Row>
        </Form>
      </SpinCustom>
      {!!openDetail && (
        <ModelDetailManagementNotButton
          open={openDetail}
          dataDetail={openDetail}
          onCancel={() => {
            setOpenDetail(false)
          }}
          loading={loading}
        />
      )}
    </CustomModal>
  )
}

export default BrowseRequest
