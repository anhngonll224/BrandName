import React, { useEffect } from "react"
import { OverViewStyle } from "./styled"
import { Col, Row } from "antd"
import { DatePicker } from "antd"
import { useState } from "react"
import DateHead from "./Component/DateHead"
import ContenHead from "./Component/ContenHead"
import ContenHead2 from "./Component/ContenHead2"
import ContenHead1 from "./Component/ContenHead1"

import DashBoard from "src/services/DashBoard"
import TableBottom from "src/pages/ADMIN/OverView/Component/TableBottom"

const { RangePicker } = DatePicker

const OverView = () => {
  const [overView, setOverView] = useState([])
  const [data, setData] = useState([])
  const [value, setValue] = useState()
  // ToDate: data ? data[1]?.format() : undefined,
  const Getlist = async value => {
    try {
      const fromDate = value?.format()
      const toDate = value?.format()

      const res = await DashBoard.getList({
        FromDate: fromDate,
        ToDate: toDate,
      })

      if (res?.isError) return

      setOverView(res?.Object?.Data)
      setData(res?.Object.Preview)
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
    }
  }

  useEffect(() => {
    Getlist(value)
  }, [value])
  // useEffect(() => {
  //   Getlist(test)
  // }, [])
  return (
    <OverViewStyle>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row>
            <Col className="texHead" span={2}>
              <span>Thời gian</span>
            </Col>
            <Col span={6}>
              <DateHead setTest={setValue} />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <ContenHead overView={overView} />
        </Col>
        <Col span={8}>
          <ContenHead1 overView={overView} />
        </Col>
        <Col span={8}>
          <ContenHead2 overView={overView} />
        </Col>

        <Col span={24}>
          <TableBottom data={data} overView={overView} type={1} />
        </Col>
        <Col span={24}>
          <TableBottom data={data} overView={overView} type={2} />
        </Col>
        <Col span={24}>
          <TableBottom data={data} overView={overView} type={3} />
        </Col>
        <Col span={24}>
          <TableBottom data={data} overView={overView} type={4} />
        </Col>
        <Col span={24}>
          <TableBottom data={data} overView={overView} type={5} />
        </Col>
      </Row>
    </OverViewStyle>
  )
}
export default OverView
