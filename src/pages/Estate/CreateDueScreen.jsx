// import React, { useState } from "react";
// import { useFetchData, useMutateData } from "@/hook/Request";
// // import React, { useState, useMemo } from "react";
// import { useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const CreateDueScreen = () => {
//   const { selectedEstate } = useSelector(
//     (state) => state?.reducer?.estateSlice
//   );
//   const navigate = useNavigate();
//   // const navigate = useNavigate();
//   console.log({
//     jfjf: selectedEstate?._id,
//   });

//   // Fetch members data

//   const {
//     data: getallhousehold,
//     isLoading: isloadinggetallhousehold,
//     isError: iserrorgetallhousehold,
//   } = useFetchData(
//     `/v1/clan/all-household/${selectedEstate?._id}`,
//     "household"
//   );

//   const {
//     mutate: CreateDue,
//     isPending: ispendingCreateDue,
//     isError: iserrorCreateDue,
//   } = useMutateData("household", "POST");

//   let allhousehold = getallhousehold?.households;
//   let allmemeber = getallhousehold?.households;

//   console.log({
//     iiii: allmemeber,
//   });

//   // let members = allhousehold?.map((item) => {

//   // Sample members data - in a real app, you would fetch this from your API
//   const [members] = useState([
//     { _id: "66a56498006e9083f7914367", name: "Bad Man" },
//     { _id: "6686efdffaef97b1612b4c51", name: "Pause Point (test)" },
//     { _id: "66a6fef6006e9083f79143db", name: "Waheed A" },
//     { _id: "66af56497308f7093a8d9312", name: "Bayo" },
//   ]);

//   // Form state
//   const [formData, setFormData] = useState({
//     serviceName: "",
//     serviceDetails: "",
//     amount: "",
//     dueDate: "",
//     selectedMembers: [],
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Toggle member selection
//   const toggleMember = (memberId) => {
//     setFormData((prev) => {
//       const isSelected = prev.selectedMembers.includes(memberId);
//       return {
//         ...prev,
//         selectedMembers: isSelected
//           ? prev.selectedMembers.filter((id) => id !== memberId)
//           : [...prev.selectedMembers, memberId],
//       };
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare the data in the required format
//     const dueData = {
//       clanId: selectedEstate?._id,
//       serviceName: formData.serviceName,
//       serviceDetails: formData.serviceDetails,
//       amount: Number(formData.amount),
//       dueDate: formData.dueDate,
//       members: formData.selectedMembers,
//     };

//     console.log("Due to be created:", dueData);
//     // CreateDue({
//     //   url: `/v1/clan/createDue`,
//     //   data: dueData,
//     // });
//     CreateDue(
//       {
//         url: `/v1/clan/createDue`,
//         data: dueData,
//       },
//       {
//         onSuccess: () => {
//           // Navigate back on successful creation
//           navigate(-1); // Goes back to previous page
//           // OR navigate to a specific route:
//           // navigate('/dues');
//         },
//         onError: (error) => {
//           console.error("Error creating due:", error);
//           // Optionally show error to user
//         },
//       }
//     );
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Create New Due</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Service Name:</label>
//           <input
//             type="text"
//             name="serviceName"
//             value={formData.serviceName}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Service Details:</label>
//           <textarea
//             name="serviceDetails"
//             value={formData.serviceDetails}
//             onChange={handleChange}
//             style={{ ...styles.input, height: "80px" }}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Amount:</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Due Date:</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={formData.dueDate}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Households
//           </label>
//           <div className="space-y-4">
//             {allhousehold.map((household) => {
//               // Find all leaders in this household
//               const leaders = household.members.filter(
//                 (member) => member.role === "Leader"
//               );

//               return (
//                 <div
//                   key={household._id}
//                   className="border rounded-lg p-4 shadow-sm"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-lg">{household.name}</h3>
//                       <p className="text-sm text-gray-500">
//                         {household.address}
//                       </p>
//                     </div>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {household.type}
//                     </span>
//                   </div>

//                   {leaders.length > 0 ? (
//                     <div className="mt-3">
//                       <h4 className="text-sm font-medium text-gray-700 mb-1">
//                         Leaders:
//                       </h4>
//                       <ul className="space-y-2">
//                         {leaders.map((leader) => (
//                           <li key={leader._id} className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={formData.selectedMembers.includes(
//                                 leader.user._id
//                               )}
//                               onChange={() => toggleMember(leader.user._id)}
//                               className="h-4 w-4 text-blue-600 rounded mr-2"
//                             />
//                             <div>
//                               <p className="text-sm font-medium">
//                                 {leader.user.name}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 ID: {leader.user._id}
//                               </p>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ) : (
//                     <div className="mt-3 text-sm text-gray-500">
//                       No leaders assigned
//                     </div>
//                   )}

//                   <div className="mt-3 pt-3 border-t">
//                     <p className="text-xs text-gray-500">
//                       Household ID: {household._id}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <button
//           type="submit"
//           style={styles.button}
//           disabled={formData.selectedMembers.length === 0}
//         >
//           Create Due
//         </button>
//       </form>
//     </div>
//   );
// };

// // Inline styles - you could also use CSS modules or styled-components
// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   header: {
//     textAlign: "center",
//     color: "#333",
//     marginBottom: "30px",
//   },
//   form: {
//     backgroundColor: "#f9f9f9",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   },
//   formGroup: {
//     marginBottom: "20px",
//   },
//   label: {
//     display: "block",
//     marginBottom: "8px",
//     fontWeight: "600",
//     color: "#555",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     fontSize: "16px",
//     boxSizing: "border-box",
//   },
//   memberList: {
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     padding: "10px",
//     maxHeight: "200px",
//     overflowY: "auto",
//   },
//   memberItem: {
//     padding: "8px 0",
//     borderBottom: "1px solid #eee",
//   },
//   checkbox: {
//     marginRight: "10px",
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     color: "white",
//     padding: "12px 20px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "16px",
//     width: "100%",
//     marginTop: "10px",
//   },
// };

// export default CreateDueScreen;

import React, { useState } from "react";
import { useFetchData, useMutateData } from "@/hook/Request";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateDueScreen = () => {
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );
  const navigate = useNavigate();

  // Fetch members data
  const {
    data: getallhousehold,
    isLoading: isloadinggetallhousehold,
    isError: iserrorgetallhousehold,
  } = useFetchData(
    `/v1/clan/all-household/${selectedEstate?._id}`,
    "household"
  );

  const {
    mutate: CreateDue,
    isPending: ispendingCreateDue,
    isError: iserrorCreateDue,
  } = useMutateData("household", "POST");

  const allhousehold = getallhousehold?.households || [];

  // Form state
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDetails: "",
    amount: "",
    dueDate: "",
    selectedMembers: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle member selection
  const toggleMember = (memberId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedMembers.includes(memberId);
      return {
        ...prev,
        selectedMembers: isSelected
          ? prev.selectedMembers.filter((id) => id !== memberId)
          : [...prev.selectedMembers, memberId],
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const dueData = {
      clanId: selectedEstate?._id,
      serviceName: formData.serviceName,
      serviceDetails: formData.serviceDetails,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      members: formData.selectedMembers,
    };

    CreateDue(
      {
        url: `/v1/clan/createDue`,
        data: dueData,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          console.error("Error creating due:", error);
        },
      }
    );
  };

  if (isloadinggetallhousehold) {
    return <div style={styles.loading}>Loading households...</div>;
  }

  if (iserrorgetallhousehold) {
    return <div style={styles.error}>Error loading households</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create New Due</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Service Name:</label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Service Details:</label>
          <textarea
            name="serviceDetails"
            value={formData.serviceDetails}
            onChange={handleChange}
            style={{ ...styles.input, height: "80px" }}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Households
          </label>
          <div className="space-y-4">
            {allhousehold.length > 0 ? (
              allhousehold.map((household) => {
                const leaders =
                  household.members?.filter(
                    (member) => member.role === "Leader"
                  ) || [];

                return (
                  <div
                    key={household._id}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {household.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {household.address}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {household.type}
                      </span>
                    </div>

                    {leaders.length > 0 ? (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Leaders:
                        </h4>
                        <ul className="space-y-2">
                          {leaders.map((leader) => (
                            <li key={leader._id} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.selectedMembers.includes(
                                  leader.user?._id
                                )}
                                onChange={() => toggleMember(leader.user?._id)}
                                className="h-4 w-4 text-blue-600 rounded mr-2"
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {leader.user?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  ID: {leader.user?._id}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mt-3 text-sm text-gray-500">
                        No leaders assigned
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-gray-500">
                        Household ID: {household._id}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500">
                No households found
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor:
              formData.selectedMembers.length === 0 ? "#cccccc" : "#4CAF50",
            cursor:
              formData.selectedMembers.length === 0 ? "not-allowed" : "pointer",
          }}
          disabled={formData.selectedMembers.length === 0 || ispendingCreateDue}
        >
          {ispendingCreateDue ? "Creating..." : "Create Due"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  form: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#666",
  },
  error: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#ff0000",
  },
  button: {
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
    marginTop: "10px",
  },
};

export default CreateDueScreen;
