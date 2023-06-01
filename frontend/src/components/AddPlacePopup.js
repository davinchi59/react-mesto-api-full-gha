import React, {useCallback, useEffect, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import { useFormWithValidation } from '../hooks/useFormWithValidation'

export default function AddPlacePopup({ isOpen, onAddPlace }) {
	const [isLoading, setIsLoading] = useState(false)
	const { values, handleChange, errors, isValid, resetForm } =
		useFormWithValidation({ name: '', link: '' })

	const handleSubmit = useCallback(
		(event = null) => {
			event?.preventDefault()
			if (!isValid) return
			onAddPlace(
				{
					name: values.name,
					link: values.link,
				},
				setIsLoading
			)
		},
		[values, isValid, onAddPlace]
	)

	useEffect(() => {
		resetForm({ name: '', link: '' })
	}, [isOpen, resetForm])

	return (
		<PopupWithForm
			title='Новое место'
			name='add-post'
			buttonTexts={{ idle: 'Создать', loading: 'Создаётся...' }}
			isOpen={isOpen}
			isValid={isValid}
			isLoading={isLoading}
			onSubmit={handleSubmit}
		>
			<label htmlFor='name' className='form__input-block'>
				<input
					className='form__input'
					type='text'
					placeholder='Название'
					name='name'
					id='addPostPlace'
					required
					minLength='2'
					maxLength='30'
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
			<label htmlFor='link' className='form__input-block'>
				<input
					className='form__input'
					type='url'
					placeholder='Ссылка на картинку'
					name='link'
					id='addPostLink'
					required
					value={values?.link}
					onChange={handleChange}
				/>
				<p
					className={`form__error ${
						errors?.link ? 'form__error_active' : ''
					}`}
				>
					{errors?.link}
				</p>
			</label>
		</PopupWithForm>
	)
}
