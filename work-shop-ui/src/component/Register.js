import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, checkUsernameAvailability } from '../service/api';
import '../css/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  // ตรวจสอบ username เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.username.length >= 3) {
        checkUsernameAvailability(formData.username)
          .then(available => setUsernameAvailable(available))
          .catch(() => setUsernameAvailable(false));
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [formData.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // ลบ error เมื่อผู้ใช้เริ่มแก้ไข
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (usernameAvailable === false) {
      setErrors(prev => ({ ...prev, username: 'ชื่อผู้ใช้นี้มีคนใช้แล้ว' }));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      
      // Redirect ไปหน้า login พร้อมแสดงข้อความสำเร็จ
      navigate('/login', { 
        state: { 
          registrationSuccess: true,
          message: 'สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ' 
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message === 'Email already exists') {
        setErrors(prev => ({ ...prev, email: 'อีเมล์นี้มีผู้ใช้แล้ว' }));
      } else {
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก: ' + (error.message || 'โปรดลองอีกครั้ง'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">สมัครสมาชิก</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">ชื่อ</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="กรุณากรอกชื่อ"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">นามสกุล</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="กรุณากรอกนามสกุล"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">อีเมล์</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">เบอร์โทร</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="081-234-5678"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="กรุณากรอกชื่อผู้ใช้"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="กรุณากรอกรหัสผ่าน"
                            className="form-input"
                        />
                        <p className="password-hint">รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร</p>
                    </div>

                    <button type="submit" className="register-button">
                        สมัครสมาชิก
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;