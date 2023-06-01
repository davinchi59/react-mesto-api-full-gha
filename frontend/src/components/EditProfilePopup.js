import React, { useCallback, useContext, useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useFormWithValidation } from '../hooks/useFormWithValidation'

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext)
	const [isLoading, setIsLoading] = useState(false)
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation({ name: '', description: '' })

	const handleSubmit = useCallback(
		(event = null) => {
			event?.preventDefault()
			if (!isValid) return
			onUpdateUser(
				{ name: values.name, description: values.description },
				setIsLoading
			)
		},
		[values, isValid, onUpdateUser]
	)

	useEffect(() => {
		if (isOpen)
			resetForm({
				name: currentUser?.name ?? '',
				description: currentUser?.about ?? '',
			})
	}, [isOpen, currentUser, resetForm])

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='edit-profile'
			buttonTexts={{ idle: 'Сохранить', loading: 'Сохранение...' }}
			isOpen={isOpen}
			isValid={isValid}
			isLoading={isLoading}
			onSubmit={handleSubmit}
		>
			<label htmlFor='name' className='form__input-block'>
				<input
					className='form__input'
					type='text'
					placeholder='Имя'
					name='name'
					id='profileEditName'
					required
					minLength='2'
					maxLength='40'
					value={values.name}
					onChange={handleChange}
				/>
				<p
					className={`form__error ${
						errors?.name ? 'form__error_active' : ''
					}`}
				>
					{errors?.name}
				</p>
			</label>
			<label htmlFor='name' className='form__input-block'>
				<input
					className='form__input'
					type='text'
					placeholder='О себе'
					name='description'
					id='profileEditDescription'
					required
					minLength='2'
					maxLength='200'
					value={values.description}
					onChange={handleChange}
				/>
				<p
					className={`form__error ${
						errors?.description ? 'form__error_active' : ''
					}`}
				>
					{errors.description}
				</p>
			</label>
		</PopupWithForm>
	)
}
