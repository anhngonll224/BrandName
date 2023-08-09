import { Col, Form, Input, Row, Space, Select } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import TagsService from "src/services/TagsService"
import { TagsStyled } from "./styled"
import PositionService from "src/services/PositionService"
import SpinCustom from "src/components/Spin"

const ListOfPositions = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [dataEdit, setDataEdit] = useState()

  const [total, setTotal] = useState()
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    TextSearch: "",
    // Type: 1,
  })

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 70,
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
      align: "center",
    },
    {
      title: "Tên Chức vụ",
      dataIndex: "PositionName",
      key: "PositionName",
      width: "calc(100% - 25% - 70px)",
    },
    {
      title: "Ghi chú",
      dataIndex: "Note",
      key: "Note",
      width: "35%",
    },
  ]

  useEffect(() => {
    getListTags()
  }, [pagination])

  const getListTags = async () => {
    try {
      setLoading(true)
      const res = await PositionService.getListPosition({ ...pagination })
      setDataSource(res?.Object?.data)
      setTotal(res?.Object?.total)
    } finally {
      setLoading(false)
    }
  }

  const insertFrom = async () => {
    setLoading(true)

    try {
      const values = await form?.validateFields()
      const res = await PositionService[dataEdit ? "update" : "create"]({
        ...values,
        PositionID: dataEdit?.PositionID,
        Type: 1,
      })
      if (res?.isError) return
      Notice({ msg: `${dataEdit ? "Cập nhật" : "Thêm"} thẻ thành công !` })
      getListTags()
      form.resetFields()
      setDataEdit(undefined)
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async PositionID => {
    setLoading(true)

    try {
      const res = await PositionService.deletePos(PositionID)
      if (res?.isError) return
      Notice({ msg: `Xoá thẻ thành công !` })
      getListTags()
      form.resetFields()
      setDataEdit(undefined)
    } finally {
      setLoading(false)
    }
  }
  return (
    <TagsStyled>
      <SpinCustom spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col style={{ width: "calc(100% - 400px)" }}>
            <div className="title-type-1 d-flex justify-content-space-between pt-2 pb-12 mb-16">
              <div className="w-100pe">Danh sách chức vụ ({total})</div>
              <FlInput
                search="true"
                allowClear
                label="Nhập tên chức vụ"
                className="w-100pe"
                onSearch={TextSearch =>
                  setPagination(pre => ({ ...pre, TextSearch }))
                }
              />
            </div>
            <TableCustom
              dataSource={dataSource}
              isPrimary
              columns={columns}
              loading={loading}
              sticky={{ offsetHeader: 54 }}
              rowKey="PositionID"
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    setDataEdit(record)
                    form.setFieldsValue({ ...record })
                  },
                }
              }}
              pagination={{
                hideOnSinglePage: total <= 10,
                current: pagination.CurrentPage,
                pageSize: pagination.PageSize,
                responsive: true,
                total,
                locale: { items_per_page: "" },
                showSizeChanger: total > 10,
                onChange: (CurrentPage, PageSize) => {
                  setPagination({
                    ...pagination,
                    CurrentPage,
                    PageSize,
                  })
                },
              }}
            />
          </Col>
          <Col style={{ width: 400 }} className="form-insert">
            <div className="d-flex justify-content-space-between align-items-center">
              <div className="fs-16 fw-600">
                {!dataEdit ? "Thêm chức vụ" : "Cập nhật chức vụ"}
              </div>
              {!!dataEdit && (
                <Space>
                  <ButtonCircle
                    iconName="add-blue"
                    onClick={() => {
                      form.resetFields()
                      setDataEdit(undefined)
                    }}
                  />
                  <ButtonCircle
                    iconName="bin"
                    onClick={() =>
                      CB1({
                        title: `Bạn có chắc chắn muốn xoá chức vụ này không?`,
                        icon: "warning-usb",
                        okText: "Đồng ý",
                        onOk: async close => {
                          onDelete(dataEdit?.PositionID)
                          close()
                        },
                      })
                    }
                  />
                </Space>
              )}
            </div>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Tên chức vụ"
                required
                className="mt-24"
                name="PositionName"
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>

              <Form.Item label="Ghi chú" name="Note" className="mt-16">
                <Input.TextArea
                  style={{ minHeight: 120 }}
                  placeholder="Nhập ghi chú"
                />
              </Form.Item>
            </Form>
            <div className="d-flex justify-content-flex-end mt-24">
              <Button
                btnType="primary"
                className="btn-hover-shadow"
                onClick={insertFrom}
              >
                Ghi lại
              </Button>
            </div>
          </Col>
        </Row>
      </SpinCustom>
    </TagsStyled>
  )
}

export default ListOfPositions
