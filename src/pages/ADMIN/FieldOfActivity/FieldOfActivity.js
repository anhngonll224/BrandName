import { Col, Form, Input, Row, Space } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import FieldService from "src/services/Field/FieldService"
import { TagsStyled } from "./styled"
// import ModalImportFile from "src/pages/USER/MyCV/modal/ModalImportFile"
import ModalImportFile from "./ModalImportFile"
import SpinCustom from "src/components/Spin"

const FieldOfActivity = () => {
  const [selectedNode, setSelectedNote] = useState()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [openModalUpload, setOpenModalUpload] = useState(false)

  const [dataEdit, setDataEdit] = useState()

  const [total, setTotal] = useState()
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 10,
    TextSearch: "",
  })

  const columns = [
    {
      title: "Mã ngành",
      dataIndex: "FieldCode",
      key: "FieldCode",
      width: 80,
      align: "center",
    },
    {
      title: "Tên ngành",
      dataIndex: "FieldName",
      key: "FieldName",
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
    setLoading(true)
    try {
      setLoading(true)
      const res = await FieldService.getAll({ ...pagination })
      setDataSource(res?.Object?.listField)
      setTotal(res?.Object?.total)
    } finally {
      setLoading(false)
    }
  }

  const insertTag = async () => {
    setLoading(true)

    try {
      const values = await form?.validateFields()
      const res = await FieldService[dataEdit ? "update" : "insert"]({
        ...values,
        FieldID: dataEdit?.FieldID,
        // Type: 1,
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
  const onDelete = async FieldID => {
    setLoading(true)

    try {
      const res = await FieldService.deleteField(FieldID)
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
              <div className="w-100pe">Lĩnh vực hoạt động ({total})</div>
              <FlInput
                search="true"
                allowClear
                label="Nhập tên/mã ngành"
                className="w-100pe"
                onSearch={TextSearch =>
                  setPagination(pre => ({ ...pre, TextSearch }))
                }
              />
            </div>
            <TableCustom
              setSelectedNote={setSelectedNote}
              dataSource={dataSource}
              isPrimary
              columns={columns}
              loading={loading}
              sticky={{ offsetHeader: -12 }}
              rowKey="FieldID"
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
                total: total,
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
              {/* {listButtonShow?.IsExport && ( */}

              {/* )} */}
              <div className="fs-16 fw-600">
                {!dataEdit ? "Thêm ngành" : "Cập nhật ngành"}
              </div>
              {!!dataEdit && (
                <Space>
                  <Button
                    btnType="primary"
                    className="btn-hover-shadow"
                    onClick={() => setOpenModalUpload(true)}
                  >
                    Import file
                  </Button>
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
                        title: `Bạn có chắc chắn muốn xoá thẻ này không?`,
                        icon: "warning-usb",
                        okText: "Đồng ý",
                        onOk: async close => {
                          onDelete(dataEdit?.FieldID)
                          close()
                        },
                      })
                    }
                  />
                </Space>
              )}
              {!dataEdit && (
                <Button
                  btnType="primary"
                  className="btn-hover-shadow"
                  onClick={() => setOpenModalUpload(true)}
                >
                  Import file
                </Button>
              )}
            </div>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Mã ngành"
                required
                className="mt-24"
                name="FieldCode"
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                ]}
              >
                <Input placeholder="Nhập mã" />
              </Form.Item>
              <Form.Item
                label="Tên ngành"
                required
                className="mt-24"
                name="FieldName"
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
                onClick={insertTag}
              >
                Ghi lại
              </Button>
            </div>
          </Col>
        </Row>
        {openModalUpload && (
          <ModalImportFile
            open={openModalUpload}
            onCancel={() => setOpenModalUpload(false)}
            onOk={() => getListTags()}
            listFormData={[]}
            documentRequiment={[]}
          />
        )}
      </SpinCustom>
    </TagsStyled>
  )
}

export default FieldOfActivity
