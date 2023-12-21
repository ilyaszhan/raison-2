interface PopupProps {
    text: string,
    status: 'success' | 'error'
}

const Popup = ({ text, status }: PopupProps) => {
    return (
        <div className="toast toast-top toast-center">
            <div className={`alert alert-${status}`}>
                <span>{text}</span>
            </div>
        </div>
    )
}

export default Popup