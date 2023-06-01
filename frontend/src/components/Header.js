import React, {useContext} from 'react'
import HeaderLogoImage from '../images/header__logo.svg'
import {Route, Routes, useNavigate} from "react-router-dom";
import {AppContext} from "../contexts/AppContext";

export default function Header({onLogOut}) {
	const navigate = useNavigate()

	const {accountInfo} = useContext(AppContext)

	return (
		<header className='header'>
			<img
				className='header__logo'
				src={HeaderLogoImage}
				alt="Логотип 'Mesto Russia'"
			/>
			<div className='header__row'>
				<Routes>
					<Route path='/' element={(
						<>
							<div className='header__info'>{accountInfo?.email}</div>
							<div
								className="header__link"
								onClick={onLogOut}
							>Выйти</div>
						</>
					)}/>
					<Route
						path='/sign-in'
						element={(
							<div
								className="header__link"
								onClick={() => navigate('/sign-up', {replace: true})}
							>Регистрация</div>
						)}
					/>
					<Route
						path='/sign-up'
						element={(
							<div
								className="header__link"
								onClick={() => navigate('/sign-in', {replace: true})}
							>Войти</div>
						)}
					/>
				</Routes>
			</div>
		</header>
	)
}
