import React from "react";
import {Balance} from "../components/Balance";
import {Users} from "../components/Users";
import {Appbar} from "../components/AppBar";


export const Dashboard = () => {
    return (
        <div>
            {/* console.log("dashboard") */}
            <Appbar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    )
}
