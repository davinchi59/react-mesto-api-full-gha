import React, { useContext } from 'react'
import editImage from '../images/edit.svg'
import plusImage from '../images/plus.svg'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Main({
	cards,
	onEditProfile,
	onEditAvatar,
	onAddPlace,
	onCardClick,
	onCardLike,
	onCardDelete,
}) {
	const currentUser = useContext(CurrentUserContext)

	return (
		<main>
			<section className='profile'>
				<div className='avatar' onClick={onEditAvatar}>
					<img
						className='avatar__image'
						src={currentUser?.avatar}
						alt='Аватар профиля'
					/>
					<button className='avatar__edit' />
				</div>
				<div className='profile__info'>
					<div className='profile__row'>
						<h1 className='profile__name'>{currentUser?.name}</h1>
						<button
							className='profile__edit-btn'
							type='button'
							onClick={onEditProfile}
						>
							<img
								className='profile__edit-icon'
								src={editImage}
								alt='Кнопка редактирования профиля'
							/>
						</button>
					</div>
					<p className='profile__description'>{currentUser?.about}</p>
				</div>

				<button className='profile__add-btn' type='button' onClick={onAddPlace}>
					<img
						className='profile__add-icon'
						src={plusImage}
						alt='Кнопка добавления поста'
					/>
				</button>
			</section>

			<section className='posts'>
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						onCardClick={() => onCardClick(card)}
						onCardLike={() => onCardLike(card)}
						onCardDelete={() => onCardDelete(card)}
					/>
				))}
			</section>
		</main>
	)
}
