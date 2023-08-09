import { Col, Collapse, Row, Spin } from "antd"
import { saveAs } from "file-saver"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import Submisstion from "src/services/Submisstion"
import { SubmissionNextModalStyle } from "./styled"
import ModelDetailManagementNotButton from "src/pages/ADMIN/RecordsManagement/Components/ModelDetailManagement"
import SpinCustom from "src/components/Spin"

const SubmissionNextModal = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  const { listSystemKey } = useSelector(state => state.appGlobal)
  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 60,
      align: "center",
      // render: (text, row, idx) => (
      //   <div className="text-center">
      //     {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
      //   </div>
      // ),
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
      dataIndex: "RegisterName",
      key: "RegisterName",
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "Note",
      key: "Note",
      width: 300,
    },
  ]

  const getDetail = async record => {
    try {
      setLoading(true)
      const res = await Submisstion.getDetail({
        SubmissionID: record?.SubmissionID,
      })
      if (res?.isError) return
      setData(res?.Object?.Data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDetail(open)
  }, [open?.SubmissionID])

  return (
    <CustomModal
      title={"Chi tiết phiếu trình"}
      open={!!open}
      onCancel={onCancel}
      footer={null}
    >
      <SpinCustom spinning={loading}>
        <SubmissionNextModalStyle>
          <Row gutter={[16, 16]} className="mb-50">
            <Col span={12}>
              <Row className="boxHead">
                <Col span={24} className="center-text">
                  CỤC AN TOÀN THÔNG TIN
                </Col>
                <Col span={24} className="center-text bold">
                  TRUNG TÂM ỨNG CỨU KHẨN CẤP KHÔNG GIAN MẠNG
                </Col>
                <Col span={24} className="center-text">
                  --------------------
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24} className="center-text bold">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </Col>
                <Col span={24} className="center-text bold">
                  độc lập tự do hạnh phúc
                </Col>
                <Col span={24} className="center-text">
                  --------------------
                </Col>
              </Row>
            </Col>
            <Col span={12} className="center-text">
              Số : {data?.SubmissionCode}
            </Col>
            <Col span={12} className="center-text">
              {data?.Location}, ngày{" "}
              {data?.DateSubmit ? moment(data?.DateSubmit).format("DD") : "01"}{" "}
              tháng{" "}
              {data?.DateSubmit ? moment(data?.DateSubmit).format("YY") : "01"}{" "}
              năm{" "}
              {data?.DateSubmit
                ? moment(data?.DateSubmit).format("YYYY")
                : "2023"}
            </Col>
            <Col span={24} className="center-text bold ">
              <div className="textCenter">PHIẾU TRÌNH</div>
              <div className="">{data?.SubmissionName}</div>
              <div className="">-------------------------------</div>
            </Col>
            {/* <Col span={24} className="center-text bold"> */}
            {/* V/v báo cáo kết quả thẩm tra các thông tin cấp tên định danh
                  cho 16 hồ sơ hợp lệ ngày 15/06/2023 */}
            {/* </Col> */}
            <Col span={24} className="center-text bold">
              Kính gửi: Lãnh đạo Cục An toàn thông tin
            </Col>
            <Col span={24} className="center-text boxCenter">
              <div className="textBox pt-30 bold">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.OpinionLDC,
                  }}
                />
              </div>
            </Col>
            <Col span={24} className="center-text bold fs-20">
              Nội dung trình
            </Col>
            <Col span={24} className="lineHeight pl-32 pr-32">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.Content,
                }}
              />
              {/* <Col span={24} className="bold">
                1. Lý do, căn cứ trình
              </Col>
              <Col span={24}>
                Căn cứ vào 16 hồ sơ đăng ký tên định danh hợp lệ của 16 doanh
                nghiệp, hộ kinh doanh và cá nhân ngày 15/6/2023
              </Col>
              <Col span={24} className="bold">
                2. Nội dung trình
              </Col>
              <Col span={24}>
                NGày 15/6/2023.Trung tâm VNCERT/CC đã nhận được 39 bộ hồ sơ đăng
                ký tên định dnah của 39 doanh nghiệp, hộ kinh doanh và cá nhân.
                Trung tâm đã tiến hành thẩm tra hồ sơ. Có 16 hồ sơ đăng ký tên
                định danh hợp lệ của 16 đơn vị. Danh sách các tên định danh ở
                phụ lục đính kèm.
              </Col>
              <Col span={24} className="bold">
                3. Đề xuất/kiến nghị
              </Col>
              <Col span={24}>
                Trung tâm VNCERT/CC nhận thấy 16 hồ sơ trên đáp ứng được các yêu
                cầu Nghị định 91/2020/NĐ-CP. Kính trình lãnh đạo cục xem xét phê
                duyệt Giấy chứng nhận tên định danh cho những đơn vị này.
                <br />
                Trung tâm VNCERT kính trình.
              </Col> */}
            </Col>
            <Col span={17} className="lineHeight">
              <Row>
                <Col span={24} className="bold">
                  Nơi nhận:
                </Col>
                <Col span={24}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.Recipients,
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={7} className="lineHeight1">
              <Row className="MidBottom">
                <Col span={24} className="bold">
                  KT.GIÁM ĐỐC
                </Col>
                <Col span={24} className="bold">
                  PHÓ GIÁM ĐỐC
                </Col>
                <Col span={24} className="bold pt-60">
                  Đặng Huy Hoàng
                </Col>
              </Row>
            </Col>

            <Col span={24} className="bold">
              Tài liệu đính kèm
            </Col>
            <Col span={24}>
              {!!data?.fileAttack?.length &&
                data?.fileAttack?.map((item, idx) => (
                  <Col span={24} key={`filekem${idx}`}>
                    <div
                      onClick={e => {
                        e?.stopPropagation()
                        saveAs(item?.FileUrl, item?.FileName)
                        // onPreview(item?.FileUrl)
                      }}
                      className="pointer link-cus2 fw-100"
                    >
                      - {item?.FileName} ,
                    </div>
                  </Col>
                ))}
            </Col>
            <Col span={24} className="bold fs-20 textAline">
              Phụ lục
            </Col>
            <Col span={24} className="textAline">
              (Kèm theo phiếu trình số {data?.SubmissionCode} ngày{" "}
              {moment(data?.DateSubmit).format("DD/MM/YYYY")})
            </Col>
            {/* <Col span={24}>
              <Collapse defaultActiveKey={["1"]} ghost>
                <Collapse.Panel header="CẤP MỚI TÊN ĐỊNH DANH" key={"1"}>
                  <TableCustom
                    isPrimary
                    // onRow={record => {
                    //   return {
                    //     onClick: () => {
                    //       setOpenModalUserDetail(record)
                    //     },
                    //   }
                    // }}
                    className="mb-6"
                    // dataSource={count}
                    columns={columns}
                    textEmpty="Chưa có yêu cầu nào"
                    pagination={false}
                    rowKey="UserID"
                    sticky={{ offsetHeader: -12 }}
                    scroll={{ y: "100%", x: "800px" }}
                  />
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col span={24}>
              <Collapse defaultActiveKey={["1"]} ghost>
                <Collapse.Panel header="GIA HẠN TÊN ĐỊNH DANH" key={"1"}>
                  <TableCustom
                    isPrimary
                    // onRow={record => {
                    //   return {
                    //     onClick: () => {
                    //       setOpenModalUserDetail(record)
                    //     },
                    //   }
                    // }}
                    className="mb-6"
                    // dataSource={count}
                    columns={columns}
                    textEmpty="Chưa có yêu cầu nào"
                    pagination={false}
                    rowKey="UserID"
                    sticky={{ offsetHeader: -12 }}
                    scroll={{ y: "100%", x: "800px" }}
                  />
                </Collapse.Panel>
              </Collapse>
            </Col> */}

            {!!data?.ltDossier?.length ? (
              getListComboByKey(
                SYSTEM_KEY?.DOSSIER_PROCEDURE_TYPE,
                listSystemKey,
              )?.map((i, idx) =>
                data?.ltDossier?.filter(
                  item => item?.Procedure === i?.CodeValue,
                )?.length ? (
                  <Col span={24} key={`Collapse${idx}`}>
                    <Collapse
                    // defaultActiveKey={[idx]}
                    >
                      <Collapse.Panel
                        header={
                          <div className="text-uppercase fw-600">{`Hồ sơ ${
                            i?.Description
                          } TÊN ĐỊNH DANH (${
                            data?.ltDossier?.filter(
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
                          dataSource={data?.ltDossier?.filter(
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
                  </Col>
                ) : (
                  <></>
                ),
              )
            ) : (
              <></>
            )}
          </Row>
        </SubmissionNextModalStyle>
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

export default SubmissionNextModal
