import { Space, Spin, Upload } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import SvgIcon from "src/components/SvgIcon"
import STORAGE, { getStorage } from "src/lib/storage"

const ModalImportFile = ({
  open,
  onCancel,
  onOk,
  setFileDossier,
  fileDossier,
  dossier,
  fileDelete,
  setFileDelete,
}) => {
  const [loading, setLoading] = useState(false)
  const [listFile, setListFile] = useState([])
  const [listFileDelete, setListFileDelete] = useState([])

  const uploadFileProps = {
    name: "file",
    multiple: true,
    fileList: listFile,
    onChange(info) {
      setListFile(
        info.fileList.map(i => ({
          ...i,
          FileName: i.FileName ? i.FileName : i.name,
        })),
      )
    },
    beforeUpload() {
      return false
    },
  }

  const handleUpload = () => {
    let listFileRoot = dossier?.ltFile?.filter(
      item => item?.FileType === open?.CodeValue,
    )

    let listFileIDNow = listFile
      ?.filter(items => items?.FileID)
      ?.map(items => items?.FileID)

    let listFileDelete = listFileRoot
      ?.filter(
        item =>
          !!item?.FileID &&
          !listFileIDNow?.includes(item?.FileID) &&
          (fileDelete?.length ? !fileDelete?.includes(item?.FileID) : true),
      )
      ?.map(items => items?.FileID)
    if (listFileDelete?.length)
      setFileDelete(pre => {
        if (pre?.length) return [...pre, ...listFileDelete]?.flat()
        else return listFileDelete
      })
    setFileDossier(pre => ({
      ...pre,
      [`InsertFileList${open?.CodeValue}`]: listFile,
    }))
    onOk()

    onCancel()
  }

  useEffect(() => {
    setListFileDelete([])
    setListFile([])
    if (fileDossier?.[`InsertFileList${open?.CodeValue}`]?.length > 0)
      setListFile(
        fileDossier?.[`InsertFileList${open?.CodeValue}`]?.map(i => ({
          ...i,
          name: i?.FileName,
          url: i?.FileUrl,
        })),
      )
  }, [])
  return (
    <CustomModal
      title={`Tải file "${open?.Description}"`}
      open={open}
      onCancel={onCancel}
      width="80vw"
      footer={
        <Space size={16}>
          <Button btnType="primary" onClick={handleUpload}>
            Lưu lại
          </Button>
        </Space>
      }
    >
      <SpinCustom spinning={loading}>
        <Upload.Dragger {...uploadFileProps}>
          <p className="d-flex justify-content-center">
            <SvgIcon name="cloud" />
            <span style={{ marginLeft: 8 }}>
              Kéo thả file đính kèm hoặc Click để
            </span>
            <span style={{ color: "#0747A6", marginLeft: "5px", fontSize: 15 }}>
              Chọn file
            </span>
          </p>
        </Upload.Dragger>
      </SpinCustom>
    </CustomModal>
  )
}

export default ModalImportFile
