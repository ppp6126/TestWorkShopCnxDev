import React, { useState } from 'react';
import '../css/Login.css'; // We'll create this CSS file next
import { authService } from '../service/api';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../Slice/checkLoginSlice';
import { useSelector, useDispatch } from 'react-redux';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted:', formData);
    try {
      const response = await authService.login(formData);
      if(response.success){
      dispatch(checkLogin(true));
      // Redirect ไปหน้า dashboard หรือหน้าหลัก
      navigate('/Popular', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">เข้าสู่ระบบ</h2>
        {loginError && (
          <div className="alert alert-error">
            {loginError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
          </div>
          <button type="submit" className="login-button">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;