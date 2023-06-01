import React, {useContext} from 'react';
import {InfoTooltipTypes} from "../utils/constants";
import {AppContext} from "../contexts/AppContext";

export default function InfoTooltip({isOpen, type}) {

	const { closeAllPopups } = useContext(AppContext)

	const onClose = () => closeAllPopups()

	const getIconClassName = () => {
		switch (type) {
			case InfoTooltipTypes.Success:
				return 'info-tooltip__icon_type_success'
			case InfoTooltipTypes.Error:
				return 'info-tooltip__icon_type_error'
			default:
				return ''
		}
	}

	const getText = () => {
		switch (type) {
			case InfoTooltipTypes.Success:
				return 'Вы успешно зарегистрировались!'
			case InfoTooltipTypes.Error:
				return 'Что-то пошло не так! Попробуйте ещё раз.'
			default:
				return ''
		}
	}

	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className='popup__container'>
				<button className='popup__close-btn' type='button' onClick={onClose} />
				<div className="info-tooltip">
					<div className={`info-tooltip__icon ${getIconClassName()}`}></div>
					<div className="info-tooltip__text">{getText()}</div>
				</div>
			</div>
		</div>
	);
};