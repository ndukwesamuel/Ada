// import { useMutateData } from "@/hook/Request";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// export default function CreateUser() {
//   return <UserBulkUpload />;
// }

// const UserBulkUpload = () => {
//   const [users, setUsers] = useState([]);
//   //   const [clanId, setClanId] = useState("");
//   const [error, setError] = useState("");
//   const { selectedEstate } = useSelector(
//     (state) => state?.reducer?.estateSlice
//   );

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setError("");
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       try {
//         const csvData = event.target.result;
//         const lines = csvData.split("\n");

//         const parsedUsers = lines
//           .filter((line, index) => index === 0 || line.trim() !== "") // Skip empty lines
//           .map((line, index) => {
//             if (index === 0) return null; // Skip header row
//             const values = line.split(",");
//             return {
//               name: values[0]?.trim() || `User ${index}`,
//               email: values[1]?.trim() || `user${index}@example.com`,
//             };
//           })
//           .filter((user) => user !== null) // Remove header row
//           .slice(0, 20); // Limit to 20 users

//         setUsers(parsedUsers);
//       } catch (err) {
//         setError(`Error parsing CSV: ${err.message}`);
//       }
//     };

//     reader.onerror = () => {
//       setError("Error reading file");
//     };

//     reader.readAsText(file);
//   };

//   const handleEditUser = (index, field, value) => {
//     const updatedUsers = [...users];
//     updatedUsers[index][field] = value;
//     setUsers(updatedUsers);
//   };

//   const handleRemoveUser = (index) => {
//     const updatedUsers = [...users];
//     updatedUsers.splice(index, 1);
//     setUsers(updatedUsers);
//   };

//   const { mutate: createuser, isPending: ispendingcreateuser } = useMutateData(
//     "createuserforestate",
//     "POST"
//   );

//   const handleSubmit = () => {
//     // selectedEstate;

//     if (users.length < 1 || users.length > 20) {
//       setError("You must have between 1 and 20 users");
//       return;
//     }

//     const payload = {
//       clanId: selectedEstate?._id,
//       users,
//     };

//     // console.log("Submitting:", payload);
//     // Here you would typically make your API call
//     // fetch('/api/registerBulkUsers', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(payload)
//     // })
//     // alert(JSON.stringify(payload, null, 2));

//     createuser(
//       {
//         url: `/v1/clan/createuser`,
//         data: payload,
//       },
//       {
//         onSuccess: (data) => {
//           console.log({
//             jfjf: data,
//           });

//           //   alert("user created successfully!");
//           // setFormData({ name: "", type: "", description: "", address: "" });
//           // setShowModal(false);
//         },
//         onError: (err) => {
//           console.log("Error creating household:", err);
//           alert("An error occurred while creating the household.");
//         },
//       }
//     );
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//       <h1 className="text-2xl font-bold mb-6">Bulk User Upload</h1>

//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         {/* <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="clanId"
//           >
//             Clan ID
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="clanId"
//             type="text"
//             placeholder="Enter Clan ID"
//             value={clanId}
//             onChange={(e) => setClanId(e.target.value)}
//           />
//         </div> */}

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Upload CSV File (Name, Email)
//           </label>
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleFileUpload}
//             className="hidden"
//             id="csvUpload"
//           />
//           <label
//             htmlFor="csvUpload"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-block"
//           >
//             Click to upload
//           </label>
//           <p className="text-gray-600 text-xs italic mt-1">
//             CSV should have two columns: Name and Email (first row will be
//             treated as header)
//           </p>
//         </div>

//         {error && (
//           <div
//             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
//             role="alert"
//           >
//             <p>{error}</p>
//           </div>
//         )}

//         {users.length > 0 && (
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">
//               Users to Add ({users.length}/20)
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user, index) => (
//                     <tr key={index}>
//                       <td className="py-2 px-4 border-b border-gray-200">
//                         <input
//                           className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           type="text"
//                           value={user.name}
//                           onChange={(e) =>
//                             handleEditUser(index, "name", e.target.value)
//                           }
//                         />
//                       </td>
//                       <td className="py-2 px-4 border-b border-gray-200">
//                         <input
//                           className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           type="email"
//                           value={user.email}
//                           onChange={(e) =>
//                             handleEditUser(index, "email", e.target.value)
//                           }
//                         />
//                       </td>
//                       <td className="py-2 px-4 border-b border-gray-200">
//                         <button
//                           onClick={() => handleRemoveUser(index)}
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         <div className="flex items-center justify-between">
//           <button
//             onClick={handleSubmit}
//             disabled={users?.length < 1 || users?.length > 20}
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//               users.length < 1 || users.length > 20
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             Submit Users
//           </button>
//           <span className="text-gray-600 text-sm">
//             {users.length} users (1-20 required)
//           </span>

//           {ispendingcreateuser && (
//             <span className="text-gray-600 text-sm">LOading</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import { useMutateData } from "@/hook/Request";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function CreateUser() {
  return <UserBulkUpload />;
}

const UserBulkUpload = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null);
  const fileInputRef = useRef(null);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setSubmissionResult(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csvData = event.target.result;
        const lines = csvData.split("\n");

        const parsedUsers = lines
          .filter((line, index) => index === 0 || line.trim() !== "")
          .map((line, index) => {
            if (index === 0) return null;
            const values = line.split(",");
            return {
              name: values[0]?.trim() || `User ${index}`,
              email: values[1]?.trim() || `user${index}@example.com`,
            };
          })
          .filter((user) => user !== null)
          .slice(0, 20);

        setUsers(parsedUsers);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        setError(`Error parsing CSV: ${err.message}`);
      }
    };

    reader.onerror = () => {
      setError("Error reading file");
    };

    reader.readAsText(file);
  };

  const handleEditUser = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);

    if (updatedUsers.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { mutate: createuser, isPending: ispendingcreateuser } = useMutateData(
    "createuserforestate",
    "POST"
  );

  const handleSubmit = () => {
    if (!selectedEstate?._id) {
      setError("Please select an estate first");
      return;
    }

    if (users.length < 1 || users.length > 20) {
      setError("You must have between 1 and 20 users");
      return;
    }

    const payload = {
      clanId: selectedEstate._id,
      users,
    };

    createuser(
      {
        url: `/v1/clan/createuser`,
        data: payload,
      },
      {
        onSuccess: (data) => {
          setSubmissionResult(data);
          setUsers([]);
          setError("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: (err) => {
          console.error("Error creating users:", err);
          setError(err.message || "An error occurred while creating users");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Bulk User Upload</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload CSV File (Name, Email)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csvUpload"
            ref={fileInputRef}
          />
          <label
            htmlFor="csvUpload"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-block"
          >
            Click to upload
          </label>
          <p className="text-gray-600 text-xs italic mt-1">
            CSV should have two columns: Name and Email (first row will be
            treated as header)
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        {submissionResult && (
          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Submission Results</h2>
            <div className="mb-4">
              <p className="mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-bold ${
                    submissionResult.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {submissionResult.success ? "Success" : "Failed"}
                </span>
              </p>
              <p className="mb-1">
                <span className="font-medium">Added:</span>{" "}
                <span className="text-green-600 font-bold">
                  {submissionResult.addedCount}
                </span>
              </p>
              <p className="mb-1">
                <span className="font-medium">Skipped:</span>{" "}
                <span className="text-yellow-600 font-bold">
                  {submissionResult.skippedCount}
                </span>
              </p>
              <p className="mb-1">
                <span className="font-medium">Clan:</span>{" "}
                <span className="font-bold">{submissionResult.clan}</span>
              </p>
            </div>

            {submissionResult.skippedCount > 0 && (
              <div>
                <h3 className="font-medium mb-2">Skipped Users Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Email
                        </th>
                        <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Reason
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissionResult.skippedUsers.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b border-gray-200">
                            {user.email}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {user.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {users.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Users to Add ({users.length}/20)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                      Name
                    </th>
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                      Email
                    </th>
                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-200">
                        <input
                          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          value={user.name}
                          onChange={(e) =>
                            handleEditUser(index, "name", e.target.value)
                          }
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <input
                          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="email"
                          value={user.email}
                          onChange={(e) =>
                            handleEditUser(index, "email", e.target.value)
                          }
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleRemoveUser(index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit}
            disabled={
              users.length < 1 ||
              users.length > 20 ||
              ispendingcreateuser ||
              !selectedEstate?._id
            }
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              users.length < 1 ||
              users.length > 20 ||
              ispendingcreateuser ||
              !selectedEstate?._id
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {ispendingcreateuser ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Users"
            )}
          </button>
          <div className="flex flex-col items-end">
            <span className="text-gray-600 text-sm">
              {users.length} users (1-20 required)
            </span>
            {!selectedEstate?._id && (
              <span className="text-red-500 text-xs">
                Please select an estate first
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
