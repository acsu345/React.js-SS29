import React from "react";

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
}

interface Props {
  student: Student;
}

export default function StudentRow({ student }: Props) {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{student.student_name}</td>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.phone}</td>
      <td>
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "orange",
            marginRight: "8px",
          }}
        >
          ✏️
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "red",
          }}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
