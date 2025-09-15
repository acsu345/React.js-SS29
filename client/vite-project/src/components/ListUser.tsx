import axios from 'axios'
import React, { useState } from 'react'

interface User {
    id?: number;
    name?: string;
    dob?:string;
    email?:string;
}
export default function ListUser() {
    const [ user, setUsers] = useState<User[]>([])
    //gọi api lấy danh sách user

    axios.get("http://localhost:8080/users").then((response) => console.log("Response: ", response)).catch((error) => console.log("error: ",error))
  return (
     <div>
      <h3>Danh sách người dùng</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>20/11/2000</td>
            <td>nva@gail.com</td>
            <td>Hà Nội</td>
            <td>
              <button>Sửa</button>
              <button>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button>Prev</button>
           <button>1</button>
              <button>2</button>
                 <button>3</button>
                    <button>Next</button>
      </div>
    </div>
  )
}
