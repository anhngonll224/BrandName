import styled from "styled-components"

export const PostManagerStyled = styled.div`
  height: calc(100vh - 52px);
`
export const TreeCategoryStyled = styled.div``
export const SearchStyled = styled.div`
  padding-top: 10px;
  background: #fff;
  margin-bottom: 10px;
`

export const CreatePostStyled = styled.div`
  padding-bottom: 20px;
  .ant-upload.ant-upload-drag {
    border: 1px dashed #154398;
    background: #edf6fc;
  }
  .create-post-box {
    background: #ffffff;
    padding: 30px 20px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    border-top: 0px;
  }
  .rotage180 {
    transform: rotate(180deg);
  }
  .form-contact-submit {
    background: #154398;
    border-radius: 4px !important;
    padding: 16px 80px !important;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }
  /* textarea {
    resize: none;
  } */
  .sub-title {
    color: #838383;
    font-weight: 400;
  }
  .ant-form-item-label > label {
    font-weight: 600;
  }
  .ant-btn-default {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 30px;
    border-radius: 8px;
    height: auto;
  }
  .create-post-add-tag {
    .ant-input-affix-wrapper-disabled {
      background-color: #fff;
      cursor: unset;
    }
    .ant-input {
      border: 0px;
      padding: 4px;
      :focus {
        box-shadow: none;
      }
    }
    .ant-input-prefix {
      width: 100%;
    }
    .ant-row {
      width: 100%;
    }
    .ant-tag {
      color: #000000;
      background: #eff0f5;
      border-radius: 45px;
      border: 0;
      padding: 0 1px 0 7px;
      display: flex;
      align-items: center;
      margin-right: 0px;
    }
  }
`

export const ButtonUploadStyle = styled.div`
  .account-button-upload {
    border-radius: 4px;
    padding: 2px !important;
    height: unset !important;
    border: 1px dashed #e1e1e1;
    .account-text-upload {
      font-weight: 600;
      font-size: 12px;
      line-height: 120%;
      color: #154398;
    }
    .account-background-upload {
      background: #f7f7f7;
      border-radius: 4px;
      justify-content: center;
      align-items: center;

      padding: 4px 15px;
    }
    :hover {
      border: 1px solid #154398;
      background-color: #154398;

      .account-background-upload {
        background-color: transparent;
        border: 1px dashed transparent;
      }
      .account-text-upload {
        color: #fff;
      }
    }
  }
`
export const TreeAnchorStyled = styled.div`
  position: sticky;
  top: 58px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden auto;
  padding: 10px;
  height: calc(100vh - 167px);
  margin-top: 10px;
  .ant-tree-indent-unit {
    width: 15px;
  }
  .block-node {
    color: #ed1117 !important;
  }
  .div-all {
    position: relative;
    padding-top: 6px;
    :hover {
      .float-action__wrapper {
        display: flex;
      }
    }
    .float-action__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: none;
    }
  }
  .list-button-tree-hover {
    display: none;
  }
  .ant-tree-treenode {
    width: 100%;
    :hover {
      .list-button-tree-hover {
        display: flex;
      }
    }
  }
  .ant-tree-node-content-wrapper {
    flex: auto;
    width: 0px;
  }
  .ant-anchor-link {
    padding: 4px 0 4px 0px;
    width: 100%;
  }
  .ant-tree-switcher {
    align-self: unset;
  }
  .ant-tree-node-selected,
  .ant-tree-node-content-wrapper:hover {
    background-color: transparent !important;
  }
  .ant-tree-node-selected .ant-tree-title {
    color: #000;
    font-weight: 600;
  }
  .ant-anchor-link-active > .ant-anchor-link-title {
    color: #000;
    font-weight: 600;
    /* background-color: #ddd; */
  }
  .ant-tree-treenode {
    align-items: baseline;
    &:hover {
      .list-button {
        display: flex;
        position: absolute;
        background: #fff;
        right: -10px;
        height: auto;
        .btn-add {
          color: ${({ theme }) => theme.white};
        }
        .btn-edit {
          color: ${({ theme }) => theme.white};
        }
        .btn-delete {
          color: ${({ theme }) => theme.red500Color};
        }
      }
    }
  }

  .list-button {
    display: none;
  }
`
