import React from "react"
import { Input } from "antd"
import CustomModal from "src/components/Modal/CustomModal"
const { TextArea } = Input
const ModelRefuse = ({ open, onCancel }) => {
  return (
    <CustomModal title="Từ chối hồ sơ" open={!!open} onCancel={onCancel}>
      <TextArea
        style={{
          height: "170px",
          overflow: "auto",
        }}
        rows={4}
        placeholder="Lý do Từ chối hồ sơ"
      />
    </CustomModal>
  )
}

export default ModelRefuse
