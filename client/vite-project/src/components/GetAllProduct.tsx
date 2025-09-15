import React, { useEffect, useState } from 'react'

interface Product {
  id: number;
  product_name: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string;
}

export default function GetAllProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProduct = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/product");
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data: Product[] = await response.json();
      console.log("Danh sách sản phẩm:", data);
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return <div>
      <h2>Product List</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ngày thêm</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.product_name}</td>
              <td>
                <img src={p.image} alt={p.product_name} width={60} />
              </td>
              <td>{p.price.toLocaleString("vi-VN")} đ</td>
              <td>{p.quantity}</td>
              <td>{new Date(p.created_at).toLocaleDateString("vi-VN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
}
