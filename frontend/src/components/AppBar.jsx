import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Appbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        // Check if token exists in local storage
        if (!userToken) {
            navigate("/signin"); // Redirect to sign-in page if token doesn't exist
        } else {
            axios
                .get("/api/v1/user/getUser", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    setUser(response.data);
                });
        }
    }, []);


    return <div className="shadow h-14 flex justify-between">
        <Link to={"/dashboard"}></Link>
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                </div>
            </div>
        </div>
    </div>
}

export default Appbar;