import { useContext, useEffect, useState } from "react"
import FormInput from "../../general/formInput/formInput"
import { FormContext } from "../../general/storeContext/storeContext"
import { useHistory, useLocation } from "react-router"
import RequestController from "../../../controllers/requestController"
import Popup from "../../general/popup/popup"

const ConfirmPage = () => {
    const history = useHistory()
    const { search } = useLocation()
    const { email } = useContext(FormContext)
    const [popupText, setPopupText] = useState('')
    const [isPopupSuccess, setIsPopupSuccess] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)

    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        const status = searchParams.get('status')

        switch (status) {
            case 'success':
                setPopupText('Success')
                setIsPopupSuccess(true)
                setShowPopup(true)
                break
            case 'error':
                setPopupText('Error')
                setIsPopupSuccess(false)
                setShowPopup(true)
                break
            default:
                setPopupText('')
                setIsPopupSuccess(false)
                setShowPopup(false)
                break
        }
    }, [search])

    const onBack = () => {
        history.push('/login/step-1')
    }

    const onSend = async () => {
        setDisableButtons(true)

        const send = await RequestController.sendEmail(email)

        if (send) {
            history.push('/login/step-2?status=success')
        } else {
            history.push('/login/step-1?status=error')
        }

        setDisableButtons(false)
    }

    return (
        <>
            <FormInput
                value={email}
                disabled
            />
            <div className="mt-auto grid grid-cols-2 gap-4">
                <button className="btn btn-neutral" onClick={onBack} disabled={disableButtons}>Back</button>
                <button className="btn btn-primary" onClick={onSend} disabled={disableButtons}>Confirm</button>
            </div>
            {showPopup ? <Popup text={popupText} status={isPopupSuccess ? 'success' : 'error'} /> : null}
        </>
    )
}

export default ConfirmPage