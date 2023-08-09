import styled from "styled-components"

export const CardShoppingStyled = styled.div`
  background: #fff;
  padding-top: 20px;
  .box-header {
    padding: 15px 20px;
    background: #f7f7f7;
    border-radius: 4px;
    .ant-col {
      font-weight: 600;
    }
  }
  .ant-tabs-content-holder {
    padding: 0px !important;
  }

  .box-image {
    width: 60px;
    height: 60px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .box-item {
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 15px 20px;
    margin-top: 20px;
  }
`
