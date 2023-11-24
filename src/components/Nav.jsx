import { signOut } from "firebase/auth";
import { navSections } from "../constants/index";
import { auth } from "../Firebase/config";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-start  p-2">
      <div>
        <img
          className="w-14 mb-4"
          src="/x logo.png
          "
        />

        {navSections.map((i) => (
          <div
            key={i.title}
            className="flex justify-center md:justify-normal rounded-full items-center gap-2 text-2xl md:text-xl p-4 cursor-pointer transition hover:bg-[#aba8a861]"
          >
            {i.icon}
            <span className="hidden md:block">{i.title}</span>
          </div>
        ))}
      </div>
      {/* kullanıcı bilgileri */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 ">
          <img className="w-12 rounded-full" src={user?.photoURL} alt="" />
          <p className="hidden md:block">{user?.displayName}</p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="bg-gray-700 p-2 rounded-lg"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Nav;
