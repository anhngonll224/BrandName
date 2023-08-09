import styled from "styled-components"

export const BackGround = styled.div`
  ${
    "" /* background-image: url("https://res.cloudinary.com/dd8fqgfwv/image/upload/v1683627873/background_johykg.png"); */
  }
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 100% !important;
  padding: 0px 10px;

  ${
    "" /* .ant-table-thead {
    .ant-table-cell {
      background: linear-gradient(to bottom, #91caff, #4096ff) !important;
      color: #000;
      font-size: 13px;
      min-height: 46px;
    }
  } */
  }
  .column-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: auto;
  }
`
export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-top: 12px;
`

export const MyCVStyle = styled.div`
  .ant-card .ant-card-body {
    border: 1px solid rgb(221, 221, 221) !important;
    padding: 24px;
    border-radius: 0 0 8px 8px;
  }
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-header-text {
    margin-inline-end: auto;
    color: rgb(11, 66, 138);
    font-weight: 600;
  }
  .ant-descriptions .ant-descriptions-item-label {
    color: rgb(11, 66, 138);
    font-weight: 600;
    align-items: center;
  }

  .custom-card .ant-card-body {
    padding: 0;
  }

  .custom-collapse .ant-collapse-content {
    padding: 0;
  }
  padding: 12px;
  border: 2px solid #f0f0f0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .text-dossier {
    font-size: 24px;
    font-weight: 600;
    color: #faa914;
    margin: 12px 24px;
  }
  .text-dossier1 {
    font-size: 24px;
    font-weight: 600;
    color: #faa914;
    /* margin: 12px 24px; */
  }
  .btn-search-infor {
    .ant-input-search-button {
      height: 39px;

      background-color: #154398;
    }
  }
  .list-identifier-name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    .identifier-item {
      background: #f0f0f0;
      padding: 3px 10px;
      border-radius: 6px;
    }
  }
  .upfile-sign {
    .ant-upload-list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ant-upload-list-item-container .ant-upload-list-item {
        border: none;
      }
    }
  }
  .ant-upload.ant-upload-drag {
    height: 172px;
  }
  .box-infor {
    /* box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.15); */
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px 16px;
    height: 100%;
    .copy-btn {
      position: absolute;
      top: 14px;
      right: 20px;
    }
  }
  .upfile-doc {
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 8px;
    .ant-upload.ant-upload-drag .ant-upload-btn {
      background: #fff;

      border-radius: 8px;
    }
    .upfile-text {
      font-size: 32px;
      font-weight: bold;
      color: #7174a0;
    }
    .div-sign div {
      text-align: center;
    }
  }
  .text-header {
    color: #0b428a;
    font-weight: 600;
  }
  .text-none {
    color: none;
  }
  .highline {
    color: #52c41a;
  }
`

export const TabCVStyle = styled.div`
  padding: ${props =>
    props?.isAdmin || props?.singlePage ? "0px" : "12px 32px"};

  .button-back {
    display: flex;
    font-weight: 600;
    font-size: 14px;
    color: #154398;
    cursor: pointer;
  }
  /* .ant-tabs-tab {
    background: #b6b6b6;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px 12px;
    color: #fff;
    :hover {
      color: #fff;
      font-weight: bold;
    }
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 12px;
    color: #fff;
  }
  .ant-tabs-tab-active {
    background: #154398;
    font-weight: bold;
    .ant-tabs-tab-btn {
      color: #fff !important;
    }
  }
  .ant-tabs-nav {
    margin: 0;
  } */
`
