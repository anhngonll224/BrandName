import styled from "styled-components"

export const TabsActiveContainer = styled.div`
  .ant-tabs-nav-wrap {
    background-color: #fff !important;
    border-bottom: 1px solid #ddd;
  }
  .ant-tabs-tab::before {
    display: none;
  }

  .ant-comment-inner {
    padding: 0 0 8px 0;
  }
  .ant-comment-content-author-name {
    .name {
      color: #0050b3;
      font-weight: 600;
      font-size: 14px;
      .note {
        color: #444;
        font-size: 13px;
      }
    }
  }
  .wrap-comment {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 8px;

    &:last-child {
      border: 0;
    }
  }
  .browse-content,
  .history-content {
    margin-top: 12px;
    .note {
      margin-bottom: 4px;
      font-weight: 600;
    }
    th,
    td {
      margin-bottom: 4px;
      padding-right: 16px;
    }
    th {
      color: #172b4d;
    }
    td {
      color: #344563;
    }
    .file-name {
      color: #1890ff;
      font-size: 13px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      overflow: hidden;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .show-all {
    display: none;
    height: 60px;
    padding: 5px;
    margin-top: -60px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.5)
    );
  }

  .box-list-content:hover .show-all {
    display: block;
    cursor: pointer;
  }
`
export const SaveOptionsWrapper = styled.div`
  display: flex;
  padding: 5px 0;
  border: 2px #dfe1e5 solid;
  border-top: none;
  justify-content: right;
`
export const wrapperStyle = {
  marginTop: "30px",
}
export const toolbarStyle = {
  border: "2px solid #dfe1e5",
  borderBottom: "none",
  backgroundColor: "#fff",
  borderRadius: "3px 3px 0 0",
  margin: "0px",
}
export const editorStyle = {
  backgroundColor: "#fff",
  padding: "0 10px 10px 10px",
  border: "2px #dfe1e5 solid",
  borderBottom: "unset",
  outline: "none",
  overflow: "auto",
}
