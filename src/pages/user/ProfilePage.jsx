import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";
import DialogLogoutButton from "@/components/button/DialogLogoutButton";
import { failedToast } from "@/lib/toaster";
import { useAuthStore, useNotif } from "@/store/store";
import { getFullDate } from "@/utils/dayjs";
import { getAdminById } from "@/data/admin";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const logout = useAuthStore((state) => state.logout)
    const reset = useNotif((state) => state.resetNotif)

    const handleLogout = () => {
        logout();
        reset();
        navigate("/login");
    };

    useEffect(() => {
        const fetchUserById = async () => {
            const token = sessionStorage.getItem("token")
            if (!token) return
            try {
                const { id, role } = jwtDecode(token)
                let response = []
                if (role == "user") {
                    response = await getUserById(id);
                } else {
                    response = await getAdminById(id);
                }
                setUser(response);
            } catch (error) {
                failedToast(error.message);
            }
        };
        fetchUserById();
    }, []);

    const array = [
        { title: "Nama", data: user?.name },
        { title: "Email", data: user?.email },
        { title: "Nomor Telepon", data: user?.phoneNumber },
        { title: "Tanggal Lahir", data: getFullDate(user?.birthDate) },
        { title: "Domisili", data: user?.location },
        { title: "Jenis Kelamin", data: user?.gender }
    ]

    const rowProfile = () =>
        array.map((value, i) => (
            <div key={i} className="w-full flex flex-col gap-2">
                <h3 className="text-xl text-gray-600 ps-2">{value.title}</h3>
                <div className="neo-button neo-hover rounded-2xl ps-6">
                    <h3 className="text-2xl font-semibold">{value.data}</h3>
                </div>
            </div>
        )
        )
    return (
        <div className="w-full pt-36">
            <div className="max-w-3xl mx-auto flex flex-col gap-[2rem]">
                <section className="flex w-full justify-between items-end">
                    <h3 className="text-4xl font-bold text-black mb-1">
                        #Halaman Profil
                    </h3>
                    <img src="/klinigma.png" alt="Klinigma" width={120} />
                </section>
                <section className="grid grid-cols-2 gap-9 gap-y-8 w-full ">
                    {rowProfile()}
                </section>
                <section className="flex gap-10 w-full justify-end mt-8">
                    <DialogLogoutButton handleLogout={handleLogout} />
                </section>
            </div>
        </div >
    );
};

export default ProfilePage;
