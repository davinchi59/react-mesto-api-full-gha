import React, {useContext} from 'react'
import usePopupClose from "../hooks/usePopupClose";
import {AppContext} from "../contexts/AppContext";

export default function ImagePopup({card}) {

	const isOpen = card !== null

	const { closeAllPopups } = useContext(AppContext)

	const onClose = () => closeAllPopups()

	usePopupClose(isOpen, onClose)

	return (
		<div
			className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}
		>
			<div className='popup__image-container'>
				<img className='popup__image' src={card?.link} alt={card?.name}/>
				<button className='popup__close-btn' type='button' onClick={onClose}/>
				<p className='popup__image-title'>{card?.name}</p>
			</div>
		</div>
	)
}
