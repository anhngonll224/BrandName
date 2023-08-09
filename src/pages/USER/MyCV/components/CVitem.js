import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd"
import { useMemo } from "react"
import { MyCVStyle } from "../styled"

import { useState } from "react"
import { useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY, TYPE_LINK } from "src/constants/constants"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import { getListComboByKey } from "src/lib/utils"
import InforUser from "./InforUser"

import { useEffect } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import ModalViewPDF from "src/components/Modal/ModalViewPDF"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import { RenderTiny } from "src/components/TinyEditor"
import STORAGE from "src/lib/storage"
import AuthService from "src/services/AuthService"
import FieldService from "src/services/Field/FieldService"
import UserService from "src/services/UserService"
import ModalImportFile from "../modal/ModalImportFile"
import dayjs from "dayjs"
import moment from "moment"
import Dossier from "src/services/Dossier"
import { saveAs } from "file-saver"
import CB1 from "src/components/Modal/CB1"
import ModalSign from "../modal/ModalSign"
import ModalListSign from "../modal/ModalListSign"

const { Paragraph } = Typography
const CVitem = ({
  type,
  form,
  createCV,
  setFileDossier,
  fileDossier,
  listIdentifyName,
  checkDossier,
  // dossier,
  fileDelete,
  setFileDelete,
  startSign,
  setStartSign,
  loading2,
}) => {
  const userInfo = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [listField, setListField] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewFile, setViewFile] = useState(false)
  const [fileListSign, setFileListSign] = useState([])
  const [oneText, setOneText] = useState("cấp")
  const [twoText, setTwoText] = useState("")
  const [sign, setSign] = useState("")
  useEffect(() => {
    setTwoText(userInfo?.FullName)
  }, [userInfo])
  // useEffect(() => {
  //   setOneText(
  //     pre =>
  //       getListComboByKey(
  //         SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
  //         listSystemKey,
  //       )?.find(item => item?.CodeValue === open?.Procedure)?.Description,
  //   )
  // }, [open])

  const onPreview = async file => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  // Trong component chứa modal
  const [selectedFiles, setSelectedFiles] = useState([])

  // Khi mở modal
  const handleOpenModal = record => {
    // Thiết lập lại danh sách file đã chọn
    setSelectedFiles([...fileDossier?.[`InsertFileList${record?.CodeValue}`]])
    // Mở modal
    setOpenModalUpload(record)
  }

  // Khi gửi form
  const handleSubmit = async record => {
    // ...
    // Lưu danh sách file đã chọn
    fileDossier = {
      ...fileDossier,
      [`InsertFileList${record?.CodeValue}`]: selectedFiles,
    }
    // Gửi form
    // ...
  }
  const [openModalUpload, setOpenModalUpload] = useState(false)
  const columns = [
    {
      title: "STT",
      key: "stt",
      align: "center",
      width: 60,
      render: (value, record, index) => index + 1,
    },
    {
      title: "Tên giấy tờ",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Tên file",
      dataIndex: "listFile",
      key: "listFile",
      width: 400,
      render: (value, record, idx) => (
        <Tooltip
          title={
            !!fileDossier?.[`InsertFileList${record?.CodeValue}`]?.length ? (
              fileDossier?.[`InsertFileList${record?.CodeValue}`]?.map(
                (item, idx) => (
                  <span
                    key={`${record?.CodeValue}ww${idx}`}
                    onClick={e => {
                      e?.stopPropagation()
                      // saveAs(item?.FileUrl, item?.FileName)
                      // onPreview(item)

                      if (item?.FileUrl) window.open(item?.FileUrl)
                    }}
                    className="link-cus"
                  >
                    {item?.FileName}{" "}
                    {!!fileDossier?.length
                      ? idx <
                          fileDossier?.[`InsertFileList${record?.CodeValue}`]
                            ?.length && "| "
                      : ""}
                  </span>
                ),
              )
            ) : (
              <></>
            )
          }
          mouseEnterDelay={0.8}
        >
          <div className="max-line2">
            {!!fileDossier?.[`InsertFileList${record?.CodeValue}`]?.length ? (
              fileDossier?.[`InsertFileList${record?.CodeValue}`]?.map(
                (item, idx) => (
                  <span
                    onClick={e => {
                      e?.stopPropagation()
                      // saveAs(item?.FileUrl, item?.FileName)
                      // onPreview(item)

                      if (item?.FileUrl) window.open(item?.FileUrl)
                    }}
                    className="link-cus"
                  >
                    {item?.FileName}{" "}
                    {idx <
                      fileDossier?.[`InsertFileList${record?.CodeValue}`]
                        ?.length && ", "}
                  </span>
                ),
              )
            ) : (
              <></>
            )}
            <FloatActionWrapper size="small" className="float-action__wrapper">
              {!!true && (
                <div className="d-flex">
                  {{ IsUpdate: true }?.IsUpdate && (
                    <ButtonCircle
                      title="Tải file lên"
                      iconName="import"
                      style={{
                        background: "#EDF6FC",
                        boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                      }}
                      onClick={() => {
                        setOpenModalUpload(record)
                        // handleOpenModal(record)
                      }}
                    />
                  )}
                  {value?.filter(i => i?.TypeLink === TYPE_LINK.IMAGE_LINK)
                    ?.length > 0 && (
                    <ButtonCircle
                      title="Xem ảnh"
                      iconName="eye"
                      style={{
                        background: "#EDF6FC",
                        boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                      }}
                      onClick={() => {
                        // setVisible(true)
                        // setListPreviewImg(value)
                      }}
                    />
                  )}
                </div>
              )}
            </FloatActionWrapper>
          </div>
        </Tooltip>
      ),
    },
  ]
  useEffect(() => {
    getField("")
  }, [])
  const [fieldCCCD, setFieldCCCD] = useState()
  const getField = async (textSearch = "") => {
    try {
      const res = await FieldService.getCombobox(textSearch)
      if (res?.isError) return
      setListField(res?.Object?.Data)
      setFieldCCCD({
        RegisterBirthDay: res?.Object?.Data?.Birthday
          ? dayjs(res?.Object?.Data?.Birthday)
          : undefined,
        RegisterGender: res?.Object?.Data?.Sex,
        RegisterPosition: res?.Object?.Data?.Position,
      })
      setTwoText(res?.Object?.Data?.FullName)
    } finally {
    }
  }
  const getInfor = async DossierID => {
    try {
      const values = await form.validateFields(["RegisterIdentify"])
      const res = await UserService.getUserByIdentification(
        values?.RegisterIdentify,
      )
      // const ValueDetail = await Dossier.getDetail(DossierID)
      // const Value = ValueDetail?.Object?.Data
      // const getDetail = async DossierID => {
      //   try {
      //     const res = await Dossier.getDetail(DossierID)
      //     setDetail(res?.Object?.Data)

      //     if (res?.isError) return
      //     Notice({ msg: " getDetail thành công" })
      //     // handleChangePage(pagination)
      //   } finally {
      //   }
      // }
      if (res?.isError) return
      form.setFieldsValue({
        // IdentifyName:default.IdentifyName,
        // IdentifyName: Value?.IdentifyName,
        // RegisterName: res?.Object?.Data?.FullName,
        // RegisterPhone: res?.Object?.Data?.PhoneNumber,
        // RegisterFax: res?.Object?.Data?.Fax,
        // RegisterEmail: res?.Object?.Data?.Email,
        // RegisterAddress: res?.Object?.Data?.Address,
      })
      setFieldCCCD({
        RegisterBirthDay: res?.Object?.Data?.Birthday
          ? dayjs(res?.Object?.Data?.Birthday)
          : undefined,
        RegisterGender: res?.Object?.Data?.Sex,
        RegisterPosition: res?.Object?.Data?.Position,
      })
      setTwoText(res?.Object?.Data?.FullName)
    } finally {
    }
  }

  const isRegister = !!listIdentifyName?.length

  const searchInfoByCode = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields(["RegisterIdentify"])
      const res1 = await AuthService.getInfoByTaxCode(values?.RegisterIdentify)
      if (res1?.data?.code === "00") {
        form.setFieldsValue({
          RegisterName: res1.data?.data?.name,
          RegisterAddress: res1?.data?.data?.address,
        })
      } else {
        Notice({
          isSuccess: false,
          msg: res1.data.desc,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MyCVStyle>
      <Form
        layout="vertical"
        form={form}
        name="form-create-dosser"
        id="myFormDosser"
        scrollToFirstError={{
          behavior: "smooth",
          block: "center",
          inline: "top",
        }}
        getContainer={() => document.getElementById("root")}
      >
        <div className="d-flex-start mb-18">
          <div className="text-header mb-0 mr-20 fs-18">
            Phần I: Thông tin chung
          </div>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={[16, 0]}>
              {!!isRegister ? (
                <Col span={24}>
                  <div className="fw-600">
                    1. Danh sách tên định danh đăng ký
                  </div>
                  <div className="list-identifier-name mt-12 mb-12">
                    {listIdentifyName?.map((item, idx) => (
                      <div
                        className="identifier-item"
                        key={`listIdentifyName${idx}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Col>
              ) : (
                <Col span={24}>
                  <Row gutter={16}>
                    <Col flex={"auto"} style={{ width: 0 }}>
                      <Form.Item
                        label={
                          <div className="text-header">
                            1. Tên định đặt danh đăng ký
                            <span
                              className="pointer fw-100 link-underline"
                              style={{
                                fontStyle: "italic",
                              }}
                              onClick={() => {
                                CB1({
                                  title: `Tên định danh không quá 11 ký tự viết liền nhau sử dụng chữ cái Latin, chữ số (từ 0 đến 9) hoặc các ký tự (-), (_), (.), khoảng trắng; không phân biệt chữ hoa, chữ thường; không là một tập hợp chỉ gồm các chữ số và được sử dụng để hiển thị hoặc xác định thông tin về nguồn gửi!`,
                                  icon: "warning-usb",
                                  okText: "Đồng ý",
                                  disableCancel: "none",
                                  onOk: async close => {
                                    close()
                                  },
                                })
                              }}
                            >
                              (Xem quy định đặt tên định danh)
                            </span>
                          </div>
                        }
                        name="IdentifyName"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Thông tin không được để trống!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!!value) {
                                let myRegex = /[^A-Za-z0-9\-_.\s]/g
                                let isBrand = myRegex.exec(value)
                                if (isBrand || value?.length > 11)
                                  return Promise.reject(
                                    new Error(
                                      "Tên định danh không quá 11 ký tự viết liền nhau sử dụng chữ cái Latin, chữ số (từ 0 đến 9) hoặc các ký tự (-), (_), (.), khoảng trắng; không phân biệt chữ hoa, chữ thường; không là một tập hợp chỉ gồm các chữ số và được sử dụng để hiển thị hoặc xác định thông tin về nguồn gửi!",
                                    ),
                                  )
                                else return Promise.resolve()
                              } else return Promise.resolve()
                            },
                          }),
                        ]}
                        // onChange={e => {
                        //   const searchText = e.target.value
                        //   formatter(searchText)
                        // }}
                      >
                        <Input
                          // defaultValue={`${detail}`}
                          placeholder="Nhập tối đa 11 ký tự"
                          allowClear
                          className="btn-search-infor"
                        />
                      </Form.Item>
                    </Col>
                    <Col style={{ width: "auto" }}>
                      <Button
                        btnType="primary"
                        className="mt-30"
                        onClick={() => {
                          checkDossier()
                        }}
                      >
                        Kiểm tra
                      </Button>
                    </Col>
                  </Row>
                </Col>
              )}

              <Col span={12}>
                <Form.Item
                  label={<div className="text-header">2. Mục đích sử dụng</div>}
                  name="PurposeUse"
                >
                  <Select placeholder="Chọn" allowClear>
                    {getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_PURPOSEUSE,
                      listSystemKey,
                    )?.map(i => (
                      <Select.Option key={+i?.CodeValue} value={+i?.CodeValue}>
                        {i?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <div className="text-header">3. Hình thức sử dụng</div>
                  }
                  name="FormUse"
                >
                  <Select placeholder="Chọn">
                    {getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_FORMUSE,
                      listSystemKey,
                    )?.map(i => (
                      <Select.Option
                        key={`DOSSIER_FORMUSE${+i?.CodeValue}`}
                        value={+i?.CodeValue}
                      >
                        {i?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <div className="text-header">
                      4. Sản phẩm/ dịch vụ dự kiến sử dụng tên định danh (có tài
                      liệu kèm theo)
                    </div>
                  }
                  name="ProductAttached"
                >
                  {useMemo(
                    () => (
                      <RenderTiny
                        // defaultheight={!!isRegister ? "400px" : "440px"}
                        defaultheight={"300px"}
                        setLoading={setLoading}
                      />
                    ),
                    [],
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className="box-infor " style={{ height: "100%" }}>
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <Form.Item
                    label={
                      <div className="text-header">5. Lĩnh vực hoạt động</div>
                    }
                    name="ltField"
                  >
                    <Select
                      placeholder="Chọn"
                      allowClear
                      mode="multiple"
                      onSearch={value => {
                        getField(value)
                      }}
                      optionFilterProp="children"
                      showSearch
                      maxTagCount={"responsive"}
                      filterOption={false}
                    >
                      {!!listField?.length &&
                        listField?.map((item, idx) => (
                          <Select.Option
                            key={`ltField${idx}`}
                            value={item?.FieldID}
                          >
                            {item?.FieldCode} - {item?.FieldName}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label={
                      <div className="text-header">
                        6. Nhà mạng dự kiến sử dụng cho tên định danh{" "}
                      </div>
                    }
                    name="AnticipatedNetwork"
                  >
                    <Checkbox.Group>
                      {getListComboByKey(
                        SYSTEM_KEY?.DOSSIER_NETWORK,
                        listSystemKey,
                      )?.map(i => (
                        <Checkbox
                          key={`DOSSIER_NETWORK${i?.CodeValue}`}
                          value={+i?.CodeValue}
                        >
                          {i?.Description}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="text-header mb-5">
                    7. {!!(type === 2) ? "Cá nhân" : "Tổ chức/doanh nghiệp"}{" "}
                    đăng ký
                  </div>
                </Col>
                <Col span={24}>
                  <Row gutter={16}>
                    <Col flex="auto" style={{ width: 0 }}>
                      <Form.Item
                        label={
                          !!(type === 2)
                            ? `CMND/CCCD hoặc hộ chiếu`
                            : "Giấy ĐKKD"
                        }
                        name="RegisterIdentify"
                        rules={[
                          {
                            required: true,
                            message: "Thông tin không được để trống!",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập" allowClear />
                      </Form.Item>
                    </Col>
                    <Col style={{ width: "auto" }}>
                      <Button
                        btnType="primary"
                        className="mt-30"
                        onClick={() => {
                          if (type === 3) searchInfoByCode()
                          else getInfor()
                        }}
                      >
                        Lấy thông tin
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={`Tên ${
                      !!(type === 2) ? "cá nhân" : "tổ chức/doanh nghiệp"
                    }`}
                    name="RegisterName"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Chọn"
                      onChange={value => {
                        setTwoText(value?.target?.value)
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="RegisterEmail"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                      {
                        pattern: getRegexEmail(),
                        message: "Email nhập sai định dạng!",
                      },
                    ]}
                  >
                    <Input placeholder="Chọn" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Điện thoại "
                    name="RegisterPhone"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                      {
                        pattern: getRegexMobile(),
                        message:
                          "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập" />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label="Fax"
                    name="RegisterFax"
                    rules={[
                      {
                        pattern: getRegexMobile(),
                        message:
                          "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Địa chỉ"
                    name="RegisterAddress"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      style={{ height: "120px", overflow: "hidden auto" }}
                      placeholder="Nhập"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={24}>
            <InforUser
              isCopy
              fieldCCCD={fieldCCCD}
              form={form}
              isPersonal={type === 2}
            />
          </Col>
          <Col span={24}>
            <InforUser
              form={form}
              fieldCCCD={fieldCCCD}
              isPersonal={type === 2}
            />
          </Col>
          <Col span={24}>
            <div className="text-header fs-18">Phần II: Tài liệu kèm theo</div>
          </Col>

          <Col span={24}>
            <TableCustom
              isPrimary
              columns={columns}
              dataSource={getListComboByKey(
                SYSTEM_KEY?.DOSSIER_FILE_TYPE,
                listSystemKey,
              )?.map(i => ({
                Description: i?.Description,
                CodeValue: i?.CodeValue,
              }))}
              pagination={false}
              textEmpty="Không có giấy tờ"
              // sticky={{ offsetHeader: -17 }}
              scroll={{ x: "700px" }}
            />
          </Col>
          {!!(type === 3) && (
            <Col span={24}>
              <div className="fs-14" style={{ color: "#ff4d4f" }}>
                Lưu ý: Trong trường hợp tổ chức doanh nghiệp ủy quyền cho đơn vị
                khác đăng ký, hai bên làm giấy ủy quyền theo{" "}
                <span
                  className="hover-fw600 pointer"
                  style={{ color: "#4096ff", textDecoration: "underline" }}
                  onClick={e => {
                    e?.stopPropagation()
                    saveAs(
                      listSystemKey?.find(
                        item => item?.CodeKey === "DOCUMENT_MAU_UY_QUYEN",
                      )?.Description,
                      "Mẫu ủy quyền",
                    )
                  }}
                >
                  Mẫu số 3
                </span>
              </div>
            </Col>
          )}
          {/* <Col span={24}>
            <div className="text-header fs-18">Phần III: Cam kết</div>
          </Col>
          <Col span={24}>
            <div>
              {twoText} xin cam kết: <br />
              1. Chịu trách nhiệm trước pháp luật về tính chính xác và tính hợp
              pháp của nội dung trong đơn đề nghị {oneText} tên định danh và các
              tài liệu kèm theo. <br />
              2. Tự chịu trách nhiệm trước pháp luật về mục đích sử dụng và tính
              chính xác của các thông tin cung cấp, đảm bảo việc đăng ký và sử
              dụng tên định danh đúng quy định và không vi phạm quyền, lợi ích
              hợp pháp của tổ chức khác. <br />
              3. Cập nhật kịp thời thông tin liên quan tới tên định danh mỗi khi
              có thay đổi. <br />
              4. Nếu được {oneText} tên định danh, {twoText} sẽ chấp hành nghiêm
              chỉnh các quy định của pháp luật Việt Nam về sử dụng tên định
              danh, quảng cáo qua tin nhắn, gọi điện thoại và các quy định khác
              có liên quan.
            </div>
          </Col> */}
          <Col span={16}></Col>

          <Col span={6}>
            <div className="div-sign">
              <div className="text-center ">
                <span className="no-wrap ml-15">
                  <Paragraph
                    className="m-0 no-wrap"
                    editable={{
                      onChange: setStartSign,
                    }}
                  >
                    {startSign}
                  </Paragraph>
                </span>
              </div>
              <div className="fw-600 fs-14 text-center">
                Xác nhận của cá nhân, tổ chức/ doanh
              </div>
              <div className="fw-600 fs-14 text-center">
                nghiệp đăng ký tên định danh
              </div>
              <div className="fs-12 text-center">(ký tên đóng dấu nếu có)</div>
              <div
                className="mt-50 fw-600 fs-14 text-center"
                style={{ color: "#3269B1" }}
              >
                <div className="upfile-sign">
                  {/* <Form.Item
                    valuePropName="fileListSign"
                    name="fileSign"
                    getValueFromEvent={normFile}
                    className="m-0"
                  >
                    <ImgCrop
                      aspectSlider={true}
                      showGrid={true}
                      minZoom={0.1}
                      maxZoom={9}
                      resize={true}
                      rotationSlider={true}
                    >
                      <Upload
                        multiple={false}
                        maxCount={1}
                        customRequest={async options => {
                          const { onSuccess, onError, file, onProgress } =
                            options

                          const fmData = new FormData()
                          fmData.append("image", file)
                          onSuccess("Ok")
                        }}
                        className="pointer"
                        onChange={({ fileList: newFileList }) => {
                          setFileListSign(newFileList)
                        }}
                        listType="picture-card"
                        onPreview={onPreview}
                        onClick={e => {}}
                      >
                        <div
                          className="mt-50 fw-600 fs-14 text-center"
                          style={{ color: "#3269B1" }}
                        >
                          KÝ ĐIỆN TỬ
                        </div>
                      </Upload>
                    </ImgCrop>
                  </Form.Item> */}

                  <div
                    className="mt-50 fw-600 fs-14 text-center"
                    style={{ color: "#3269B1" }}
                    onClick={() => setSign(true)}
                  >
                    KÝ ĐIỆN TỬ
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      <div className="d-flex-end mt-70">
        <>
          <Button
            loading={loading || loading2}
            btnType="third"
            className="ml-24 pl-24 pr-24"
            form="myFormDosser"
            key="submit3"
            htmlType="submit"
            onClick={() => createCV(1)}
          >
            Lưu đơn
          </Button>
          <Button
            loading={loading || loading2}
            btnType="danger"
            className="ml-24 pl-24 pr-24"
            form="myFormDosser"
            key="submit4"
            htmlType="submit"
            onClick={() => createCV(2)}
          >
            Gửi đơn
          </Button>
        </>
        {/* <Button
          loading={loading}
          btnType="third"
          className="ml-24 pl-24 pr-24"
          onClick={() => {
            setViewFile(true)
          }}
        >
          Xem đơn
        </Button> */}
      </div>

      {viewFile && (
        <ModalViewPDF
          open={viewFile}
          onCancel={() => setViewFile(false)}
          fileUrl={"https://media.cdyt.vn/136,321c93583b00c86f"}
        />
      )}
      {!!openModalUpload && (
        <ModalImportFile
          open={openModalUpload}
          onCancel={() => setOpenModalUpload(false)}
          onOk={() => {}}
          listFormData={[]}
          documentRequiment={[]}
          fileDossier={fileDossier}
          setFileDossier={setFileDossier}
          // dossier={dossier}
          fileDelete={fileDelete}
          setFileDelete={setFileDelete}
        />
      )}
      {!!sign && <ModalListSign open={sign} onCancel={() => setSign(false)} />}
    </MyCVStyle>
  )
}

export default CVitem
