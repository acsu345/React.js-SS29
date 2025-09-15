import React, { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const getAllStudent = async () => {
    try {
      const res = await axios.get<Student[]>("http://localhost:8080/student");
      setStudents(res.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  const deleteStudent = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/student/${id}`);
      setShowModal(false);
      setSelectedStudent(null);
      getAllStudent(); 
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
    }
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#3b5673",
          padding: "16px",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>
          Quản lý <strong>sinh viên</strong>
        </h2>
        <button
          style={{
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Thêm mới sinh viên
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5", color:"black"}}>
            <th></th>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} style={{ borderTop: "1px solid #ddd" }}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{s.student_name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.phone}</td>
              <td>
                <button
                  style={{
                    marginRight: "8px",
                    border: "none",
                    background: "transparent",
                    color: "orange",
                    cursor: "pointer",
                  }}
                  title="Sửa"
                >
                  ✏️
                </button>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "red",
                    cursor: "pointer",
                  }}
                  title="Xóa"
                  onClick={() => {
                    setSelectedStudent(s);
                    setShowModal(true);
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedStudent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color:"black"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>Xóa sinh viên</h3>
            <p>
              Bạn chắc chắn muốn xóa sinh viên{" "}
              <strong>{selectedStudent.student_name}</strong> (ID:
              {selectedStudent.id})?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #ccc",
                  background: "#f5f5f5",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
              <button
                onClick={() => deleteStudent(selectedStudent.id)}
                style={{
                  padding: "6px 12px",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
