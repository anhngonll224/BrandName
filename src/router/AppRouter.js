import React from "react"
import { useRoutes } from "react-router-dom"
import SpinCustom from "src/components/Spin"
import ROUTER from "./index"
// ANONYMOUS
const LoginGoogle = React.lazy(() => import("src/pages/LoginGoogle"))
const PublicRouters = React.lazy(() => import("src/pages/PublicRouters"))
const SvgViewer = React.lazy(() => import("src/pages/SvgViewer"))
const NotFound = React.lazy(() => import("src/pages/NotFound"))
const Home = React.lazy(() => import("src/pages/ANONYMOUS/Home"))
const Contact = React.lazy(() => import("src/pages/ANONYMOUS/Contact"))
const SearchPage = React.lazy(() =>
  import("src/pages/ANONYMOUS/SearchPage/SearchPage"),
)

// USER
const PrivateRoutes = React.lazy(() => import("src/pages/PrivateRoutes"))
const MyCV = React.lazy(() => import("src/pages/USER/MyCV"))
const CardShopping = React.lazy(() => import("src/pages/USER/CardShopping"))
const Support = React.lazy(() => import("src/pages/USER/Support"))
const Payment = React.lazy(() => import("src/pages/USER/payment"))
const Dashboard = React.lazy(() => import("src/pages/USER/Dashboard"))
const UserOverView = React.lazy(() => import("src/pages/USER/UserOverView"))
const UserManual = React.lazy(() => import("src/pages/USER/UserManual"))
const ActivityLog = React.lazy(() =>
  import("src/pages/USER/HistoryActive/index.js"),
)
// ADMIN
const AminRoutes = React.lazy(() => import("src/pages/ADMIN/AminRoutes"))
// const SubmissionNext = React.lazy(() =>
//   import("src/pages/ADMIN/Submission/components/SubmissionNext"),
// )
const Role = React.lazy(() => import("src/pages/ADMIN/Role"))
const PostManager = React.lazy(() => import("src/pages/ADMIN/PostManager"))
const Tags = React.lazy(() => import("src/pages/ADMIN/Tags"))
const RecordsManagement = React.lazy(() =>
  import("src/pages/ADMIN/RecordsManagement/index"),
)
const Subbmission = React.lazy(() => import("src/pages/ADMIN/Submission/index"))
const RequestSupport = React.lazy(() =>
  import("src/pages/ADMIN/RequestSupport"),
)
const ListOfPositions = React.lazy(() =>
  import("src/pages/ADMIN/ListOfPositions/ListOfPositions"),
)
const Configuration = React.lazy(() => import("src/pages/ADMIN/Configuration"))
const HistoryActive = React.lazy(() => import("src/pages/ADMIN/HistoryActive"))
const EmployeeContact = React.lazy(() =>
  import("src/pages/ADMIN/EmployeeContact"),
)
const CustomerContact = React.lazy(() =>
  import("src/pages/ADMIN/CustomerContact"),
)
const FieldOfActivity = React.lazy(() =>
  import("src/pages/ADMIN/FieldOfActivity/FieldOfActivity"),
)
const OverView = React.lazy(() => import("src/pages/ADMIN/OverView/OverView"))
const ListBrandName = React.lazy(() => import("src/pages/ADMIN/ListBrandName"))

function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ height: "100vh" }}>
          <SpinCustom />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  {
    path: ROUTER.SVG_VIEWER,
    element: (
      <LazyLoadingComponent>
        <SvgViewer />
      </LazyLoadingComponent>
    ),
  },
  {
    path: ROUTER.LOGIN_GOOGLE,
    element: (
      <LazyLoadingComponent>
        <LoginGoogle />
      </LazyLoadingComponent>
    ),
  },

  // ADMIN
  {
    element: (
      <LazyLoadingComponent>
        <AminRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.DANH_SACH_BAI_VIET,
        element: (
          <LazyLoadingComponent>
            <PostManager />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANH_MUC_THE,
        element: (
          <LazyLoadingComponent>
            <Tags />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANH_SACH_CHUC_VU,
        element: (
          <LazyLoadingComponent>
            <ListOfPositions />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.LINH_VUC_HOAT_DONG,
        element: (
          <LazyLoadingComponent>
            <FieldOfActivity />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.CAU_HINH,
        element: (
          <LazyLoadingComponent>
            <Configuration />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.PHAN_QUYEN,
        element: (
          <LazyLoadingComponent>
            <Role />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.YEU_CAU_HO_TRO,
        element: (
          <LazyLoadingComponent>
            <RequestSupport />
          </LazyLoadingComponent>
        ),
      },
      {
        path: `${ROUTER.QUAN_LY_HO_SO}/cho-xu-ly`,
        element: (
          <LazyLoadingComponent>
            <RecordsManagement isAdmin type={1} />
          </LazyLoadingComponent>
        ),
      },
      {
        path: `${ROUTER.QUAN_LY_HO_SO}/theo-doi`,
        element: (
          <LazyLoadingComponent>
            <RecordsManagement isAdmin type={2} />
          </LazyLoadingComponent>
        ),
      },

      {
        path: `${ROUTER.QUAN_LY_HO_SO}/danh-sach-phieu-trinh-phe-duyet`,
        element: (
          <LazyLoadingComponent>
            <Subbmission />
          </LazyLoadingComponent>
        ),
      },
      // {
      //   path: `${ROUTER.PHIEU_TRINH_PHE_DUYET_NEXT}`,
      //   element: (
      //     <LazyLoadingComponent>
      //       <SubmissionNext />
      //     </LazyLoadingComponent>
      //   ),
      // },

      {
        path: `${ROUTER.QUAN_LY_HO_SO}/kho-du-lieu`,
        element: (
          <LazyLoadingComponent>
            <ListBrandName IsAdmin={true} />
          </LazyLoadingComponent>
        ),
      },
      // {
      //   path: ROUTER.PHIEU_TRINH_PHE_DUYET,
      //   element: (
      //     <LazyLoadingComponent>
      //       <Subbmission />
      //     </LazyLoadingComponent>
      //   ),
      // },
      {
        path: ROUTER.LS_HOAT_DONG,
        element: (
          <LazyLoadingComponent>
            <HistoryActive />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANH_BA_NHAN_VIEN,
        element: (
          <LazyLoadingComponent>
            <EmployeeContact />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.DANH_BA_KHACH_HANG,
        element: (
          <LazyLoadingComponent>
            <CustomerContact />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.TONG_QUAN,
        element: (
          <LazyLoadingComponent>
            <OverView />
          </LazyLoadingComponent>
        ),
      },
      // {
      //   path: ROUTER.DANH_SACH_TEN_DINH_DANH,
      //   element: (
      //     <LazyLoadingComponent>
      //       <ListBrandName IsAdmin={true} />
      //     </LazyLoadingComponent>
      //   ),
      // },
    ],
  },

  //  USER
  {
    element: (
      <LazyLoadingComponent>
        <PrivateRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.TAO_HO_SO,
        element: (
          <LazyLoadingComponent>
            {/* <MyCV /> */}

            <MyCV singlePage={true} />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_TAI_KHOAN_TAO_HO_SO,
        element: (
          <LazyLoadingComponent>
            <MyCV singlePage={true} />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.HO_SO_CA_NHAN,
        element: (
          <LazyLoadingComponent>
            <Dashboard />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.GIO_HANG,
        element: (
          <LazyLoadingComponent>
            <CardShopping />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_TAI_KHOAN_HO_TRO,
        element: (
          <LazyLoadingComponent>
            <Support />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.LS_HOAT_DONG_USER,
        element: (
          <LazyLoadingComponent>
            {/* <MyCV /> */}

            <ActivityLog />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_TAI_KHOAN_THANH_TOAN,
        element: (
          <LazyLoadingComponent>
            <Payment />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_CHO_XU_LY,
        element: (
          <LazyLoadingComponent>
            {/* <UserDocuments /> */}

            <RecordsManagement type={1} />
          </LazyLoadingComponent>
        ),
      },

      // {
      //   path: ROUTER.QUAN_LY_TAI_KHOAN_HO_SO_THEO_DOI,
      //   element: (
      //     <LazyLoadingComponent>
      //       {/* <UserDocuments /> */}

      //       <RecordsManagement type={2} />
      //     </LazyLoadingComponent>
      //   ),
      // },
      {
        path: ROUTER.QUAN_LY_TAI_KHOAN_TDD,
        element: (
          <LazyLoadingComponent>
            <ListBrandName />
          </LazyLoadingComponent>
        ),
      },
      // {
      //   path: ROUTER.QUAN_LY_TAI_KHOAN_TONG_QUAN,
      //   element: (
      //     <LazyLoadingComponent>
      //       <UserOverView />
      //     </LazyLoadingComponent>
      //   ),
      // },
      {
        path: ROUTER.USER_MANUAL,
        element: (
          <LazyLoadingComponent>
            <UserManual />
          </LazyLoadingComponent>
        ),
      },
    ],
  },

  //  ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <PublicRouters />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: ROUTER.HOME,
        element: (
          <LazyLoadingComponent>
            <Home />
          </LazyLoadingComponent>
        ),
      },
      // {
      //   path: ROUTER.QUAN_LY_HO_SO,
      //   element: (
      //     <LazyLoadingComponent>
      //       <RecordsManagement />
      //     </LazyLoadingComponent>
      //   ),
      // },
      {
        path: ROUTER.LIEN_HE,
        element: (
          <LazyLoadingComponent>
            <Contact />
          </LazyLoadingComponent>
        ),
      },
      {
        path: ROUTER.TIM_KIEM,
        element: (
          <LazyLoadingComponent>
            <SearchPage />
          </LazyLoadingComponent>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFound />
      </LazyLoadingComponent>
    ),
  },
]
const AppRouter = () => {
  const renderRouter = useRoutes(routes)
  return renderRouter
}
export default AppRouter
