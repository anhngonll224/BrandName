import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
import { Badge } from "antd"
import { HistoryOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
const MenuItemBreadcrumb = () => {
  return [
    {
      key: ROUTER.HOME,
      icon: <SvgIcon name="home" />,
    },
    {
      label: "Giỏ hàng",
      key: ROUTER?.GIO_HANG,
    },
  ]
}

export default MenuItemBreadcrumb

export const MenuItemAdmin = dossierTotal => {
  console.log("dossierTotal", dossierTotal)
  return [
    {
      label: "Tổng Quan",
      hideOnMenu: true,
      showOnAdmin: true,
      key: ROUTER.TONG_QUAN,
      icon: <SvgIcon name="icon-system" />,
      TabID: [1],
    },
    {
      label: "Quản lý hồ sơ",
      key: "subkey5",
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="vbm" />,
      TabID: [27, 28],
      children: [
        {
          key: `${ROUTER.QUAN_LY_HO_SO}/cho-xu-ly`,
          label: (
            <Badge className="socket" count={dossierTotal?.totalDossier || 0}>
              <div
                className="d-flex justify-content-space-between"
              // style={{ width: "158px" }}
              >
                <div title="Chờ xử lý">Chờ xử lý </div>
                <div style={{ color: "#ED1117", marginRight: 10 }}></div>
              </div>
            </Badge>
          ),
          TabID: [27],
        },
        {
          key: `${ROUTER.QUAN_LY_HO_SO}/theo-doi`,
          label: (
            <Badge
              className="socket"
              count={dossierTotal?.totalDossierTracking || 0}
            // color="#faad14"
            >
              <div
                className="d-flex justify-content-space-between"
              // style={{ width: "158px" }}
              >
                <div title="Theo dõi">Theo dõi </div>
                <div style={{ color: "#ED1117", marginRight: 10 }}></div>
              </div>
            </Badge>
          ),
          TabID: [27],
        },
        {
          key: `${ROUTER.QUAN_LY_HO_SO}/danh-sach-phieu-trinh-phe-duyet`,
          label: (
            <Badge
              className="socket"
              count={dossierTotal?.totalSubmission || 0}
            // color="#faad14"
            >
              <div
                className="d-flex justify-content-space-between"
              // style={{ width: "158px" }}
              >
                <div title="Phiếu trình phê duyệt">Phiếu trình phê duyệt </div>
                <div style={{ color: "#ED1117", marginRight: 10 }}></div>
              </div>
            </Badge>
          ),
          TabID: [29],
        },
        {
          key: `${ROUTER.QUAN_LY_HO_SO}/kho-du-lieu`,
          label: (
            <Badge
              className="socket"
              count={dossierTotal?.totalBrandName || 0}
            // color="#14d875"
            >
              <div
                className="d-flex justify-content-space-between"
              // style={{ width: "158px" }}
              >
                <div title="Kho dữ liệu">Kho dữ liệu </div>
                <div style={{ color: "#ED1117", marginRight: 10 }}></div>
              </div>
            </Badge>
          ),
          TabID: [28],
        },
      ],
    },
    // {
    //   label: "Tên định danh",
    //   key: "subkey4",
    //   hideOnMenu: true,
    //   showOnAdmin: true,
    //   icon: <SvgIcon name="rounded" />,
    //   TabID: [27],
    //   children: [
    //     {
    //       key: ROUTER.PHIEU_TRINH_PHE_DUYET,
    //       label: (
    //         <div className="d-flex justify-content-space-between">
    //           <div title="Yêu cầu hỗ trợ">Phiếu trình phê duyệt</div>
    //           <div style={{ color: "#ED1117", marginRight: 10 }}></div>
    //         </div>
    //       ),
    //       TabID: [27],
    //     },
    //     {
    //       key: ROUTER.DANH_SACH_TEN_DINH_DANH,
    //       label: (
    //         <div className="d-flex justify-content-space-between">
    //           <div title="Danh sách tên định danh">Danh sách tên định danh</div>
    //           <div style={{ color: "#ED1117", marginRight: 10 }}></div>
    //         </div>
    //       ),
    //       TabID: [27],
    //     },
    //   ],
    // },
    {
      label: (
        <div className="d-flex justify-content-space-between">
          <div title="Yêu cầu hỗ trợ">Yêu cầu hỗ trợ</div>
          <div style={{ color: "#ED1117", marginRight: 10 }}></div>
        </div>
      ),
      key: ROUTER.YEU_CAU_HO_TRO,
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="headphone" />,
      TabID: [23],
    },
    // {
    //   label: "Dịch vụ",
    //   key: "subkey3",
    //   hideOnMenu: true,
    //   showOnAdmin: true,
    //   icon: <SvgIcon name="headphone" />,
    //   TabID: [23],
    //   children: [
    //     {
    //       key: ROUTER.YEU_CAU_HO_TRO,
    //       label: (
    //         <div className="d-flex justify-content-space-between">
    //           <div title="Yêu cầu hỗ trợ">Yêu cầu hỗ trợ</div>
    //           <div style={{ color: "#ED1117", marginRight: 10 }}></div>
    //         </div>
    //       ),
    //       TabID: [23],
    //     },
    //   ],
    // },
    // {
    //   label: "Quản lý bài đăng",
    //   key: "subkey2",
    //   hideOnMenu: true,
    //   showOnAdmin: true,
    //   icon: <SvgIcon name="post-blog" />,
    //   TabID: [2],
    //   children: [
    //     {
    //       key: ROUTER.DANH_SACH_BAI_VIET,
    //       label: "Danh mục - Bài viết",
    //       TabID: [2],
    //     },
    //     {
    //       key: ROUTER.DANH_MUC_THE,
    //       label: "Danh sách thẻ",
    //       TabID: [2],
    //     },
    //   ],
    // },
    {
      label: "Quản trị hệ thống",
      key: "subkey1",
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="management-skdn" />,
      TabID: [18, 31, 19, 13, 14, 5],
      children: [
        {
          key: ROUTER.DANH_BA_NHAN_VIEN,
          label: "Danh bạ người dùng",
          TabID: [18],
        },
        {
          key: ROUTER.DANH_BA_KHACH_HANG,
          label: "Danh bạ khách hàng",
          TabID: [31],
        },
        {
          key: ROUTER.DANH_SACH_CHUC_VU,
          label: "Danh sách chức vụ",
          TabID: [19],
        },
        {
          key: ROUTER.PHAN_QUYEN,
          label: "Phân quyền",
          TabID: [13],
        },
        {
          key: ROUTER.LINH_VUC_HOAT_DONG,
          label: "Lĩnh vực hoạt động",
          TabID: [5],
        },
        {
          key: ROUTER.LS_HOAT_DONG,
          label: "Lịch sử hoạt động",
          TabID: [14],
        },
        {
          key: ROUTER.CAU_HINH,
          label: "Cấu hình",
          TabID: [5],
        },
      ],
    },
  ]
}

export const MenuItemUser = dossierTotal => {
  return [
    {
      key: ROUTER.HOME,
      label: "Trang chủ",
      icon: <SvgIcon name="home" />,
      TabID: [],
    },
    // {
    //   key: ROUTER.QUAN_LY_TAI_KHOAN_TONG_QUAN,
    //   label: "Tổng quan",
    //   icon: <SvgIcon name="icon-system" />,
    //   TabID: [1],
    // },
    {
      label: "Tên định danh",
      key: "subkey1",
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="rounded" />,
      TabID: [27, 28],
      children: [
        {
          key: ROUTER.QUAN_LY_TAI_KHOAN_TAO_HO_SO,
          label: "Tạo hồ sơ",
          TabID: [27],
        },
        {
          key: ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY,
          label: (
            <Badge className="socket" count={dossierTotal?.totalDossier || 0}>
              <div
                className="d-flex justify-content-space-between"
              // style={{ width: "158px" }}
              >
                <div title="Quản lý hồ sơ">Quản lý hồ sơ </div>
                <div style={{ color: "#ED1117", marginRight: 10 }}></div>
              </div>
            </Badge>
          ),
          TabID: [27],
        },
        {
          key: ROUTER.QUAN_LY_TAI_KHOAN_TDD,
          label: (
            <Badge
              className="socket"
              count={dossierTotal?.totalBrandName || 0}
            // color="#14d875"
            >
              <div
                className="d-flex justify-content-space-between"
              // style={{ width: "158px" }}
              >
                <div title="Quản lý tên định danh">Quản lý tên định danh </div>
                <div style={{ color: "#ED1117", marginRight: 10 }}></div>
              </div>
            </Badge>
          ),
          TabID: [28],
        },
      ],
    },
    // {
    //   label: "Hồ sơ và thanh toán",
    //   key: "subkey2",
    //   hideOnMenu: true,
    //   showOnAdmin: true,
    //   icon: <SvgIcon name="file-text" />,
    //   TabID: [1, 6],
    //   children: [
    //     {
    //       key: ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY,
    //       label: "Quản lý hồ sơ",
    //       icon: <SvgIcon name="icon-system" />,
    //       TabID: [1],
    //     },
    //     {
    //       key: ROUTER.QUAN_LY_TAI_KHOAN_THANH_TOAN,
    //       label: "Thanh toán",
    //       TabID: [1],
    //     },
    //   ],
    // },
    {
      key: ROUTER.QUAN_LY_TAI_KHOAN_HO_TRO,
      label: "Hỗ trợ",
      icon: <SvgIcon name="headphone" />,
      TabID: [],
    },
    {
      key: ROUTER.LS_HOAT_DONG_USER,
      label: "Lịch sử hoạt động",
      icon: (
        <HistoryOutlined
          style={{
            width: "24px",
            height: "20px",
          }}
        />
      ),
      TabID: [],
    },
  ]
}
