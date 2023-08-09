import styled from "styled-components"

export const StyleDashboard = styled.div`
  .maine {
  }
  .btn-background {
    :hover {
      background: #154398;
      color: #fff;
    }
  }
  .my-user-style .top-header-personnel {
    top: 66px !important;
  }
  .header-dashboard {
    height: 250px;
    color: white;
    position: relative;
    .menu-dash {
      position: absolute;
      bottom: 0;
      max-width: 1300px;
      margin: auto;
      .ant-menu-light {
        background: transparent;
      }
      .ant-menu-item,
      .ant-menu-overflow-item {
        color: white;
        font-weight: bold;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        ::after {
          content: none;
        }
        :hover {
          background: #fff;
          color: #333;
          div span {
            color: #333;
          }
        }
        margin-right: 10px;
      }
      .ant-menu-item-selected,
      .ant-menu-submenu-selected {
        background: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        color: black;
        div span {
          color: black;
        }
        ::after {
          content: none;
        }
      }
    }
    .btn-hide {
      opacity: 0;
    }
    :hover {
      .btn-hide {
        opacity: 1;
      }
    }
  }
`
