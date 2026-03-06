import React from 'react'
import { BrowserRouter as Router, Route, Routes } from
    'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import ChooseAuth from '../pages/auth/ChooseAuth';
import Home from '../pages/general/home';
import Saved from '../pages/general/Saved';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/profile';
import Layout from '../components/Layout';
const AppRoutes = () => {
    return (
        <Router>
                        <Routes>
                            {/* Landing chooser (no layout) */}
                            <Route path="/" element={<ChooseAuth />} />

                            <Route element={<Layout />}>
                                <Route path="/home" element={<Home />} />
                                <Route path="/create-food" element={<CreateFood />} />
                                <Route path="/saved" element={<Saved />} />
                                <Route path="/food-partner/:id" element={<Profile />} />
                            </Route>

                            <Route path="/user/register" element={<UserRegister />} />
                            <Route path="/user/login" element={<UserLogin />} />
                            <Route path="/user/food-partner/register" element={<FoodPartnerRegister />} />
                            <Route path="/user/food-partner/login" element={<FoodPartnerLogin />} />
                        </Routes>
        </Router>
    )
}

export default AppRoutes