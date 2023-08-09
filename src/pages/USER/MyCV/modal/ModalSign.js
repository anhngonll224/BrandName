import { Form, Modal, Space, Tabs, Upload } from "antd"
import React, { useRef, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SignatureCanvas from "react-signature-canvas"
import ImgCrop from "antd-img-crop"
import styled from "styled-components"
import sign from "src/assets/images/sign/handsign.png"
import img from "src/assets/images/sign/image.png"
import { normFile } from "src/lib/utils"
const SignModalStyle = styled.div`
  .title-modal-sign {
    font-size: 20px;
    color: #00bbde;
    font-weight: bold;
  }
  .sign-box {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ccc;
    padding: 24px;
  }
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
  .ant-upload-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ant-upload-list-item-container {
      width: 300px !important;
      height: 300px !important;
    }
  }
`
const ModalSign = ({ open, onCancel }) => {
  const ref = useRef()
  const [trimData, setTrimData] = useState()
  const [active, setActive] = useState(1)

  const [fileListSign, setFileListSign] = useState([])
  const trimSign = () => {
    setTrimData(ref?.current?.getTrimmedCanvas().toDataURL("image/png"))
    // .current.toDataURL()
  }

  const onPreview = async file => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const onChange = key => {
    setActive(key)
    console.log(key === 1)
  }
  const items = [
    {
      key: 1,
      label: (
        <div className="d-flex-center" style={{ flexDirection: "column" }}>
          <div>
            <img src={sign} alt="chữ ký" />
          </div>
          <div>Chữ ký tay</div>
        </div>
      ),
      children: ``,
    },
    {
      key: 2,
      label: (
        <div className="d-flex-center" style={{ flexDirection: "column" }}>
          <div>
            <img src={img} alt="chữ ký" />
          </div>
          <div>Ảnh chữ ký</div>
        </div>
      ),
      children: ``,
    },
  ]
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      style={{ top: "12px" }}
      width="50vw"
      footer={
        <Space size={16}>
          <Button
            btnType="primary"
            onClick={() => {
              console.log(ref)
              ref?.current?.clear()
            }}
          >
            Xóa
          </Button>
          <Button
            btnType="primary"
            onClick={() => {
              console.log(ref)
              trimSign()
            }}
          >
            Lưu lại
          </Button>
        </Space>
      }
    >
      <SignModalStyle>
        <div className="d-flex-center p-24 title-modal-sign">Chọn chữ ký</div>
        <div>
          {" "}
          <Tabs
            defaultActiveKey={1}
            activeKey={active}
            type="card"
            items={items}
            onChange={onChange}
          />
        </div>
        {!!(active === 1) ? (
          <div className="sign-box" style={{}}>
            <span style={{ background: "#fff" }}>
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 300,
                  height: 300,
                  border: "1px solid #ccc",
                  className: "sigCanvas",
                }}
                ref={ref}
              />
            </span>
          </div>
        ) : (
          <Form>
            <Form.Item
              valuePropName="fileListSign"
              name="fileSign"
              getValueFromEvent={normFile}
              className="m-0"
            >
              <ImgCrop
                aspectSlider={true}
                showGrid={true}
                minZoom={0.1}
                maxZoom={9}
                resize={true}
                rotationSlider={true}
              >
                <Upload
                  multiple={false}
                  maxCount={1}
                  customRequest={async options => {
                    const { onSuccess, onError, file, onProgress } = options

                    const fmData = new FormData()
                    fmData.append("image", file)
                    onSuccess("Ok")
                  }}
                  className="pointer"
                  onChange={({ fileList: newFileList }) => {
                    setFileListSign(newFileList)
                  }}
                  listType="picture-card"
                  onPreview={onPreview}
                  onClick={e => { }}
                >
                  <Button
                    btnType="third"
                    iconName="uploadProfile-blue"
                    className="mt-24 "
                    style={{ color: "#3269B1" }}
                  >
                    Tải chữ ký
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form>
        )}
        {/* <div>Ảnh</div>

        {trimData ? (
          <div className="sign-box">
            <img style={{ objectFit: "contain" }} alt="chữ ký" src={trimData} />
          </div>
        ) : (
          <></>
        )} */}
      </SignModalStyle>
    </Modal>
  )
}

export default ModalSign
