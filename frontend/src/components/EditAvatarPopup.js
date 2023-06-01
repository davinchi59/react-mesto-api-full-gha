import React, {useCallback, useEffect, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import { useFormWithValidation } from '../hooks/useFormWithValidation'

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
	const [isLoading, setIsLoading] = useState(false)
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation({ url: '' })

	const handleSubmit = useCallback(
		(event = null) => {
			event?.preventDefault()
			if (!isValid) return
			onUpdateAvatar({ avatar: values.url }, setIsLoading)
		},
		[values, isValid, onUpdateAvatar]
	)

	useEffect(() => {
		if (isOpen) resetForm({ url: '' })
	}, [isOpen, resetForm])

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='update-avatar'
			buttonTexts={{ idle: 'Сохранить', loading: 'Сохранение...' }}
			isOpen={isOpen}
			isValid={isValid}
			isLoading={isLoading}
			onSubmit={handleSubmit}
		>
			<label htmlFor='url' className='form__input-block'>
				<input
					className='form__input'
					type='url'
					placeholder='Ссылка на картинку'
					name='url'
					id='updateAvatarLink'
					required
					value={values.url}
					onChange={handleChange}
				/>
				<p
					className={`form__error ${errors?.url ? 'form__error_active' : ''}`}
				>
					{errors?.url}
				</p>
			</label>
		</PopupWithForm>
	)
}
