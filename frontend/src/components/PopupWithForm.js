import React, {useContext} from 'react'
import usePopupClose from "../hooks/usePopupClose";
import {AppContext} from "../contexts/AppContext";

export default function PopupWithForm({
	title,
	name,
	buttonTexts,
	isOpen,
	isValid = true,
	isLoading,
	onSubmit,
	children,
}) {

	const { closeAllPopups } = useContext(AppContext)

	const onClose = () => closeAllPopups()

	usePopupClose(isOpen, onClose)

	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className='popup__container'>
				<button className='popup__close-btn' type='button' onClick={onClose} />
				<form
					name={name}
					className='form'
					noValidate
					onSubmit={onSubmit}
				>
					<h2 className='form__title'>{title}</h2>
					{children && <div className="form__body">{children}</div>}
					<button
						className={`form__save-btn ${
							!isValid ? 'form__save-btn_inactive' : ''
						}`}
						type='submit'
						disabled={!isValid || isLoading}
					>
						{isLoading ? buttonTexts?.loading : buttonTexts?.idle}
					</button>
				</form>
			</div>
		</div>
	)
}
