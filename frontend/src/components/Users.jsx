import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from "./Button";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?=" + filter);
            setUsers(response.data.user);
        }
        fetchUsers();
    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search" className="w-full border border-gray-300 rounded-md p-2"></input>
        </div>
        <div>
            { }
            {users.map((user) => {
                <User key={user._id} user={user} />
            })}
        </div>

    </>

}

function User({ user }) {
    const navigate = useNavigate();
    return <div className="flex justify-betweem">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful" >
                <Button onClick={(e) => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);

                }} label={"Send Money"} />
            </div>
        </div>
    </div>
}

export default Users