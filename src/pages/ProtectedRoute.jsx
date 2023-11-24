import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../Firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  // kullnıcının  yetkisi var mı state'i
  const [isAuth, setisAuth] = useState();
  useEffect(() => {
    // aktif oturumdaki değişikliği izler
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisAuth(true);
      } else {
        setisAuth(false);
      }
    });
  }, []);
  // kullanıcın yetkisi yoksa logine yönlendir (usenavigate kullanamıyoruz react router dom'dan gelen Navigate özelliğini kullanmalıyız)
  if (isAuth === false) return <Navigate to={"/"} replace />;
  //   kullanıcınn yetkisi varsa alt route'ı göster (burada feed sayfası anasayfa)
  return <Outlet />;
};

export default ProtectedRoute;
