import React from "react"
import { Col, DatePicker, Row } from "antd"
import { useState } from "react"
import { DateHeadStyle } from "../styled"
const { RangePicker } = DatePicker

const DateHead = ({ setTest }) => {
  const [dates, setDates] = useState(null)
  const [value, setValue] = useState(null)
  const disabledDate = current => {
    if (!dates) {
      return false
    }
    // const tooLate = dates[0] && current.diff(dates[0], "days") >= 10000
    // const tooEarly = dates[1] && dates[1].diff(current, "days") >= 10000
    // return !!tooEarly || !!tooLate
  }
  const onOpenChange = open => {
    if (open) {
      setDates([null, null])
    } else {
      setDates(null)
    }
  }
  const handleDateChange = value => {
    setTest(value)
  }
  return (
    <DateHeadStyle>
      <Col>
        <RangePicker
          label={["Từ ngày", "Đến ngày"]}
          value={dates || value}
          disabledDate={disabledDate}
          onCalendarChange={val => {
            setDates(val)
          }}
          onChange={val => {
            setValue(val)
            handleDateChange(val)
          }}
          onOpenChange={onOpenChange}
          changeOnBlur
        />
      </Col>
    </DateHeadStyle>
  )
}

export default DateHead
