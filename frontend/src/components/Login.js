import React from 'react';
import {useForm} from "../hooks/useForm";

export default function Login({ onSignIn }) {
	const {values, handleChange} = useForm({password: '', email: ''});

	const handleSubmit = (event) => {
		event.preventDefault()
		const { password, email } = values
		onSignIn(password, email)
	}

	return (
		<div className='auth'>
			<form
				name='login'
				className='form'
				noValidate
				onSubmit={handleSubmit}
			>
				<h2 className='form__title form__title_light'>Вход</h2>
				<div className="form__body">
					<label htmlFor='email' className='form__input-block'>
						<input
							className='form__input form__input_light'
							type='email'
							placeholder='Email'
							name='email'
							required
							value={values.email}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor='password' className='form__input-block'>
						<input
							className='form__input form__input_light'
							type='password'
							placeholder='Пароль'
							name='password'
							required
							value={values.password}
							onChange={handleChange}
						/>
					</label>
				</div>
				<button
					className='form__save-btn form__save-btn_light'
					type='submit'
				>Войти</button>
			</form>
		</div>
	);
};