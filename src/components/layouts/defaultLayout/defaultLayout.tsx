import { PropsWithChildren } from "react"
import { BrowserRouter } from "react-router-dom"
import StoreContext from "../../general/storeContext/storeContext"

const DefaultLayout = ({ children }: PropsWithChildren) => {
    return (
        <StoreContext>
            <BrowserRouter>
                <header className="h-20 bg-primary flex items-center p-4">
                    <h1 className="text-3xl text-black">Title</h1>
                </header>
                <main className="flex flex-col p-4 h-full">
                    {children}
                </main>
            </BrowserRouter>
        </StoreContext>
    )
}

export default DefaultLayout