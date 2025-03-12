/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import { shortImageName } from "../../utilities";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const UpdatePlantForm = ({ plant, refetch, setIsEditModalOpen }) => {
  const axiosSecure = useAxiosSecure();
  const { image, name, category, description, price, quantity, _id } =
    plant || {};
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
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const selectedImage = form.image.files[0];
    const imageUrl = selectedImage ? await imageUpload(selectedImage) : image;

    const updatePlant = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
    };

    try {
      await axiosSecure.patch(`/plants/${_id}`, updatePlant);
      refetch();
      toast.success("Plant updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("There was an error updating the plant. Please try again.");
    } finally {
      setLoading(false);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-10">
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
                placeholder="Plant Name"
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                required
                defaultValue={category}
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                defaultValue={description}
                id="description"
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  defaultValue={price}
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  defaultValue={quantity}
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  required
                />
              </div>
            </div>
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
                "Update Plant"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlantForm;
