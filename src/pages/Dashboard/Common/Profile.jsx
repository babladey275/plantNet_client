import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/images/cover.jpg";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, isLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      }
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={userData.image}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">{userData.name}</span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{userData.email}</span>
              </p>

              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-lime-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1"
                >
                  Update Profile
                </button>
                <button className="bg-lime-500 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800">
                  Change Password
                </button>
              </div>
              <div>
                <UpdateProfileModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  userData={userData}
                  refetch={refetch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
