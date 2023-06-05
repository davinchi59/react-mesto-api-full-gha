import React, {useEffect, useState} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import PopupConfirm from './PopupConfirm'
import {InfoTooltipTypes} from '../utils/constants'
import {AppContext} from "../contexts/AppContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [cards, setCards] = useState([])
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
	const [confirmPopupData, setConfirmPopupData] = useState({
		isOpen: false,
		title: '',
		buttonTexts: {idle: '', loading: ''},
		callback: () => {
		},
	})
	const [infoTooltipData, setInfoTooltipData] = useState({
		isOpen: false,
		type: null,
	})
	const [selectedCard, setSelectedCard] = useState(null)
	const [currentUser, setCurrentUser] = useState({})
	const [accountInfo, setAccountInfo] = useState({})

	const navigate = useNavigate()

	useEffect(() => {
		checkAuth()
	}, [])

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true)
	}

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true)
	}

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true)
	}

	const handleCardClick = (card) => {
		setSelectedCard(card)
	}

	const handleCardLike = (card) => {
		const isLiked = card.likes.some((i) => i._id === currentUser?._id)
		api
			.toggleCardLike(card._id, !isLiked)
			.then((newCard) =>
				setCards((cards) =>
					cards.map((c) => (c._id === card._id ? newCard : c))
				)
			)
			.catch((error) => console.log(error))
	}

	const handleCardDelete = (card) => {
		setConfirmPopupData({
			isOpen: true,
			title: 'Вы уверены?',
			buttonTexts: {idle: 'Да', loading: 'Удаление...'},
			callback: (setIsLoading) => {
				setIsLoading(true)
				api
					.deleteCard(card._id)
					.then(() => {
						setCards((cards) => cards.filter((c) => c._id !== card._id))
						closeAllPopups()
					})
					.catch((error) => console.log(error))
					.finally(() => setIsLoading(false))
			},
		})
	}

	const handleUpdateUser = ({name, description}, setIsLoading) => {
		setIsLoading(true)
		api
			.setUserInfo({name, about: description})
			.then((newUserInfo) => {
				setCurrentUser(newUserInfo)
				closeAllPopups()
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}

	const handleUpdateAvatar = ({avatar}, setIsLoading) => {
		setIsLoading(true)
		api
			.setUserAvatar(avatar)
			.then((newUserInfo) => {
				setCurrentUser(newUserInfo)
				closeAllPopups()
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}

	const handleAddPlaceSubmit = ({name, link}, setIsLoading) => {
		setIsLoading(true)
		api
			.addCard({name, link})
			.then((newCard) => {
				setCards((prev) => [newCard, ...prev])
				closeAllPopups()
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setSelectedCard(null)
		setConfirmPopupData(prev => ({...prev, isOpen: false}))
		setInfoTooltipData(prev => ({...prev, isOpen: false}))
	}

	const onSignIn = (token, email) => {
		localStorage.setItem('jwt', token)
		setAccountInfo({email})
		setLoggedIn(true)
		navigate('/', {replace: true})
		api
			.getUserInfo()
			.then((userInfo) => setCurrentUser(userInfo))
			.catch((error) => console.log(error))

		api
			.getInitialCards()
			.then((cards) => {
				console.log(cards)
				setCards(cards)
			})
			.catch((error) => console.log(error))
	}

	const handleSignIn = (password, email) => {
		auth
			.signIn(password, email)
			.then(({token}) => onSignIn(token, email))
			.catch((error) => console.log(error))
	}

	const handleSignUp = (password, email) => {
		auth
			.signUp(password, email)
			.then(() => {
				showInfoTooltip(InfoTooltipTypes.Success)
				navigate('/sign-in', {replace: true})
			})
			.catch((error) => {
				showInfoTooltip(InfoTooltipTypes.Error)
				console.log(error)
			})
	}

	const handleLogOut = () => {
		localStorage.removeItem('jwt')
		setLoggedIn(false)
	}

	const checkAuth = () => {
		const jwt = localStorage.getItem('jwt')
		if (!jwt) return
		auth
			.checkToken(jwt)
			.then((data) => onSignIn(jwt, data.email))
			.catch((error) => console.log(error))
	}

	const showInfoTooltip = (type) => setInfoTooltipData({isOpen: true, type})

	return (
		<AppContext.Provider value={{loggedIn, showInfoTooltip, accountInfo, closeAllPopups}}>
			<CurrentUserContext.Provider value={currentUser}>
				<div className='page'>
					<div className='page__container'>
						<Header onLogOut={handleLogOut}/>

						<Routes>
							<Route
								path='/sign-in'
								element={<Login onSignIn={handleSignIn}/>}
							/>
							<Route
								path='/sign-up'
								element={<Register onSignUp={handleSignUp}/>}
							/>
							<Route
								path='/'
								element={
									<ProtectedRoute
										element={Main}
										cards={cards}
										onEditProfile={handleEditProfileClick}
										onEditAvatar={handleEditAvatarClick}
										onAddPlace={handleAddPlaceClick}
										onCardClick={handleCardClick}
										onCardLike={handleCardLike}
										onCardDelete={handleCardDelete}
									/>
								}
							/>
						</Routes>

						{loggedIn && <Footer/>}
					</div>

					<InfoTooltip
						isOpen={infoTooltipData.isOpen}
						type={infoTooltipData.type}
					/>

					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onUpdateUser={handleUpdateUser}
					/>

					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onUpdateAvatar={handleUpdateAvatar}
					/>

					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onAddPlace={handleAddPlaceSubmit}
					/>

					<ImagePopup card={selectedCard}/>

					<PopupConfirm
						isOpen={confirmPopupData.isOpen}
						title={confirmPopupData.title}
						buttonTexts={confirmPopupData.buttonTexts}
						onConfirm={confirmPopupData.callback}
					/>
				</div>
			</CurrentUserContext.Provider>
		</AppContext.Provider>
	)
}

export default App
