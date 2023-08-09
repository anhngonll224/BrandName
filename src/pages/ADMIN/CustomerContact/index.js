import { Col, Divider, Row, Space, Select } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import CustomerContactService from "src/services/CustomerContactService"
import ListAddress from "../ListAddress"
import CustomerDetail from "./components/CustomerDetail"
import ModalInsertUpdateCustomer from "./components/ModalInsertUpdateCustomer"
import ModalUploadListDirectory from "./components/ModalUploadListDirectory"
import { CustomerDirectoryStyled } from "./styled"
import UserService from "src/services/UserService"
const { Option } = Select
const CustomerDirectory = () => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [addressSelect, setAddressSelect] = useState({})
  const [pagination, setPagination] = useState({
    PageSize: 20,
    CurrentPage: 1,
    Status: 1,
    AccountType: 2,
  })
  const [textSearch, setTextSeach] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(undefined)
  const [openInsert, setOpenInsert] = useState(false)
  const [openImport, setOpenImport] = useState(false)

  useEffect(() => {
    if (!!addressSelect?.key || addressSelect?.key === 0) {
      if (!pagination)
        setPagination({
          ...pagination,
          PageSize: 20,
          CurrentPage: 1,
          Status: 1,
        })
      else setPagination(pre => ({ ...pre, CurrentPage: 1 }))
    }
  }, [addressSelect?.RegionID])
  useEffect(() => {
    if (pagination) getList()
  }, [pagination])

  const getList = async () => {
    try {
      setLoading(true)
      const res = await UserService.GetAllUserDirectory({
        ...pagination,
        textSearch,
        RegionID: addressSelect?.RegionID,
      })
      if (res?.isError) return
      setData(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const handleChangePage = (page, pageSize) => {
    let currentPage = page
    if (pageSize !== pagination.PageSize) {
      currentPage = 1
    }
    setPagination({
      ...pagination,
      CurrentPage: currentPage,
      PageSize: pageSize,
    })
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 60,
      align: "center",
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination?.PageSize * (pagination?.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "UserName",
      key: "UserName",
      align: "center",
      width: 100,
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      key: "FullName",
      align: "center",
      width: 200,
      render: text => <div className="max-line1">{text}</div>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      align: "center",
      width: 120,
    },

    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      align: "center",
      width: 140,
      render: text => <div className="max-line1">{text}</div>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "FullAddress",
      key: "FullAddress",
      render: (text, record) => (
        <div className="d-flex justify-content-space-between align-items-center mh-36">
          <div className="max-line1">{text}</div>
          <div className="list-button-hover">{renderListButton(record)}</div>
        </div>
      ),
    },
  ]
  const renderListButton = record => {
    return (
      <Space>
        {!!data?.ButtonShow?.IsUpdate && (
          <ButtonCircle
            title="Cập nhật"
            iconName="edit-green"
            style={{ background: "#DDFEF0" }}
            onClick={() => setOpenInsert(record)}
          />
        )}

        {!!data?.ButtonShow?.IsReset && (
          <ButtonCircle
            title="Reset mật khẩu"
            iconName="reset-pass"
            style={{ background: "#EDF6FC" }}
            onClick={() =>
              CB1({
                title: `Bạn có chắc chắn muốn Reset mật khẩu tài khoản <strong> ${record?.UserName}</strong> không?`,
                icon: "warning-usb",
                okText: "Đồng ý",
                onOk: async close => {
                  onReset(record?.UserID)
                  close()
                },
              })
            }
          />
        )}
      </Space>
    )
  }
  const onReset = async UserID => {
    const res = await CustomerContactService.resetPassword({ UserID: UserID })
    if (res?.isError) return
    Notice({ msg: "Reset mật khẩu thàng công !" })
  }
  const handleChangeSelect = event => {
    setPagination({
      ...pagination,
      AccountType: event,
    })
  }
  return (
    <CustomerDirectoryStyled>
      <Row gutter={[16, 16]}>
        <Col md={4} xs={24}>
          <FlSelect onChange={handleChangeSelect} defaultValue={2}>
            <Option key={2} value={2}>
              Cá nhân
            </Option>
            <Option key={3} value={3}>
              Doanh nghiệp
            </Option>
          </FlSelect>
        </Col>
        <Col md={14} xs={24}>
          <FlInput
            search="true"
            allowClear
            label="Nhập tên, mã, SĐT khách hàng"
            onSearch={() => setPagination(pre => ({ ...pre, CurrentPage: 1 }))}
            onChange={e => setTextSeach(e?.target?.value)}
          />
        </Col>
        <Col lg={6} xs={24}>
          <FlSelect
            label="Trạng thái"
            defaultValue={1}
            onChange={Status => {
              setPagination(pre => ({ ...pre, Status, CurrentPage: 1 }))
            }}
            allowClear
          >
            {getListComboByKey(SYSTEM_KEY?.ACCOUNT_STATUS, listSystemKey)?.map(
              i => (
                <Option key={+i.CodeValue} value={+i.CodeValue}>
                  {i?.Description}
                </Option>
              ),
            )}
          </FlSelect>
        </Col>
      </Row>

      <Divider className="mv-16" />
      <Row gutter={16}>
        <Col style={{ width: 300 }}>
          <ListAddress
            getNoAddress={true}
            setAddressSelect={setAddressSelect}
            addressSelect={addressSelect}
          />
        </Col>
        <Col style={{ width: 0 }} flex="auto">
          <Row className="title-type-1 justify-content-space-between align-items-center pb-16 pt-0 mb-16">
            <div style={{ fontSize: 24 }}>Danh sách khách hàng</div>
            <Space>
              {data?.ButtonShow?.IsInsert && (
                <Button
                  btnType="primary"
                  className="btn-hover-shadow"
                  onClick={() => setOpenInsert(true)}
                >
                  {pagination.AccountType === 2
                    ? "Thêm khách hàng"
                    : "Thêm Tổ chức / Doanh nghiệp"}
                </Button>
              )}
            </Space>
          </Row>
          <TableCustom
            isPrimary
            dataSource={data?.ListDirectoryGetAllUser}
            columns={columns}
            onRow={record => {
              return {
                onClick: () => {
                  setOpenModalDetail(true)
                  setCustomerInfo(record)
                },
              }
            }}
            sticky={{ offsetHeader: -12 }}
            loading={loading}
            textEmpty="Không có khách hàng"
            pagination={{
              hideOnSinglePage: data?.Total <= 10,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total: data?.Total,
              locale: { items_per_page: "" },
              showSizeChanger: data?.Total > 10,
              onChange: handleChangePage,
            }}
            rowKey="UserID"
            scroll={{ x: "800px" }}
          />
        </Col>
      </Row>
      {!!openInsert && (
        <ModalInsertUpdateCustomer
          pagination={pagination}
          open={openInsert}
          onCancel={() => setOpenInsert(false)}
          onOk={getList}
        />
      )}

      {!!openImport && (
        <ModalUploadListDirectory
          open={openImport}
          onCancel={() => setOpenImport(false)}
          onOk={getList}
        />
      )}
      {!!openModalDetail && (
        <CustomerDetail
          customerInfo={data?.ListDirectoryGetAllUser?.find(
            item => item?.UserID === customerInfo?.UserID,
          )}
          open={openModalDetail}
          pagination={pagination}
          onCancel={() => {
            setOpenModalDetail(false)
            setCustomerInfo(undefined)
          }}
          onOk={getList}
        />
      )}
    </CustomerDirectoryStyled>
  )
}

export default CustomerDirectory
