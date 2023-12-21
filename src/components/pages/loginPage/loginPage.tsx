import { useContext, useEffect, useRef, useState } from "react"
import FormInput from "../../general/formInput/formInput"
import FormCheckbox from "../../general/formCheckbox/formCheckbox"
import { ValidateEmail } from "../../../utils/validate"
import { LoginButtonDefaultText, LoginButtonHoldDelay } from "../../../config/loginConfig"
import { FormContext } from "../../general/storeContext/storeContext"
import { useHistory } from "react-router"

const LoginPage = () => {
    const { email, setEmail, agree, setAgree } = useContext(FormContext)
    const [disabled, setDisabled] = useState(true)
    const [emailError, setEmailError] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null!)
    const history = useHistory()

    let timer: ReturnType<typeof setTimeout>
    let interval: ReturnType<typeof setInterval>
    let holdStart = 0
    let holdEnd = 0

    const onEmailTextChange = (value: string) => {
        const isValid = ValidateEmail(value)
        setEmail(value)
        setEmailError(!isValid)

        if (isValid)
            sessionStorage.setItem('email', value.trim())
    }

    useEffect(() => {
        setDisabled(!email || emailError || !agree)
    }, [agree, emailError, email])

    const setButtonText = (text: string) => {
        if (buttonRef.current) {
            buttonRef.current.innerText = text
        }
    }

    const resetTimers = () => {
        setButtonText(LoginButtonDefaultText)
        clearTimeout(timer)
        clearInterval(interval)
    }

    const onButtonHoldDone = () => {
        resetTimers()
        setEmail(email.trim())
        history.push('/login/step-2')
    }

    const onButtonHold = () => {
        const holdStartTime = new Date().getTime()
        const timerTime = Math.min(holdStartTime - holdEnd, LoginButtonHoldDelay)

        resetTimers()

        timer = setTimeout(onButtonHoldDone, timerTime)
        interval = setInterval(() => {
            const now = new Date().getTime()
            setButtonText(String(LoginButtonHoldDelay - Math.max(0, timerTime - (now - holdStartTime))))
        }, 10)

        holdStart = holdStartTime
    }

    const onButtonRelease = () => {
        const now = new Date().getTime()

        resetTimers()
        holdEnd = now
    }

    useEffect(() => {
        return () => {
            resetTimers()
        }
    }, [])

    return (
        <>
            <FormInput
                value={email}
                setValue={onEmailTextChange}
                hasError={emailError}
            />
            <div className="p-1"></div>
            <FormCheckbox
                value={agree}
                setValue={setAgree}
            />
            <button
                disabled={disabled}
                className="btn btn-primary mt-auto"
                onMouseDown={onButtonHold}
                onMouseUp={onButtonRelease}
                ref={buttonRef}
            >{LoginButtonDefaultText}</button>
        </>
    )
}

export default LoginPage