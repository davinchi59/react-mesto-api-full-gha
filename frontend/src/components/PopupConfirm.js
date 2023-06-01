import React, {useCallback, useContext, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import {AppContext} from "../contexts/AppContext";

export default function PopupConfirm({
	isOpen,
	title,
	buttonTexts,
	onConfirm,
}) {
	const [isLoading, setIsLoading] = useState(false)

	const { closeAllPopups } = useContext(AppContext)

	const onClose = () => closeAllPopups()

	const handleSubmit = useCallback(
		(event = null) => {
			event?.preventDefault()
			onConfirm(setIsLoading)
		},
		[onConfirm]
	)

	return (
		<PopupWithForm
			title={title}
			name='confirm-popup'
			buttonTexts={buttonTexts}
			isOpen={isOpen}
			isLoading={isLoading}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	)
}
