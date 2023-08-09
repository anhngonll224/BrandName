import { Modal } from "antd"
import React from "react"
import CustomModal from "src/components/Modal/CustomModal"

const ModalEdit = ({ title, isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default ModalEdit
