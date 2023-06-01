class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl
		this._headers = headers
	}

	_handleResponse(result) {
		return result.ok
			? result.json()
			: Promise.reject(`Ошибка! Код: ${result.status}`)
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then(this._handleResponse)
	}

	addCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		}).then(this._handleResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		}).then(this._handleResponse)
	}

	_addCardLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._headers,
		}).then(this._handleResponse)
	}

	_deleteCardLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		}).then(this._handleResponse)
	}

	toggleCardLike(cardId, likeState) {
		if (likeState) return this._addCardLike(cardId)
		else return this._deleteCardLike(cardId)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then(this._handleResponse)
	}

	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({ name, about }),
		}).then(this._handleResponse)
	}

	setUserAvatar(imageUrl) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({ avatar: imageUrl }),
		}).then(this._handleResponse)
	}
}

const instance = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
	headers: {
		authorization: 'e32193da-5eae-4794-b26e-ef37bd7713ab',
		'Content-Type': 'application/json',
	},
})

export default instance
