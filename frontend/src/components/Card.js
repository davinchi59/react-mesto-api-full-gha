import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card({
	card,
	onCardClick,
	onCardLike,
	onCardDelete,
}) {
	const currentUser = useContext(CurrentUserContext)
	let isOwn 
	if(typeof card.owner === 'object') {
		isOwn = card.owner._id === currentUser?._id
	} else {
		isOwn = card.owner === currentUser?._id
	}
	const isLiked = card.likes.some((id) => id === currentUser?._id)

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
			<img className='post__image' src={card.link} alt={card.name} />
			<div className='post__controls'>
				<h2 className='post__title'>{card.name}</h2>
				<button
					className={`post__like ${isLiked && 'post__like_active'}`}
					type='button'
					onClick={handleClickLike}
				>
					{card.likes.length}
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
