import React from "react"
import { Col, DatePicker, Row } from "antd"
import { useState } from "react"
import { DateHeadStyle } from "../styled"
const { RangePicker } = DatePicker

const DateHead = () => {
  const [dates, setDates] = useState(null)
  const [value, setValue] = useState(null)
  const disabledDate = current => {
    if (!dates) {
      return false
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 7
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 7
    return !!tooEarly || !!tooLate
  }
  const onOpenChange = open => {
    if (open) {
      setDates([null, null])
    } else {
      setDates(null)
    }
  }
  return (
    <DateHeadStyle>
      <Col>
        <RangePicker
          value={dates || value}
          disabledDate={disabledDate}
          onCalendarChange={val => {
            setDates(val)
          }}
          onChange={val => {
            setValue(val)
          }}
          onOpenChange={onOpenChange}
          changeOnBlur
        />
      </Col>
    </DateHeadStyle>
  )
}

export default DateHead
