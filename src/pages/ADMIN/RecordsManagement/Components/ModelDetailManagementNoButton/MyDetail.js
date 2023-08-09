import { Col, Collapse, Empty, Form, Row, Skeleton, Tooltip } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import { MyCVStyle } from "src/pages/USER/MyCV/styled"
import Dossier from "src/services/Dossier"
import ModalImportFile from "./ModalImportFile"
import Activities from "../ModelDetailManagement/Activities"

const MyDetail = ({ dataDetail }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [viewDetail, setViewDetail] = useState()

  const [loading, setLoading] = useState(false)
  const [openModalUpload, setOpenModalUpload] = useState(false)
  const [fileDossier, setFileDossier] = useState([])
  const GetDetail = async () => {
    // if (!!dataDetail?.Dossier) {
    try {
      setLoading(true)
      let res = {}
      if (!dataDetail?.IsViewOld)
        res = await Dossier.getDetail(dataDetail?.DossierID)
      else
        res = await Dossier.viewDossierOld({
          DossierID: dataDetail?.DossierOld || dataDetail?.DossierID,
        })

      if (res?.isError) return
      setViewDetail(res?.Object?.Data)

      let listFile
      getListComboByKey(SYSTEM_KEY?.DOSSIER_FILE_TYPE, listSystemKey)?.map(
        i =>
          (listFile = {
            ...listFile,
            [`InsertFileList${i?.CodeValue}`]:
              res?.Object?.Data?.ltFile?.filter(
                item => item?.FileType === i?.CodeValue,
              ),
          }),
      )
      setFileDossier(listFile)
    } finally {
      setLoading(false)
    }
    // }
  }

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
            !!fileDossier?.[`InsertFileList${record?.CodeValue}`]?.length &&
            fileDossier?.[`InsertFileList${record?.CodeValue}`]?.map(
              (item, idx) => (
                <span
                  onClick={e => {
                    e?.stopPropagation()
                    // saveAs(item?.FileUrl, item?.FileName)
                    // onPreview(item?.FileUrl)
                    if (item?.FileUrl) window.open(item?.FileUrl)
                  }}
                  className="link-cus"
                >
                  {item?.FileName} {idx < value?.length && ", "}
                </span>
              ),
            )
          }
          mouseEnterDelay={0.8}
        >
          <div className="max-line2">
            {!!fileDossier?.[`InsertFileList${record?.CodeValue}`]?.length &&
              fileDossier?.[`InsertFileList${record?.CodeValue}`]?.map(
                (item, idx) => (
                  <span
                    onClick={e => {
                      e?.stopPropagation()
                      // saveAs(item?.FileUrl, item?.FileName)
                      // onPreview(item?.FileUrl)
                      if (item?.FileUrl) window.open(item?.FileUrl)
                    }}
                    className="link-cus"
                  >
                    {item?.FileName} {idx < value?.length && ", "}
                  </span>
                ),
              )}
            {/* <FloatActionWrapper size="small" className="float-action__wrapper">
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
            </FloatActionWrapper> */}
          </div>
        </Tooltip>
      ),
    },
  ]

  useEffect(() => {
    GetDetail()
  }, [dataDetail])

  return viewDetail ? (
    <MyCVStyle>
      <Form
        layout="vertical"
        name="form-create-dosser"
        id="myFormDosser"
        scrollToFirstError={{
          behavior: "smooth",
          block: "center",
          inline: "center",
        }}
        getContainer={() => document.getElementById("root")}
      >
        <div>
          <div className="text-header mb-0 mr-20 fs-20 text-uppercase">
            HỒ SƠ{" "}
            {
              getListComboByKey(
                SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
                listSystemKey,
              )?.find(item => item?.CodeValue === viewDetail?.Procedure)
                ?.Description
            }{" "}
            TÊN DỊNH DANH MÃ:{viewDetail.DossierCodeDisplay}
          </div>
          <div className="text-header mb-0 mr-20 fs-17 mt-12 mb-12">
            Phần I: Thông tin chung
          </div>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <div>
                  <b className="text-header"> 1. Tên đăng ký</b>
                  <div className="text-dossier">
                    {" "}
                    {viewDetail?.IdentifyName}
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <span className="fw-600">Trạng thái:</span>{" "}
                <span className="fw-600 highline">
                  {viewDetail?.StatusName}
                  {/* {
                    getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_FORMUSE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.StatusName)
                      ?.Description
                  } */}
                </span>
              </Col>
              <Col span={8}>
                <span className="fw-600">Ngày gửi:</span>{" "}
                <span className="fw-500">
                  {!!viewDetail?.DateSend
                    ? moment(viewDetail?.DateSend).format("DD/MM/YYYY HH:mm")
                    : ""}
                </span>
              </Col>
              <Col span={8}>
                <span className="fw-600">Người xử lý:</span>{" "}
                <span className="fw-500">{viewDetail?.PersonHandle}</span>
              </Col>
              <Col span={8}>
                <span className="fw-600">Ngày trả KQ:</span>{" "}
                <span className="fw-500">{viewDetail?.Datedecision}</span>
              </Col>
              <Col span={8}>
                <span className="fw-600">Tình trạng:</span>{" "}
                <span className="fw-500">
                  {viewDetail?.State ? "Đã đạt" : "Chưa đạt"}
                </span>
              </Col>
              <Col span={8}>
                <span className="fw-600">Thanh toán:</span>
                <span
                  className="fw-600 fw-600 ml-5"
                  style={{
                    color: viewDetail?.IsPaid === 1 ? "#52c41a" : "#ff4d4f",
                  }}
                >
                  {/* {viewDetail?.IsPaid ? "Đã thanh toán" : "Chưa thanh toán"} */}

                  {
                    getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_PAYMENT,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.IsPaid)
                      ?.Description
                  }
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <div>
                  <b className="text-header">2. Mục đích sử dụng:</b>{" "}
                </div>
                <div>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_PURPOSEUSE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.PurposeUse)
                      ?.Description
                  }
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <b className="text-header">3. Hình thức sử dụng:</b>
                </div>
                <div>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_FORMUSE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.FormUse)
                      ?.Description
                  }
                </div>
              </Col>
              <Col span={24}>
                <div>
                  <b className="text-header">
                    4. Sản phẩm/ dịch vụ dự kiến sử dụng tên định danh (có tài
                    liệu kèm theo)
                  </b>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: viewDetail?.ProductAttached || "",
                  }}
                />
              </Col>

              <Col span={24}>
                <div>
                  <b className="text-header">5. Lĩnh vực hoạt động</b>
                </div>
                {viewDetail?.ltField.map((i, idx) => (
                  <div key={idx}>- {i.FieldName}</div>
                ))}
              </Col>
              <Col span={24}>
                <div>
                  <b className="text-header">
                    6. Nhà mạng dự kiến sử dụng cho tên định danh
                  </b>
                  <div>
                    {viewDetail?.ltAnticipatedNetwork?.map((item, idx) => (
                      <span key={`ltAnticipatedNetwork${idx}`}>
                        {getListComboByKey(
                          SYSTEM_KEY?.DOSSIER_NETWORK,
                          listSystemKey,
                        )?.map(i => {
                          if (i.CodeValue === item) {
                            return (
                              <span>
                                {i?.Description}
                                {", "}
                              </span>
                            )
                          }
                        })}
                      </span>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div
              className="box-infor "
              style={{ lineHeight: "2.5rem", height: "100%" }}
            >
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <div className="text-header">
                    7.{" "}
                    {!!(viewDetail.Type === 2)
                      ? "Cá nhân"
                      : "Tổ chức/doanh nghiệp"}{" "}
                    đăng ký
                  </div>
                </Col>

                <Col span={24}>
                  <span className="fw-600">
                    {`Tên ${
                      !!(viewDetail.Type === 2)
                        ? "cá nhân"
                        : "tổ chức/doanh nghiệp"
                    }`}
                    :
                  </span>{" "}
                  <span>{viewDetail?.RegisterName}</span>
                </Col>
                <Col span={12}>
                  <span className="fw-600">Giấy ĐKKD:</span>{" "}
                  <span>{viewDetail?.RegisterIdentify}</span>
                </Col>
                <Col span={12}>
                  <span className="fw-600">Điện thoại:</span>{" "}
                  <span>{viewDetail?.RegisterPhone}</span>
                </Col>
                <Col span={12}>
                  <span className="fw-600">Email:</span>{" "}
                  <span>{viewDetail?.RegisterEmail}</span>
                </Col>

                <Col span={12}>
                  <span className="fw-600">Fax:</span>{" "}
                  <span>{viewDetail?.RegisterFax}</span>
                </Col>
                <Col span={24}>
                  <span className="fw-600">Địa chỉ:</span>{" "}
                  <span>{viewDetail?.RegisterAddress}</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={12} style={{ lineHeight: "2rem" }}>
            <Row className="box-infor ">
              <Col span={24}>
                <div className="text-header">
                  8. Người quản lý tên định danh(phải là các nhân)
                </div>
              </Col>
              <Col span={12}>
                <span className="fw-600">Họ và tên:</span>{" "}
                <span>{viewDetail?.ManagerName}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">CMND/CCCD:</span>{" "}
                <span>{viewDetail?.ManagerIdentify}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Ngày sinh:</span>{" "}
                <span>
                  {!!viewDetail?.ManagerBirthDay
                    ? moment(viewDetail?.ManagerBirthDay).format("DD/MM/YYYY")
                    : ""}
                </span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Giới tính:</span>{" "}
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.ManagerGender)
                      ?.Description
                  }
                </span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Chức vụ:</span>{" "}
                <span>{viewDetail?.ManagerPosition}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Điện thoại:</span>{" "}
                <span>{viewDetail?.ManagerPhone}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Email:</span>{" "}
                <span>{viewDetail?.ManagerEmail}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Fax:</span>{" "}
                <span>{viewDetail?.ManagerFax}</span>
              </Col>
              <Col span={24}>
                <span className="fw-600">Địa chỉ:</span>{" "}
                <span>{viewDetail?.ManagerAddress}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ lineHeight: "1.62rem" }}>
            <Row className="box-infor ">
              <div className="text-header">
                9. Người đại diện làm thủ tục đăng ký tên định danh(phải là cá
                nhân)
              </div>
              <Col span={12}>
                <span className="fw-600">Họ và tên:</span>{" "}
                <span>{viewDetail?.RepresentativeName}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">CMND/CCCD:</span>{" "}
                <span>{viewDetail?.RepresentativeIdentify}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Ngày sinh:</span>{" "}
                <span>
                  {!!viewDetail?.RepresentativeBirthDay
                    ? moment(viewDetail?.RepresentativeBirthDay).format(
                        "DD/MM/YYYY",
                      )
                    : ""}
                </span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Giới tính:</span>{" "}
                <span>
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.find(
                      i => i.CodeValue === viewDetail?.RepresentativeGender,
                    )?.Description
                  }
                </span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Chức vụ:</span>{" "}
                <span>{viewDetail?.RepresentativePosition}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Điện thoại:</span>{" "}
                <span>{viewDetail?.RepresentativePhone}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Email:</span>{" "}
                <span>{viewDetail?.RepresentativeEmail}</span>
              </Col>
              <Col span={12}>
                <span className="fw-600">Fax:</span>{" "}
                <span>{viewDetail?.RepresentativeFax}</span>
              </Col>
              <Col span={24}>
                <span className="fw-600">Địa chỉ:</span>{" "}
                <span>{viewDetail?.RepresentativeAddress}</span>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className="text-header fs-17">Phần II: Tài liệu kèm theo</div>
          </Col>
          <Col span={24}>
            <TableCustom
              columns={columns}
              dataSource={getListComboByKey(
                SYSTEM_KEY?.DOSSIER_FILE_TYPE,
                listSystemKey,
              )?.map(i => ({
                Description: i?.Description,
                CodeValue: i?.CodeValue,
              }))}
              pagination={false}
              // sticky={{ offsetHeader: -10 }}
              scroll={{ x: "700px" }}
            />
          </Col>
          <Col span={24}>
            <div className="text-header fs-17"></div>
          </Col>
          {viewDetail?.ltReasonAdditional && (
            <Col span={24}>
              <div>
                <b className="text-header">Lý do bổ sung</b>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: viewDetail?.ltReasonAdditional || "",
                }}
              />
            </Col>
          )}
          {viewDetail?.ltReasonRefuse && (
            <Col span={24}>
              <div>
                <b className="text-header">Lý do từ chối</b>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: viewDetail?.ltReasonRefuse || "",
                }}
              />
            </Col>
          )}
        </Row>
      </Form>
      <Collapse defaultActiveKey={["1"]} ghost>
        <Collapse.Panel
          header={<b className="text-header">Hoạt động</b>}
          key={"1"}
        >
          <Activities dataDetail={viewDetail} />
        </Collapse.Panel>
      </Collapse>
      {!!openModalUpload && (
        <ModalImportFile
          open={openModalUpload}
          onCancel={() => setOpenModalUpload(false)}
          onOk={() => {}}
          listFormData={[]}
          documentRequiment={[]}
          fileDossier={fileDossier}
          setFileDossier={setFileDossier}
        />
      )}
    </MyCVStyle>
  ) : dataDetail?.DossierID ? (
    <Skeleton active />
  ) : (
    <div className="d-flex-center" style={{ height: "400px" }}>
      <Empty description="Không có hồ sơ" />
    </div>
  )
}

export default MyDetail
