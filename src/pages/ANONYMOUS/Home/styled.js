import styled from "styled-components"
import { Col } from "antd"

export const LogoListCompany = styled.div`
.w-200{
  width: 200px;
  /* object-fit: cover; */
    /* height: 70px; */
  }
.img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.test{
  width: 100%;
  height: 100%;
  object-fit: cover;
  }
@media only screen and (min-width: 320px) {

      .logo-image-row-1 {
      .element-img-all {
        position: relative;
        height: 120px;
        .all-logo {
          top: -36px;
          height: 154px;
          position: absolute;
          margin: auto;
          -webkit-box-align: center;
          align-items: center;
          .imge-logo-home {
            width: 200px;
          }
        }
      }
    }
}
@media only screen and (min-width: 1920px) {

      .logo-image-row-1 {
      .element-img-all {
        position: relative;
        height: 120px;
        .all-logo {
          top: -36px;
          height: 154px;
          position: absolute;
          margin: auto;
          -webkit-box-align: center;
          align-items: center;
          .imge-logo-home {
            width: 200px;
          }
        }
      }
    }
}

  @media (max-width: 1920px) {
    .logo-image-row-1 {
      .element-img-all {
        position: relative;
        height: 120px;
        .all-logo {
          top: -36px;
          height: 154px;
          position: absolute;
          margin: auto;
          -webkit-box-align: center;
          align-items: center;
          .imge-logo-home {
            width: 200px;
          }
        }
      }
    }
  }
  @media (max-width: 1600px) {
    .logo-image-row-1 {
      .all-logo {
        /* left: 503px !important; */
        .imge-logo-home {
          /* height: 88px;
        width: 297px !important; */
          width: 200px;
        }
      }
    }
  }
  @media (max-width: 1440px) {
    .logo-image-row-1 {
      .all-logo {
        /* left: 425px !important; */
        .imge-logo-home {
          /* height: 88px;
        width: 297px !important; */
          width: 200px;
        }
      }
    }
  }
  @media (max-width: 1366px) {
    .logo-image-row-1 {
      .all-logo {
        /* left: 380px !important; */
        .imge-logo-home {
          /* height: 88px;
        width: 297px !important; */
          width: 200px;
        }
      }
    }
  }

  .text-logo-net-world {
    text-align: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 72px;
    /* identical to box height, or 150% */
    align-items: center;

    /* primary/01 */

    color: #0b428a;
  }
  .title-logo-company {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 72px;
    /* identical to box height, or 150% */

    /* display: flex; */
    align-items: center;
    text-align: center;
    /* primary/01 */

    color: #0b428a;
  }
`

export const SvgStyled = styled.div`
  svg {
    border: none;
    background-color: #41218a;
  }
`
export const SvgRStyled = styled.div`
  svg {
    border: none;
    background-color: rgb(35 147 194);
  }
`
export const SildeListStyled = styled.div`
  .image-logos {
    display: flex !important;
    align-items: center;
    height: 73px;
    .img-logo-companies {
      width: 84%;
    }
  }
  /* .slick-slide {
    display: flex !important;
    align-items: center;
    height: 73px;
} */
`
export const HomeStyled = styled.div`
  position: relative;
  .matrix {
    position: absolute;
    width: 1920px;
    height: 1394.05px;
    left: -509px;
    top: 127.31px;

    background: #d9d9d9;
    border-radius: 200px;
    transform: matrix(0.8, -0.24, 0.93, 0.93, 0, 0);
  }

  .notice {
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    color: #ed0101;
  }
  .notice-content {
    color: #1e4193;
    font-weight: 400;
    text-transform: unset;
    margin-left: 24px;
    font-size: 13px;
  }
  .date-time {
    color: #6a7688;
    font-size: 13px;
    text-align: right;
  }
  .news {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #1e4193;
  }
  .wrap-img {
    /*   position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        89.74deg,
        #2a418a 20%,
        #278f8b 50.25%,
        rgba(31, 120, 116, 0) 70%
      );
    } */
  }

  .home-background-cover {
    background-repeat: no-repeat !important;
    position: relative;
    background-size: cover !important;
    background-position: center !important;
  }

  .linear-background-cover {
    width: 1523px;
    background: linear-gradient(
      90.12deg,
      rgba(17, 52, 117, 0) 2.85%,
      #113475 91.44%
    );
    transform: matrix(-1, 0, 0, 1, 0, 0);
    opacity: 0.9;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    &__1 {
      background: linear-gradient(
        90.41deg,
        rgba(21, 66, 151, 0) 19.84%,
        rgba(22, 42, 91, 0.74) 53.39%,
        #57050a 96.69%
      );
      right: 0px;
    }
  }
  .title-cover {
    font-weight: 700;
    font-size: 36px;
    line-height: 150%;

    color: #fff501;
  }
  .content-cover {
    font-weight: 700;
    font-size: 48px;
    line-height: 150%;

    color: #ffffff;
    @media only screen and (min-width: 800px) {
      font-size: 64px;
    }
  }
  .center-cover {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    left: 0;
    top: 300px;
    &__1 {
      align-items: flex-end;
      width: 100%;
    }
  }

  .background-color-choose {
    width: 100%;
    h2 {
      font-size: 2.2rem;
      font-weight: 600;
      margin: 0.5em 0;
    }
    p {
      font-size: 15px;
    }
    h3 {
      font-weight: 600;
      font-size: 1.2rem;
    }
    span {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .li-choose {
    height: 40px;
    width: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    background: #fff;
    border-radius: 3px;
    color: #000;
    font-size: 1.2rem;
    font-weight: 600;
    flex: none;
    margin-right: 12px;
  }

  .sub-text {
    font-size: 1rem;
    color: #303030;
  }

  .collapse {
    padding: 10px;
    border: 2px solid #ebebeb;
    .question {
      text-align: left;
      font-size: 15px;
      line-height: 20px;
    }
    .collapse__content {
      font-size: 14px;
      color: #303030;
    }
  }
`
export const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  bottom: 0px;
  display: flex;
  align-items: center;
  @media only screen and (min-width: 800px) {
    left: 130px;
  }
  height: 100%;
  .search-box {
    .text-hv-deco {
      :hover {
        text-decoration: underline;
      }
    }
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 2px 8px rgba(0, 81, 139, 0.25);
    .search-box-top {
      transition: 0.4s ease-in-out all;
      width: 100%;
      flex: 4;
      background: rgba(255, 255, 255, 1);
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      .btn-back1 {
        background: linear-gradient(
          to right,
          #00b2a3,
          #00b2a3,
          #00b2a3
        ) !important;
      }
      .ant-select-selector {
        border-radius: 4px !important;
      }
    }
    .search-box-bottom {
      background: rgba(215, 240, 252, 0.9);
      transition: 0.4s ease-in-out all;
      width: 100%;
      flex: 1;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      .search-box-note {
        color: #5d677a;
      }
    }
    .ant-btn {
      width: 100%;
      border: none;
      margin: 10px 0px;
      height: 52px !important;
      border-radius: 4px !important;
    }
    .search-summary {
      overflow: hidden;
      transition: all 0.5s linear;
      &.h0 {
        height: 0px !important;
      }
      &.h-auto {
        height: 82px !important;
      }
    }
  }
`
export const ContentWrapper2 = styled.div`
  /* position: absolute;
  top: 0;
  left: 20px;
  bottom: 0px; */
  width: 100%;
  padding: 0px 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  @media only screen and (min-width: 800px) {
    left: 130px;
  }
  height: 100%;
  .search-box {
    .text-hv-deco {
      :hover {
        text-decoration: underline;
      }
    }
    width: 100%;
    border-radius: 20px;
    border: 1px solid #d2d2d2;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .search-box-top {
      transition: 0.4s ease-in-out all;
      width: 100%;
      flex: 4;

      border-radius: 20px;
      background: rgba(255, 255, 255, 1);

      .btn-back1 {
        background: linear-gradient(
          to right,
          #00b2a3,
          #00b2a3,
          #00b2a3
        ) !important;
      }
      .ant-select-selector {
        border-radius: 4px !important;
      }
    }
    .search-box-bottom {
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background: rgba(215, 240, 252, 0.9);
      transition: 0.4s ease-in-out all;
      width: 100%;
      flex: 1;
      .search-box-note {
        color: #5d677a;
      }
    }
    .ant-btn {
      width: 100%;
      border: none;
      margin: 10px 0px;
      height: 52px !important;
      border-radius: 4px !important;
    }
    .search-summary {
      overflow: hidden;
      transition: all 0.5s linear;
      &.h0 {
        height: 0px !important;
      }
      &.h-auto {
        height: 82px !important;
      }
    }
  }
`
export const SildeStyled = styled.div`
  min-height: 440px;
  height: 100% !important;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  .slick-slide {
    min-height: 440px;
    height: 100% !important;
  }
  .slick-slide > div {
    min-height: 440px;
    height: 100% !important;
    .relative {
      min-height: 440px;
      height: 100% !important;
      img {
        min-height: 440px;
        height: 100% !important;
        object-fit: cover;
      }
    }
  }
  .relative {
    position: relative;
  }
  position: relative;
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }
  .slick-prev {
    left: 50px;
    z-index: 10;
    width: unset !important;
  }
  .slick-next {
    right: 50px;
    z-index: 10;
    width: unset !important;
  }
  .layout-slider {
    display: flex;
    flex-direction: column;
    max-width: 1500px;
    margin: 0px auto;
  }

  .option-box {
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    @media only screen and (min-width: 1200px) {
      font-size: 22px;
    }
  }
  position: relative;
  .linear-background {
    width: 1523px;
    background: linear-gradient(
      89.98deg,
      #2a418a 18.81%,
      #1f7874 57.87%,
      rgba(31, 120, 116, 0) 95.33%
    );
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    color: #ffffff;
    transform: scale(1);
    opacity: 1;
    transition: transform 1s ease, opacity 1s ease;
    animation: Title-animate 1s linear;
    margin-left: 0;
    text-shadow: 0 1px #999;

    @media only screen and (min-width: 1200px) {
      font-size: 40px;
    }
  }
  .column {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
  .box-animate {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0px !important;
    margin-top: 10px;
    @media only screen and (min-width: 1200px) {
      flex-direction: row;
      align-items: center;
    }

    @media only screen and (min-width: 1200px) {
      margin-left: 0px !important;
      margin-top: 40px;
    }
  }
  @keyframes Title-animate {
    0%,
    30% {
      margin-left: 150px;
      opacity: 0;
    }
    100% {
      margin-left: 0;
      opacity: 1;
    }
  }

  .layout {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .contact {
    background: linear-gradient(90deg, #ed0101 23.95%, #ff5839 97.11%);
    border: 4px solid #ffe7e6;
    border-radius: 88px;
    padding: 8px 24px 8px 50px !important;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    position: relative;
    width: fit-content;
  }
  .phone-wrapper {
    position: absolute;
    left: -15px;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -10px;
  }
  .phone-circle {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background: linear-gradient(90deg, #ed0101 0%, #ff5839 105.36%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notice-wrapper {
    background: #ffffff;
    box-shadow: 0px 0px 72px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 0px !important;

    .header {
      background: #ed0101;
      border-radius: 8px 8px 0px 0px;
      height: 56px;
      position: relative;
      .icon-notice {
        position: absolute;
        bottom: -10px;
        right: 5px;
      }
    }
    .content {
      font-weight: 700;
      font-size: 24px;
      line-height: 150%;

      text-align: center;
      text-transform: uppercase;
      padding: 30px;
      color: #ed0101;
    }
  }

  .info-common {
    .ant-row {
      flex-wrap: nowrap;
    }
    svg path {
      fill: #154398;
    }
    .normal {
      color: #154398;
    }
  }
  .message-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #154398;
  }
`
export const ContentStyleAnimation = styled(Col)`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0px !important;
  margin-top: 10px;
  text-shadow: 0 1px #999;
  animation: BoxAnimate ${props => 1 + props.order * 0.3}s linear;
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
  }

  @media only screen and (min-width: 1200px) {
    margin-left: 0px !important;
    /* margin-top: 40px; */
  }
  .option-box {
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    @media only screen and (min-width: 1200px) {
      font-size: 22px;
    }
  }
  @keyframes BoxAnimate {
    0%,
    60% {
      margin-left: 100px;
      opacity: 0;
    }

    100% {
      margin-left: 0px;
      opacity: 1;
    }
  }
`
export const TabsNewsStyled = styled.div`
  .hover-red {
    :hover {
      color: #f0383e;
    }
  }
  .ant-tabs-content-holder {
    padding: 0px 0px;
  }
  .bread-crumb-tab-news {
    margin-top: 0px;
    margin-bottom: 15px;
    .ant-breadcrumb-link,
    .ant-breadcrumb-separator {
      color: #212529;
      font-weight: 400;
      opacity: 1;
      font-size: 14px;
    }
  }
  .see-more-2 {
    position: absolute;
    top: -50px;
    right: 0px;
    cursor: pointer;
  }

  .see-more-3 {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .see-more {
    position: absolute;
    top: 20px;
    right: 0px;
    cursor: pointer;
  }
  .ant-tabs-tab-active {
    background: #f8f8f8;
  }
  .ant-tabs-tab {
    padding: 15px 25px;
    margin: 0px;
  }
  .ant-tabs-tab-btn {
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
    text-align: center;
    text-shadow: unset !important;
    color: #154398;
    @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (min-width: 550px) {
      font-size: 18px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ee1d23;
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: linear-gradient(90deg, #154297 0%, #ed1e24 100%);
  }
`
export const WrapMenuCourse = styled.div`
  position: relative;
  z-index: 99;
  .menu-container {
    padding: 10px 0;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
    /* min-height: calc(100vh - 280px); */
    background-color: #fff;
    /* overflow-y: auto; */
  }
  .submenu-container {
    position: absolute;
    left: calc(100% + 1px);
    top: 50px;
    background-color: #fff;
    z-index: 10;
    width: 300px;
    /* height: auto; */
    padding: 10px 0;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s ease-in-out;
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 100%;
      background-color: transparent;
      top: 0;
      left: -8px;
    }
    &:hover {
      top: 0;
      opacity: 1;
      pointer-events: unset;
    }
  }
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 6px 12px;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    &_img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    &_name {
      /* font-weight: 600; */
    }
  }
  .item-parent {
    position: relative;
    &:hover {
      background-color: #f5f5f5;
      & > .submenu-container {
        top: -10px;
        opacity: 1;
        pointer-events: unset;
      }
    }
  }
`
export const HeroSectionstyle = styled.div`
  .textMidle {
    font-weight: 700;
  }
  position: relative;
  .title-cotent-1 {
    margin: 75px;
    .text-content-TTUC {
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 27px;
      line-height: 48px;
      /* or 150% */

      display: flex;
      align-items: center;

      /* primary/01 */

      color: #0b428a;
    }
    .text-content-GT {
      margin-top: 30px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 30px;
      /* or 150% */

      display: flex;
      align-items: center;
      text-align: justify;

      color: #000000;
    }
    .button-show-everywhere {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 8px 24px;
      gap: 12px;
      position: absolute;
      height: 39px;
      background: #3269b1;
      border-radius: 12px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      /* line-height: 30px; */
      text-align: center;
      color: #ffffff;
      margin-top: 44px;
    }
  }
  .Hero {
    padding-top: 34px;
    padding-left: 80px;
    padding-bottom: 38px;
    padding-right: 34px;
    /* max-width: 1920px; */
    font-size: 15px;
    font-weight: 300;
    background: linear-gradient(
      88deg,
      rgb(69, 16, 130) 40%,
      rgb(30, 164, 202) 100%
    );
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    margin: auto;
    height: 100%;
    .imge-banner-home {
      max-width: 364px;
    }
    .text-header {
      /* Heading/Bold - 32 */

      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 19px;
      line-height: 48px;
      /* identical to box height, or 150% */
      display: flex;
      align-items: center;
      /* primary/04 */
      color: #fff9f7;
    }
    .text-header-son {
      margin-bottom: 8px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height, or 150% */

      display: flex;
      align-items: center;

      /* primary/04 */

      color: #fff9f7;
    }
  }
  @media only screen and (min-width: 350px) {
.Hero .imge-banner-home{
       max-width: 220px;
      }
.Hero {
    padding: 34px 34px 34px 34px;
    display: inline-block;
}
.imgHeader{
max-width: 100%;
        display: flex;
    justify-content: center;
}
.ant-col-13 {
    max-width: 100%;
  }
 .Hero .text-header {
    font-size: 14px;
    line-height: 1.5rem;
}
 .Hero .text-header-son {
  
    text-align: justify;
    flex: 0 0 100%;
    max-width: 100%;
}
  .title-cotent-1 {
    display: block;
}
 .title-cotent-1 {
    margin: 34px;
}
.title-cotent-1 .text-content-TTUC {
    font-size: 14px;
    line-height: 2rem;
    text-align: justify;

}
 .title-cotent-1 .text-content-GT {
    margin-top: 0px;
    font-size: 14px;
    line-height: 25px;
}

.title-logo-company {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    color: rgb(11, 66, 138);
    font-size: 13px !important;
    line-height: 40px;
}
.text-logo-net-world {
    font-size: 13px;
    line-height: 40px;
}


}
  @media only screen and (min-width: 550px) {
.Hero .imge-banner-home{
       max-width: 220px;
      }
.Hero {
    padding: 34px 34px 34px 34px;
    display: inline-block;
}
.imgHeader{
max-width: 100%;
        display: flex;
    justify-content: center;
}
.ant-col-13 {
    max-width: 100%;
  }
 .Hero .text-header {
    font-size: 14px;
    line-height: 1.5rem;
}
 .Hero .text-header-son {
  
    text-align: justify;
    flex: 0 0 100%;
    max-width: 100%;
}
  .title-cotent-1 {
    display: block;
}
 .title-cotent-1 {
    margin: 34px;
}
.title-cotent-1 .text-content-TTUC {
    font-size: 14px;
    line-height: 2rem;
    text-align: justify;

}
 .title-cotent-1 .text-content-GT {
    margin-top: 0px;
    font-size: 14px;
    line-height: 25px;
}

.title-logo-company {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    color: rgb(11, 66, 138);
    font-size: 13px !important;
    line-height: 40px;
}
.text-logo-net-world {
    font-size: 13px;
    line-height: 40px;
}




    
    }
  @media only screen and (min-width: 600px) {
.Hero .imge-banner-home{
       max-width: 220px;
      }
.Hero {
    padding: 34px 34px 34px 34px;
    display: inline-block;
}
.imgHeader{
max-width: 100%;
        display: flex;
    justify-content: center;
}
.ant-col-13 {
    max-width: 100%;
  }
 .Hero .text-header {
    font-size: 14px;
    line-height: 1.5rem;
}
 .Hero .text-header-son {
  
    text-align: justify;
    flex: 0 0 100%;
    max-width: 100%;
}
  .title-cotent-1 {
    display: block;
}
 .title-cotent-1 {
    margin: 34px;
}
.title-cotent-1 .text-content-TTUC {
    font-size: 14px;
    line-height: 2rem;
    text-align: justify;

}
 .title-cotent-1 .text-content-GT {
    margin-top: 0px;
    font-size: 14px;
    line-height: 25px;
}

.title-logo-company {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    color: rgb(11, 66, 138);
    font-size: 13px !important;
    line-height: 40px;
}
.text-logo-net-world {
    font-size: 13px;
    line-height: 40px;
}



}
@media only screen and (min-width: 1200px) {
  .Hero .imge-banner-home {
    max-width: 364px;
  }
        .Hero {
              display: flex;
        }
        .imgHeader{
display: block;
    flex: 0 0 45.83333333333333%;
    max-width: 45.83333333333333%;
    justify-content: center;
}
.ant-col-13 {
    display: block;
    flex: 0 0 54.166666666666664%;
    max-width: 54.166666666666664%;
}
 .Hero .text-header {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 48px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 249, 247);
}
 .Hero .text-header-son {
 
    text-align: justify;
    flex: 0 0 75%;
    max-width: 70%;
}
.title-cotent-1 {
    display: flex;
}
 .title-cotent-1 {
    margin: 70px;
}
 .title-cotent-1 .text-content-TTUC {
    font-weight: 700;
    font-size: 27px;
    line-height: 48px;
    text-align: justify;

}
 .title-cotent-1 .text-content-GT {
    margin-top: 30px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-align: justify;
    color: rgb(0, 0, 0);
}
.title-logo-company {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 72px;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    color: rgb(11, 66, 138);
}
 .text-logo-net-world {
   
    font-size: 32px;
    line-height: 72px;
  
}
}

`
export const LogoListCompanyStyle = styled.div`
  @media only screen and (min-width: 350px) {
 .w-200 {
    width: 80px;
}
    .imgBottom{
    width: -webkit-fill-available;
    }
    .title-logo-company {

    font-size: 14px !important;
    line-height: 40px;
}
.text-logo-net-world {
    font-size: 13px;
    line-height: 40px;
}
  }
  @media only screen and (min-width: 550px) {
    .w-200 {
    width: 80px;
}
       .imgBottom{
    width: -webkit-fill-available;
    }
    .title-logo-company {

    font-size: 14px !important;
    line-height: 40px;
}
.text-logo-net-world {
    font-size: 13px;
    line-height: 40px;
}
  }
  @media only screen and (min-width: 650px) {
    .w-200 {
    width: 80px;
}
       .imgBottom{
    width: -webkit-fill-available;
    }
    .title-logo-company {

    font-size: 14px !important;
    line-height: 40px;
}
.text-logo-net-world {
    font-size: 13px;
    line-height: 40px;
}
  }
  @media only screen and (min-width: 1200px) {
        .w-200 {
    width: 200px;
}
        .imgBottom{
    width: auto;
    }
    .title-logo-company {
  
    /* font-size: 32px; */
        padding-top: 35px;
    /* line-height: 72px; */

}
 .text-logo-net-world {
   
    font-size: 32px;
    line-height: 72px;
  
}
  }
`
