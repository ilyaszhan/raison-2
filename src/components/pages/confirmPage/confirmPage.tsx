import { useContext, useEffect, useState } from "react"
import FormInput from "../../general/formInput/formInput"
import { EmailContext } from "../../general/storeContext/storeContext"
import { useHistory, useLocation, useParams } from "react-router"
import RequestController from "../../../controllers/requestController"

interface PageParamps {
    status?: string
}

const ConfirmPage = () => {
    const history = useHistory()
    const { search } = useLocation()
    const { email } = useContext(EmailContext)
    const [toastText, setToastText] = useState('')
    const [isToastSuccess, setIsToastSuccess] = useState(false)
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        const status = searchParams.get('status')

        switch (status) {
            case 'success':
                setToastText('Success')
                setIsToastSuccess(true)
                setShowToast(true)
                break
            case 'error':
                setToastText('Error')
                setIsToastSuccess(false)
                setShowToast(true)
                break
            default:
                setToastText('')
                setIsToastSuccess(false)
                setShowToast(false)
                break
        }
    }, [search])

    const onBack = () => {
        history.push('/login/step-1')
    }

    const onSend = async () => {
        const data = await RequestController.sendEmail(email)
        console.log(data)
    }

    return (
        <>
            <FormInput
                value={email}
                disabled
            />
            <div className="mt-auto grid grid-cols-2 gap-4">
                <button className="btn btn-neutral" onClick={onBack}>Back</button>
                <button className="btn btn-primary" onClick={onSend}>Confirm</button>
            </div>
            {
                showToast
                    ? (
                        <div className="toast toast-top toast-center">
                            <div className={`alert ${isToastSuccess ? 'alert-success' : 'alert-error'}`}>
                                <span>{toastText}</span>
                            </div>
                        </div>
                    )
                    : null
            }
        </>
    )
}

export default ConfirmPage