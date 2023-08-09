import styled from "styled-components"

export const StylesTableManagement = styled.div`
  .ant-table-tbody > tr.ant-table-row-selected > td,
  tr.ant-table-row-selected:hover > td {
    background: unset !important;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-cell-row-hover,
  .ant-table-row-hover {
    background: unset !important;
  }
`
