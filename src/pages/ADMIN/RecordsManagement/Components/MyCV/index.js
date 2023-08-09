import { Tabs } from "antd"
import { useEffect } from "react"
import STORAGE from "src/lib/storage"
import { TabsNewsStyled } from "src/pages/ANONYMOUS/Home/styled"
import CVitem from "./components/CVitem"
import { TabCVStyle } from "./styled"

const MyCV = ({
  isAdmin,
  singlePage,
  setFooter,
  open,
  IsAdditional,
  checkDossier,
  type,
  setType,
  setFileDossier,
  fileDossier,
  dossier,
  fileDelete,
  setFileDelete,
  form,
  loading2,
  startSign,
  setStartSign,
}) => {
  const userInfo = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))

  // const [startSign, setStartSign] = useState(
  //   `Hà Nội, ngày ${moment().format("DD")} tháng ${moment().format(
  //     "MM",
  //   )} năm ${moment().format("YYYY")}`,
  // )

  useEffect(() => {
    form.setFieldsValue({
      RegisterEmail: userInfo?.Email,
      RegisterPhone: userInfo?.PhoneNumber,
      RegisterAddress: userInfo?.FullAddress,
      RegisterIdentify: userInfo?.Identification,
      RegisterName: userInfo?.FullName,
    })
  }, [])

  const items = [
    {
      label: "Cá nhân",
      key: 2,
      children: <></>,
    },
    {
      label: "Tổ chức/ Doanh nghiệp",
      key: 3,
      children: <></>,
    },
  ]
  return (
    <TabCVStyle
      isAdmin={isAdmin}
      singlePage={singlePage}
      className={!!setFooter ? "p-0" : ""}
    >
      {!!isAdmin ? (
        <TabsNewsStyled>
          <Tabs items={items} onChange={value => setType(pre => value)} />
        </TabsNewsStyled>
      ) : (
        <></>
      )}
      <CVitem
        open={open}
        startSign={startSign}
        setStartSign={setStartSign}
        type={type}
        form={form}
        loading2={loading2}
        fileDossier={fileDossier}
        setFileDossier={setFileDossier}
        checkDossier={checkDossier}
        dossier={dossier}
        fileDelete={fileDelete}
        setFileDelete={setFileDelete}
        setFooter={setFooter}
        IsAdditional={IsAdditional}
        listIdentifyName={open?.listIdentifyName}
      />
    </TabCVStyle>
  )
}

export default MyCV
