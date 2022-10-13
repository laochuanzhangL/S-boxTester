import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// 登录注册
import Login from "./login";
// 找回密码
import Find from "./login/components/findPassword";
// 计算以及上传文件页面
import Show from "./content/MainPage";
// 计算结果页面
import CalPage from "./content/CalPage/MainControl";
import {
  Bic,
  Dp,
  Lp,
  Nonlinearity,
  Sac,
  SOB,
} from "./content/CalPage/index.js";

export default function Main() {
  return (
    <Routes>
      {/* 计算界面 */}
      <Route path="CalPage/*" element={<CalPage />}>
        <Route path="" element={<Bic />} />
        <Route path="Bic" element={<Bic />} />
        <Route path="Dp" element={<Dp />} />
        <Route path="Lp" element={<Lp />} />
        <Route path="Nlr" element={<Nonlinearity />} />
        <Route path="Sac" element={<Sac />} />
        <Route path="SOB" element={<SOB />} />
      </Route>
      {/* 上传文件 */}
      <Route path="/MainPage/Show/*" element={<Show />} />
      {/* 找回密码 */}
      <Route path="/Login/find" element={<Find />} />
      {/* 登录注册 */}
      <Route path="/Login/*" element={<Login />} />
      <Route path="/" element={<Navigate to="/Login" />} />;
      <Route path="*" element={<Navigate to="/Login" />} />
    </Routes>
  );
}
