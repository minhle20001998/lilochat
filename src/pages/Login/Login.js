import React from 'react'
import './Login.css'
import Navbar from '../../components/Navbar/Navbar'
export default function Login() {
    return (
        <>
            <Navbar />
            <div className="login-page">
                <div></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: 'red' }}>DISCLAIMER</h1>
                    <p style={{ maxWidth: '800px', textAlign: 'center', lineHeight: '1.4rem' }}>Nguyên đã làm trang này. Trong trường hợp trang web này bị điều tra bởi các cơ quan trực thuộc Bộ Công An (hoặc các tổ chức chính trị tương tự phục vụ cho nhà nước CHXHCNVN), tôi khẳng định page hoàn toàn không ủng hộ và giúp sức cho các hành vi chống phá Đảng và nhà nước CHXHCNVN. Tôi cũng không quên khẳng định quyết tâm chiến thắng đại dịch Covid-19, nhấn mạnh chủ quyền không thể tranh cãi với quần đảo Hoàng Sa và Trường Sa, cũng như tính chính nghĩa của cuộc chiến giải phóng người dân Campuchia khỏi thảm họa diệt chủng Khmer Đỏ</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    If this is not your taste, try <a style={{ color: 'red' }} href='gero.com'>gero.com</a>
                </div>
            </div>
        </>
    )
}
