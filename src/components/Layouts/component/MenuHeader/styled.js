import styled from "styled-components"

export const MenuHeaderStyle = styled.div`
  .menu-header-wrap {
    display: flex;
    align-items: center;

    .menu-item {
      margin-right: 20px;
      cursor: pointer;
      display: flex;
      padding: 10px 4px;
      .menu-item_title {
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
        /* or 24px */

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.011em;
        margin-left: 6px;
        color: rgba(104, 104, 104, 0.68);
      }
      .menu-item_icon {
        svg path {
          fill: #999;
        }
      }
      &.active,
      &:hover {
        .menu-item_title {
          color: rgb(3, 78, 162);
        }
        svg path {
          fill: rgb(3, 78, 162);
        }
      }
    }
  }
`
