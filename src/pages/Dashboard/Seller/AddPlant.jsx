import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [uploadImage, setUploadImage] = useState({
    name: "Upload Image",
    size: null,
    url: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const truncateFileName = (fileName) => {
        const maxLength = 12;
        const extension = fileName.split(".").pop();
        const nameWithoutExtension = fileName.substring(
          0,
          fileName.lastIndexOf(".")
        );
        if (nameWithoutExtension.length > maxLength) {
          // Truncate and add '...' at the beginning
          return `...${nameWithoutExtension.slice(-maxLength)}.${extension}`;
        }
        return fileName;
      };

      const truncatedFileName = truncateFileName(file.name);
      const sizeInKB = Math.ceil(file.size / 1024);

      const formattedSize =
        sizeInKB >= 1024
          ? `${(sizeInKB / 1024).toFixed(2)} MB`
          : `${sizeInKB} KB`;

      const imagePreviewURL = URL.createObjectURL(file);

      setUploadImage({
        name: truncatedFileName,
        size: formattedSize,
        url: imagePreviewURL,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageURL = await imageUpload(image);

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // create plants data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageURL,
      seller,
    };
    // console.table(plantData);

    try {
      await axiosSecure.post("/plants", plantData);
      toast.success(`${name} is Added Successfully!`);

      form.reset();

      // Reset state
      setUploadImage({ name: "Upload Image", size: null, url: null });
      navigate("/dashboard/my-inventory");
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        handleFileChange={handleFileChange}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
