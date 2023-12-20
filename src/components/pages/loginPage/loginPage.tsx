import { useContext, useEffect, useMemo, useRef, useState } from "react"
import FormInput from "../../general/formInput/formInput"
import FormCheckbox from "../../general/formCheckbox/formCheckbox"
import { ValidateEmail } from "../../../utils/validate"
import { LoginButtonHoldDelay } from "../../../config/loginConfig"
import { EmailContext } from "../../general/storeContext/storeContext"
import { useHistory } from "react-router"

const LoginPage = () => {
    const { email, setEmail } = useContext(EmailContext)
    const [disabled, setDisabled] = useState(true)
    const [emailText, setEmailText] = useState(email)
    const [emailError, setEmailError] = useState(false)
    const [agree, setAgree] = useState(false)
    const history = useHistory()

    let timer: ReturnType<typeof setTimeout>
    let holdStart = 0
    let holdEnd = 0

    const onEmailTextChange = (value: string) => {
        setEmailText(value)
        setEmailError(!ValidateEmail(value))
    }

    useEffect(() => {
        setDisabled(!emailText || emailError || !agree)
    }, [agree, emailError, emailText])

    const onButtonHoldDone = () => {
        setEmail(emailText.trim())
        history.push('/login/step-2')
    }

    const onButtonHold = () => {
        const now = new Date().getTime()
        const timerTime = Math.min(now - holdEnd, LoginButtonHoldDelay)

        clearTimeout(timer)

        timer = setTimeout(onButtonHoldDone, timerTime)

        holdStart = now
    }

    const onButtonRelease = () => {
        const now = new Date().getTime()

        clearTimeout(timer)
        holdEnd = now
    }

    useEffect(() => {
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <>
            <FormInput
                value={emailText}
                setValue={onEmailTextChange}
                hasError={emailError}
            />
            <div className="p-1"></div>
            <FormCheckbox
                value={agree}
                setValue={setAgree}
            />
            <button disabled={disabled} className="btn btn-primary mt-auto" onMouseDown={onButtonHold} onMouseUp={onButtonRelease}>Hold to proceed</button>
        </>
    )
}

export default LoginPage