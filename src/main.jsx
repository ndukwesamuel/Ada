// import React, { Suspense } from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from '../contexts/Auth.jsx';
// import Loader from './components/Loader.jsx';
// import AppWrapperContainer from './components/layout/index.jsx';

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Router>
//       <AuthProvider>
//         <Suspense fallback={<Loader />}>
//           <AppWrapperContainer>
//           <App />
//           </AppWrapperContainer>
//         </Suspense>
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>
// );

// src/main.jsx
// import React from "react";
import React, { StrictMode, Suspense } from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store/store"; // Import the store and persistor
import Loader from "./components/Loader.jsx";
import AppWrapperContainer from "./components/layout/index.jsx";
import { persistor, store } from "./redux/store.js";
// import { AuthProvider } from "contexts/Auth.jsx";

import { AuthProvider } from "../contexts/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              {/* <AppWrapperContainer> */}
                <App />
              {/* </AppWrapperContainer> */}
            </Suspense>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// // import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// // import "./index.css";
// // import App from "./App.jsx";
// // import { store } from "./redux/store.js";
// // import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // // Create a TanStack Query client
// const queryClient = new QueryClient();

// // Render the app
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/* Redux Provider */}
//     <Provider store={store}>
//       {/* TanStack Query Provider */}
//       <QueryClientProvider client={queryClient}>
//         {/* <App /> */}

//         <Suspense fallback={<Loader />}>
//           <AppWrapperContainer>
//             <App />{" "}
//           </AppWrapperContainer>{" "}
//         </Suspense>
//       </QueryClientProvider>
//     </Provider>
//   </StrictMode>
// );
