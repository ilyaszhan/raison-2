import { PropsWithChildren, createContext, useState } from "react"

interface FormContextProps {
    email: string,
    setEmail: (value: string) => any,
    agree: boolean,
    setAgree: (value: boolean) => any,
}

export const FormContext = createContext<FormContextProps>(null!)

const StoreContext = ({ children }: PropsWithChildren) => {
    const [email, setEmail] = useState(sessionStorage.getItem('email') || '')
    const [agree, setAgree] = useState(false)

    return (
        <FormContext.Provider value={{
            email,
            setEmail,
            agree,
            setAgree
        }}>
            {children}
        </FormContext.Provider>
    )
}

export default StoreContext