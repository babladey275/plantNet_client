/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import { shortImageName } from "../../utilities";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const UpdateProfileForm = ({ userData, refetch, setIsOpen }) => {
  const axiosSecure = useAxiosSecure();
  const { image, name, email, _id } = userData || {};
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Image", url: image || "" },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadImage((prev) => ({ ...prev, url: image }));
  }, [image]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const selectedImage = form.image.files[0];
    const imageUrl = selectedImage ? await imageUpload(selectedImage) : image;

    const updateUser = {
      name,
      email,
      image: imageUrl,
    };

    try {
      await axiosSecure.patch(`/users/${_id}`, updateUser);
      refetch();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data ||
          "There was an error updating the profile. Please try again."
      );
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                defaultValue={name}
                name="name"
                id="name"
                type="text"
                placeholder="Your Name"
                required
              />
            </div>
            {/* Email */}
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                defaultValue={email}
                name="email"
                id="email"
                type="email"
                placeholder="Your Email"
                required
              />
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) =>
                        setUploadImage({
                          image: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      {shortImageName(uploadImage?.image)}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {uploadImage?.url && (
              <div className="flex justify-center items-center mt-6 p-4 bg-gray-100 rounded-lg shadow">
                <img
                  className="w-20 h-20 object-cover border-2 border-lime-500 rounded-md"
                  src={uploadImage?.url}
                  alt="Image Preview"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
