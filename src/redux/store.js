import { configureStore } from "@reduxjs/toolkit"
import appGlobalReducer from "./appGlobal"
import commonReducer from "./common"
import roleReducer from "./role"
import courseReducer from "./course"
import bannerReducer from "./banner"
import cartReducer from "./cart"
import loginModalReducer from "./loginModal"
import ProfileListReducer from "./ProfileList"
import dossierReducer from "./dossier"
export default configureStore({
  reducer: {
    appGlobal: appGlobalReducer,
    role: roleReducer,
    common: commonReducer,
    course: courseReducer,
    banner: bannerReducer,
    cart: cartReducer,
    loginModal: loginModalReducer,
    ProfileList: ProfileListReducer,
    dossier: dossierReducer,
  },
})
