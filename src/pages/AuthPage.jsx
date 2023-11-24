import {
  getRedirectResult,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../Firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [mail, setMail] = useState("");
  // hesabı daha önce açıksa
  useEffect(() => {
    if (auth.currentUser) {
      navigate("feed");
    }
  }, []);
  // google ile giriş
  const handleGoogle = async () => {
    // signinwithpopıp bunda pop up açılıyor google girişi için
    // redirectte yeni sayfa
    try {
      const res = await signInWithPopup(auth, provider);

      toast.success("Google Hesabınız ile Giriş Yapıldı");
      navigate("/feed");
      //   navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };
  // foormun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    setMail(email);
    const pass = e.target[1].value;
    if (signUp) {
      // yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Hesap oluşturuldu");
        })
        .catch((err) => {
          toast.error(`üzgünüz bir hata oluştu: ${err.code}`);
          //   setSignUp(false);
        });
    } else {
      // mavcut hesaba giriş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("giriş başarılı");
        })
        .catch((err) => {
          // şifresi yanlışsa state'i true ya çek
          if (err.code === "auth/invalid-login-credentials") {
            setShowErr(true);
          }
          toast.error(`Üzgününz giriş yapılamadı${err.code}`);
        });
    }
  };

  const handleReset = () => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        toast.info(`${mail} adresinize sıfırlama e-posta'sı gönderildi`);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`Üzgünüz bir hata oluştu: ${errorCode}`);
      });
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex gap-10 flex-col rounded-lg py-16 px-32">
        <div className="flex flex-col items-center">
          <img className="h-[116px]" src="x logo.png" alt="twitter-logo" />
          <h1 className="text-center font-bold text-xl">Twitter'a giriş yap</h1>
        </div>
        <div
          onClick={handleGoogle}
          className="flex items-center bg-white text-black rounded-full px-10 cursor-pointer gap-3 py-2 hover:bg-gray-500 duration-300"
        >
          <img className="h-[36px]" src="/google-logo.png" alt="google-logo" />
          <span className="whitespace-nowrap">Google ile Giriş Yap</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>E-mail</label>
          <input
            className="text-black rounded outline-none mt-1 p-1 shadow-lg focus:shadow-[gray]"
            type="email"
            required
          />

          <label className="mt-4">Şifre</label>
          <input
            className="text-black rounded outline-none mt-1 p-1 shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />
          <button className="bg-white text-black mt-10 font-bold rounded-full py-2 transition hover:bg-gray-400 ">
            {!signUp ? "Giriş Yap" : "Kaydol"}
          </button>
          <p className="mt-5 flex gap-4">
            <span className="text-gray-500 ">
              {signUp ? "Hesabınız varsa" : "Hesabınız Yoksa"}{" "}
            </span>
            <span
              onClick={() => setSignUp(!signUp)}
              className="cursor-pointer text-blue-500"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </span>
          </p>
        </form>
        {showErr && (
          <p
            onClick={handleReset}
            className="text-red-500 cursor-pointer text-center active:bg-white active:text-black p-2 rounded-full"
          >
            Şifrenizi mi Unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
