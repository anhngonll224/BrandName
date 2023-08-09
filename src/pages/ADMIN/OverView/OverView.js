import React from "react"
import { OverViewStyle } from "./styled"
import { Col, Row } from "antd"
import { DatePicker } from "antd"
import { useState } from "react"
import DateHead from "./Component/DateHead"
import ContenHead from "./Component/ContenHead"
import ContenHead2 from "./Component/ContenHead2"
import ContenHead1 from "./Component/ContenHead1"
import TableBottom from "./Component/TableBottom"
import DashBoard from "src/services/DashBoard"
import { useEffect } from "react"
import SpinCustom from "src/components/Spin"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"

const { RangePicker } = DatePicker

const OverView = () => {
  const [loading, setLoading] = useState(false)
  const [overView, setOverView] = useState([])
  const [data, setData] = useState([])
  const [value, setValue] = useState()
  const [date, setDate] = useState([])
  const [count, setCount] = useState()
  // ToDate: data ? data[1]?.format() : undefined,
  const Getlist = async () => {
    setLoading(true)
    try {

      const res = await DashBoard.getList({
        FromDate: date.DateFrom,
        ToDate: date.DateFrom,
      })

      if (res?.isError) return

      setOverView(res?.Object?.Data)
      setData(res?.Object.Preview)
      setCount(res?.Object?.Count)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Getlist(date)
  }, [date])
  // useEffect(() => {
  //   Getlist(test)
  // }, [])
  return (
    <OverViewStyle>
      <SpinCustom spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row>
              <Col className="texHead" span={2}>
                <span>Thời gian</span>
              </Col>
              <Col span={6}>
                {/* <DateHead setTest={setValue} /> */}
                <FlDatePicker
                  allowClear
                  ranger
                  label={["Từ ngày", "Đến ngày"]}
                  onChange={date =>
                    setDate({
                      DateFrom: date ? date[0].format() : null,
                      DateTo: date ? date[1].format() : null,
                    })
                  }
                />
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
            <TableBottom
              data={data}
              overView={overView}
              type={1}
              count={count}
              valueCount={1}
            />
          </Col>
          <Col span={24}>
            <TableBottom
              data={data}
              overView={overView}
              type={2}
              count={count}
              valueCount={4}
            />
          </Col>
          <Col span={24}>
            <TableBottom
              data={data}
              overView={overView}
              type={3}
              count={count}
              valueCount={2}
            />
          </Col>
          <Col span={24}>
            <TableBottom
              data={data}
              overView={overView}
              type={4}
              count={count}
              valueCount={3}
            />
          </Col>
          <Col span={24}>
            <TableBottom
              data={data}
              overView={overView}
              type={5}
              count={count}
              valueCount={5}
            />
          </Col>
        </Row>
      </SpinCustom>
    </OverViewStyle>
  )
}
export default OverView
