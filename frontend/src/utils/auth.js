class Auth {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl
		this._headers = headers
	}

	_handleResponse(result) {
		return result.ok
			? result.json()
			: Promise.reject(`Ошибка! Код: ${result.status}`)
	}

	signUp(password, email) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ password, email }),
		}).then(result => this._handleResponse(result))
	}

	signIn(password, email) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ password, email }),
		}).then(result => this._handleResponse(result))
	}

	checkToken(jwt) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				...this._headers,
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			},
		}).then((result) => this._handleResponse(result))
	}
}

const instance = new Auth({
	baseUrl: 'https://api.mesto.davinchi59.nomo.nomoredomains.rocks',
	headers: {
		'Content-Type': 'application/json',
	},
})

export default instance