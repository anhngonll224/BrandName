import { Form, Space, Spin, Upload } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import { getListComboByKey } from "src/lib/utils"
import FileService from "src/services/FileService"
import { saveAs } from "file-saver"
import FieldService from "src/services/Field/FieldService"
import { rest } from "lodash"
import SpinCustom from "src/components/Spin"

const ModalImportFile = ({
  open,
  onCancel,
  onOk,
  listFormData,
  documentRequiment,
}) => {
  const [loading, setLoading] = useState(false)
  const [test, setTest] = useState()
  const [listFile, setListFile] = useState([])
  const [listFileDelete, setListFileDelete] = useState([])
  const [form] = Form.useForm()

  const uploadFileProps = {
    name: "file",
    accept: ".xlsx",
    multiple: false,
    fileList: listFile,
    onChange(info) {
      setListFile(
        info.fileList.map(i => ({
          ...i,
          FileName: i.FileName ? i.FileName : i.name,
        })),
        // info,
      )
    },
    onRemove(file) {
      if (file.ObjectFileID)
        setListFileDelete(pre => [...pre, file.ObjectFileID])
    },
    beforeUpload() {
      return false
    },
  }

  // const handleUpload = async () => {
  //   try {
  //     setLoading(true)
  //     const formData = new FormData()
  //     listFile.forEach(file => formData.append("File", file[0].originFileObj))

  //     // const formData = new FormData()
  //     // listFile.map(i => formData.append("InsertFileList", i.originFileObj))
  //     // formData.append("GuidID", UserID)
  //     // formData.append("DocumentType", open.CodeValue)
  //     // if (listFileDelete.length > 0)
  //     //   listFileDelete.map(i => formData.append("DeleteFileList", i))

  //     const res = await FieldService.importField(formData)
  //     setTest(formData)

  //     if (res?.onOk) return
  //     Notice({
  //       msg: `${res ? "import file" : ""}  thành công!`,
  //     })
  //     onOk && onOk()
  //     onCancel()
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleUpload = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      listFile.forEach(file => formData.append("File", file.originFileObj))

      const res = await FieldService.importField(formData)
      setTest(formData)

      if (!!res?.Object) return
      Notice({
        msg: `${res ? "import file" : ""} thành công!`,
      })
      onOk && onOk()
      onCancel()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setListFileDelete([])
    setListFile([])
    if (open?.listFile?.length > 0)
      setListFile(
        open?.listFile?.map(i => ({
          ...i,
          name: i.FileName,
          url: i?.FileUrl,
        })),
      )
  }, [])
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const getTemplateUpload = () => {
    saveAs(
      listSystemKey?.find(
        item => item?.CodeKey === "TEMPLATE_FILE_IMPORT_FIELD",
      )?.Description,
      "file Lĩnh vực hoạt động ",
    )
  }
  return (
    <Form form={form} layout="vertical">
      <CustomModal
        title={`Import file `}
        open={open}
        onCancel={onCancel}
        footer={
          <Space size={16}>
            <Button btnType="primary" onClick={handleUpload}>
              Lưu lại
            </Button>
          </Space>
        }
      >
        <SpinCustom spinning={loading}>
          <div className="fw-600" style={{ marginBottom: 10 }}>
            Tải file mẫu
            <span
              onKeyPress={() => {}}
              onClick={getTemplateUpload}
              style={{ color: "#154398", cursor: "pointer" }}
            >
              Tại đây
            </span>
          </div>
          <Upload.Dragger {...uploadFileProps}>
            <p className="d-flex justify-content-center">
              <SvgIcon name="cloud" />
              <span style={{ marginLeft: 8 }}>
                Kéo thả file đính kèm hoặc Click để
              </span>
              <span
                style={{ color: "#0747A6", marginLeft: "5px", fontSize: 15 }}
              >
                Chọn file
              </span>
            </p>
          </Upload.Dragger>
        </SpinCustom>
      </CustomModal>
    </Form>
  )
}

export default ModalImportFile
