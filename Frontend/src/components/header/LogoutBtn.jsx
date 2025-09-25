// import React from "react";
// import { useNavigate } from "react-router";
// import { authService } from "../../API/auth";

// function LogoutBtn() {
//     const navigate = useNavigate();
//     const LogoutHandle = async () => {
//         console.log("Starting logging out");
//         try {
//             const token = localStorage.getItem("accessToken");
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("user");
//             if (token) {
//                 await authService.logout();
//             }
//             console.log("Logout successful");
//             navigate("/");
//             // window.location.reload();
//         } catch (error) {
//             console.error("Logout error:", error);
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("user");
//             navigate("/");
//             // window.location.reload();
//         }
//     };

//     return (
        
//     );
// }

// export default LogoutBtn;
