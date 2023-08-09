import { Image, Tooltip } from "antd"
import TableCustom from "src/components/Table/CustomTable"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useState } from "react"
import { TYPE_LINK } from "src/constants/constants"
import ModalImportFile from "../modal/ModalImportFile"
import { BackGround } from "../styled"
import { Title } from "chart.js"

const Curriculumvitae = ({
  documentRequiment,
  onOk,
  UserID,
  btnShow,
  listFormData,
}) => {
  const [visible, setVisible] = useState(false)
  const [listPreviewImg, setListPreviewImg] = useState(false)
  return (
    <BackGround>
      {/* {!!visible && (
        <div
          style={{
            display: "none",
          }}
        >
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: vis => setVisible(vis),
            }}
          >
            {listPreviewImg
              ?.filter(i => i?.TypeLink === TYPE_LINK.IMAGE_LINK)
              ?.map(i => (
                <Image src={i.FileUrl} key={i.FileUrl} />
              ))}
          </Image.PreviewGroup>
        </div>
      )} */}
    </BackGround>
  )
}

export default Curriculumvitae
