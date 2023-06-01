import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card({
	card: { likes, link, name, owner },
	onCardClick,
	onCardLike,
	onCardDelete,
}) {
	const currentUser = useContext(CurrentUserContext)

	const isOwn = owner._id === currentUser?._id
	const isLiked = likes.some((i) => i._id === currentUser?._id)

	const handleClickLike = (event) => {
		event.stopPropagation()
		onCardLike()
	}

	const handleClickDelete = (event) => {
		event.stopPropagation()
		onCardDelete()
	}

	return (
		<article className='post' onClick={onCardClick}>
			<img className='post__image' src={link} alt={name} />
			<div className='post__controls'>
				<h2 className='post__title'>{name}</h2>
				<button
					className={`post__like ${isLiked && 'post__like_active'}`}
					type='button'
					onClick={handleClickLike}
				>
					{likes.length}
				</button>
			</div>
			{isOwn && (
				<button
					className='post__remove'
					type='button'
					onClick={handleClickDelete}
				/>
			)}
		</article>
	)
}
