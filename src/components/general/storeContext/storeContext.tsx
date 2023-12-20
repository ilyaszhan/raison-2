import { PropsWithChildren, createContext, useState } from "react"

interface EmailContextProps {
    email: string,
    setEmail: (value: string) => any
}

export const EmailContext = createContext<EmailContextProps>(null!)

const StoreContext = ({ children }: PropsWithChildren) => {
    const [email, setEmail] = useState('')

    return (
        <EmailContext.Provider value={{
            email,
            setEmail
        }}>
            {children}
        </EmailContext.Provider>
    )
}

export default StoreContext