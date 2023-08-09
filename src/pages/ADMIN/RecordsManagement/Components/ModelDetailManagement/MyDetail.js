import {
  Card,
  Col,
  Collapse,
  Descriptions,
  Form,
  Row,
  Skeleton,
  Tooltip,
} from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import { MyCVStyle } from "src/pages/USER/MyCV/styled"
import Dossier from "src/services/Dossier"
import Activities from "./Activities"
import ModalImportFile from "./ModalImportFile"

const MyDetail = ({ dataDetail, open }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [viewDetail, setViewDetail] = useState()
  const [loading, setLoading] = useState(false)
  const [openModalUpload, setOpenModalUpload] = useState(false)
  const [fileDossier, setFileDossier] = useState([])

  const GetDetail = async () => {
    try {
      setLoading(true)
      let res = {}
      if (!dataDetail?.IsViewOld)
        res = await Dossier.getDetail(dataDetail?.DossierID)
      else
        res = await Dossier.viewDossierOld({
          DossierID: dataDetail?.DossierOld,
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
        {/* test3 */}
        {/* test2 */}

        {/* Test 1 */}

        <Row gutter={[16, 16]}>
          {/* // Bố cục 1 */}
          <Col span={24}>
            <Card>
              <Descriptions column={1}>
                <Descriptions.Item
                  style={{
                    color: "rgb(11, 66, 138)",
                    fontWeight: 600,
                    marginRight: "8px",
                  }}
                  className="text-header"
                  label="1. Tên đăng ký"
                >
                  <div className="text-dossier1">
                    {" "}
                    {viewDetail?.IdentifyName}
                  </div>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions column={3}>
                <div label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Trạng thái:{" "}
                  </span>
                  {""}
                  <span
                    style={{
                      color: viewDetail?.IsPaid === 1 ? "#52c41a" : "#ff4d4f",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    {viewDetail?.StatusName}
                  </span>
                </div>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Ngày gửi:
                  </span>
                  <span>
                    {" "}
                    {!!viewDetail?.DateSend
                      ? moment(viewDetail?.DateSend).format("DD/MM/YYYY HH:mm")
                      : ""}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Người xử lý:
                  </span>
                  <span>{viewDetail?.PersonHandle}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Ngày trả KQ:
                  </span>
                  <span> {viewDetail?.Datedecision}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Tình trạng:
                  </span>
                  <span> {viewDetail?.State ? "Đã đạt" : "Chưa đạt"}</span>
                </Descriptions.Item>
                <Descriptions.Item className="text-header" label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Thanh toán:
                  </span>
                  <span
                    style={{
                      color: viewDetail?.IsPaid === 1 ? "#52c41a" : "#ff4d4f",
                      fontWeight: 600,
                      marginRight: "8px",
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
                </Descriptions.Item>
              </Descriptions>
              <Collapse className="custom-collapse">
                <Collapse.Panel header="2. Mục đích sử dụng">
                  {getListComboByKey(
                    SYSTEM_KEY?.DOSSIER_PURPOSEUSE,
                    listSystemKey,
                  )?.find(i => i.CodeValue === viewDetail?.PurposeUse)
                    ?.Description ? (
                    getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_PURPOSEUSE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.PurposeUse)
                      ?.Description
                  ) : (
                    <span>Không có</span>
                  )}
                </Collapse.Panel>
                <Collapse.Panel header="3. Hình thức sử dụng">
                  {getListComboByKey(
                    SYSTEM_KEY?.DOSSIER_FORMUSE,
                    listSystemKey,
                  )?.find(i => i.CodeValue === viewDetail?.FormUse)
                    ?.Description ? (
                    getListComboByKey(
                      SYSTEM_KEY?.DOSSIER_FORMUSE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.FormUse)
                      ?.Description
                  ) : (
                    <span>Không có</span>
                  )}
                </Collapse.Panel>
                <Collapse.Panel header="4. Sản phẩm/ dịch vụ dự kiến sử dụng tên định danh (có tài liệu kèm theo)">
                  {/* <div
                    dangerouslySetInnerHTML={{
                      __html: viewDetail?.ProductAttached || "",
                    }}

                  /> */}
                  {viewDetail?.ProductAttached ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: viewDetail.ProductAttached,
                      }}
                    />
                  ) : (
                    <p>Không có</p>
                  )}
                </Collapse.Panel>
                <Collapse.Panel header="5. Lĩnh vực hoạt động">
                  {/* {viewDetail?.ltField.map((i, idx) => (
                    <div key={idx}>- {i.FieldName}</div>
                  ))} */}
                  {viewDetail?.ltField && viewDetail.ltField.length > 0 ? (
                    viewDetail.ltField.map((i, idx) => (
                      <div key={idx}>- {i.FieldName}</div>
                    ))
                  ) : (
                    <p>Không có</p>
                  )}
                </Collapse.Panel>

                <Collapse.Panel header="6. Nhà mạng dự kiến sử dụng cho tên định danh">
                  {/* {viewDetail?.ltAnticipatedNetwork?.map((item, idx) => (
                    <span key={`ltAnticipatedNetwork${idx}`}>
                      {getListComboByKey(
                        SYSTEM_KEY?.DOSSIER_NETWORK,
                        listSystemKey,
                      )?.map(i => {
                        if (i.CodeValue === item) {
                          return (
                            <span key={i.CodeValue}>
                              {i?.Description}
                              {", "}
                            </span>
                          )
                        }
                        return null
                      })}
                    </span>
                  ))} */}
                  {viewDetail?.ltAnticipatedNetwork &&
                  viewDetail.ltAnticipatedNetwork.length > 0 ? (
                    viewDetail.ltAnticipatedNetwork.map((item, idx) => (
                      <span key={`ltAnticipatedNetwork${idx}`}>
                        {getListComboByKey(
                          SYSTEM_KEY?.DOSSIER_NETWORK,
                          listSystemKey,
                        )?.map(i => {
                          if (i.CodeValue === item) {
                            return (
                              <span key={i.CodeValue}>
                                {i?.Description}
                                {", "}
                              </span>
                            )
                          }
                          return null
                        })}
                      </span>
                    ))
                  ) : (
                    <p>Không có</p>
                  )}
                </Collapse.Panel>
              </Collapse>
            </Card>
          </Col>
          {/* Bố cục 2 */}
          <Col span={24}>
            <Card>
              <Descriptions column={1}>
                <Descriptions.Item
                  column={1}
                  label={`7. ${
                    viewDetail.Type === 2 ? "Cá nhân" : "Tổ chức/doanh nghiệp"
                  } đăng ký`}
                ></Descriptions.Item>
              </Descriptions>
              <Descriptions column={3}>
                <Descriptions.Item>
                  <span className="fw-600 mr-8">
                    {`Tên ${
                      !!(viewDetail.Type === 2)
                        ? "cá nhân"
                        : "tổ chức/doanh nghiệp"
                    }`}
                    :
                  </span>{" "}
                  <span>{viewDetail?.RegisterName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Giấy ĐKKD:
                  </span>{" "}
                  <span>{viewDetail?.RegisterIdentify}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Điện thoại
                  </span>
                  {viewDetail?.RegisterPhone}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Email:
                  </span>
                  {viewDetail?.RegisterEmail}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Fax:
                  </span>
                  {viewDetail?.RegisterFax}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span
                    style={{
                      color: "rgba(0, 0, 0, 0.88)",
                      fontWeight: 600,
                      marginRight: "8px",
                    }}
                  >
                    Địa chỉ:
                  </span>
                  {viewDetail?.RegisterAddress}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          {/* Bố cục 3 */}
          <Col span={24}>
            <Card>
              <Descriptions column={1}>
                <Descriptions.Item label="8. Người quản lý tên định danh(phải là cá nhân)"></Descriptions.Item>
              </Descriptions>
              <Descriptions column={3}>
                <Descriptions.Item>
                  <span className="fw-600 mr-8">Họ và tên:</span>{" "}
                  <span>{viewDetail?.ManagerName}</span>
                </Descriptions.Item>
                <Descriptions.Item>
                  <span className="fw-600 mr-8">CMND/CCCD:</span>{" "}
                  <span>{viewDetail?.ManagerIdentify}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Ngày sinh:</span>{" "}
                  {!!viewDetail?.ManagerBirthDay
                    ? moment(viewDetail?.ManagerBirthDay).format("DD/MM/YYYY")
                    : ""}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Giới tính:</span>{" "}
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.find(i => i.CodeValue === viewDetail?.ManagerGender)
                      ?.Description
                  }
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Chức vụ:</span>{" "}
                  {viewDetail?.ManagerPosition}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Điện thoại:</span>{" "}
                  {viewDetail?.ManagerPhone}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Email:</span>{" "}
                  {viewDetail?.ManagerEmail}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Fax:</span>{" "}
                  {viewDetail?.ManagerFax}
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Địa chỉ:</span>{" "}
                  {viewDetail?.ManagerAddress}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          {/* Bố cục 4 */}
          <Col span={24}>
            <Card>
              <Descriptions column={1}>
                <Descriptions.Item label="9. Người đại diện làm thủ tục đăng ký tên định danh(phải là cá nhân)"></Descriptions.Item>
              </Descriptions>
              <Descriptions column={3}>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Họ và tên:</span>{" "}
                  <span>{viewDetail?.RepresentativeName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">CMND/CCCD:</span>{" "}
                  <span>{viewDetail?.RepresentativeIdentify}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Ngày sinh:</span>{" "}
                  {!!viewDetail?.RepresentativeBirthDay
                    ? moment(viewDetail?.RepresentativeBirthDay).format(
                        "DD/MM/YYYY",
                      )
                    : ""}
                </Descriptions.Item>

                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Giới tính:</span>{" "}
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.find(
                      i => i.CodeValue === viewDetail?.RepresentativeGender,
                    )?.Description
                  }
                </Descriptions.Item>
                {/* Thêm mục "Chức vụ" tại đây */}
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Chức vụ:</span>{" "}
                  {viewDetail?.RepresentativePosition}
                </Descriptions.Item>

                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Điện thoại:</span>{" "}
                  <span>{viewDetail?.RepresentativePhone}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Email:</span>{" "}
                  <span>{viewDetail?.RepresentativeEmail}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Fax:</span>{" "}
                  <span>{viewDetail?.RepresentativeFax}</span>
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <span className="fw-600 mr-8">Địa chỉ:</span>{" "}
                  <span>{viewDetail?.RepresentativeAddress}</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        {/* Bố cục 5 */}

        {/* GỐC */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={[16, 8]}></Row>
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
          <Activities dataDetail={dataDetail} open={open} />
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
  ) : (
    <Skeleton active />
  )
}

export default MyDetail
