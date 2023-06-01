import { useEffect } from "react";
import {KEYS} from "../utils/constants";

export default function usePopupClose(isOpen, closePopup) {
	useEffect(() => {
		if (!isOpen) return;

		const handleOverlay = (event) => {
			if (!event.target.classList.contains("popup_opened")) return
			closePopup();
		};

		const handleEscape = ({ keyCode }) => {
			if (keyCode !== KEYS.Esc) return
			closePopup();
		};

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("mousedown", handleOverlay);

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("mousedown", handleOverlay);
		};
	}, [isOpen, closePopup]);
}