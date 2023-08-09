import { Col, Form, Radio, Row, Spin, Upload } from "antd"
import { saveAs } from "file-saver"
import { useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import Dossier from "src/services/Dossier"

const ImportFile = ({ open, onCancel, onOk }) => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(2)

  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [form] = Form.useForm()

  const normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleSubmit = async isSettingQuestion => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const formData = new FormData()
      const fileNew = values?.fileQuestion
      if (fileNew?.length)
        fileNew?.map(img => formData.append("file", img?.originFileObj))
      let res = {}
      if (value === 2) res = await Dossier.importData(formData)
      else res = await Dossier.importDataForNerwork(formData)

      if (!!res.isError) return

      Notice({
        isSuccess: true,
        msg: "Cập nhật thành công",
      })
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex-end">
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        onClick={handleSubmit}
      >
        Cập nhật
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={"Import file excel"}
      open={!!open}
      width="80%"
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <SpinCustom spinning={loading}>
        <Form form={form} layout="vertical" initialValues={{}}>
          <Row gutter={16}>
            <Col span={24}>
              <div className="fw-600 mb-8">Thời gian có hiệu lực</div>
              <div className="mb-12">
                <Radio.Group
                  value={value}
                  onChange={e => {
                    setValue(e?.target?.value)
                  }}
                >
                  <Radio value={2}>Có thời hạn( 3 năm )</Radio>
                  <Radio value={1}>Vô thời hạn</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={24}>
              <Form.Item
                valuePropName="fileList"
                name="fileQuestion"
                label={
                  <div
                    onClick={e => {
                      e?.stopPropagation()
                    }}
                  >
                    <span className="fw-600">File import </span>
                  </div>
                }
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  () => ({
                    validator(_, value) {
                      if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                        return Promise.reject(
                          new Error("Dung lượng file tối đa 5MB"),
                        )
                      }
                      // if (!!value && !value[0]?.name?.includes(".pdf")) {
                      //   return Promise.reject(
                      //     new Error("Chỉ chấp nhận file .pdf"),
                      //   )
                      // }
                      return Promise.resolve()
                    },
                  }),
                ]}
                getValueFromEvent={normFile}
              >
                <Upload.Dragger
                  beforeUpload={() => false}
                  accept=".xlsx, .xls"
                  multiple={false}
                  maxCount={1}
                  className="pointer"
                >
                  <Row gutter={16} className="justify-content-center">
                    <Col>
                      <SvgIcon name="cloud" />
                    </Col>
                    <Col>
                      <span>
                        Kéo thả file hoặc{" "}
                        <span style={{ color: "#154398" }}>Chọn File</span>
                      </span>
                    </Col>
                  </Row>
                </Upload.Dragger>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div
                onClick={e => {
                  e?.stopPropagation()
                }}
              >
                <span
                  className="fw-600 pointer"
                  style={{ color: "#0d99ff", textDecoration: "underline" }}
                  onClick={e => {
                    e?.stopPropagation()
                    saveAs(
                      listSystemKey?.find(
                        item => item?.CodeKey === "BRANDNAME_FILE_IMPORT",
                      )?.Description,
                      "BRANDNAME_FILE_IMPORT",
                    )
                  }}
                >
                  Tải File mẫu tại đây
                </span>
              </div>
            </Col>
          </Row>
        </Form>
      </SpinCustom>
    </CustomModal>
  )
}

export default ImportFile
