import React from "react";
import { useDispatch } from "react-redux";
import { DeleteProfile } from "../Redux/Actions/profileActions";

function RowDetails({ _id, user,PhoneNum, City, Country, Bio }) {
   const dispatch =  useDispatch()
    const DeleteHandler = (id)=>{
      dispatch(DeleteProfile(id))
    }
  return (
    <tr>
      <th>{user.name}</th>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{PhoneNum}</td>
      <td>{City}</td>
      <td>{Country}</td>
      <td>{Bio}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default RowDetails;