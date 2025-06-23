import  { useState } from "react";
// import Button from "../../reuseable/button";
import PrimaryButton from "@/components/utils/PrimaryButton";


const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
    });
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfileImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="">
                <div className="flex justify-between items-center mb-6">
                    <img
                        src={profileImage}
                        alt="User"
                        className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="fileInput">
                        <button
                            type="button"
                            className="text-green-600 border border-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
                        >
                            Change
                        </button>
                    </label>
                </div>
                <p className="text-center text-green-600 text-sm mb-8">
                    Update some personal information. Your address will never be publicly
                    available.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-1"
                            htmlFor="fullName"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="First name"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-1"
                            htmlFor="phone"
                        >
                            (Optional) Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-1"
                            htmlFor="location"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <div className="text-center">
                        <PrimaryButton label="Save Changes" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
