import { Drawer } from "antd"
import React from "react"

const QuestionDrawer = ({ open, onCancel }) => {
  return (
    <Drawer
      title={open?.TitleQuestion}
      placement="right"
      onClose={onCancel}
      width={"calc(100% - 250px)"}
      height={"calc(100vh - 54px)"}
      open={open}
      style={{ marginTop: 54, height: "calc(100vh - 54px)" }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: open?.Content,
        }}
      />
    </Drawer>
  )
}

export default QuestionDrawer
