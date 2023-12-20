interface FormInputProps {
    value?: string,
    hasError?: boolean,
    disabled?: boolean,
    setValue?: (value: string) => any
}

const FormInput = ({ hasError = false, value = '', disabled = false, setValue }: FormInputProps) => {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input
                type="text"
                placeholder="Type here"
                disabled={disabled}
                className="input"
                value={value}
                onChange={e => setValue ? setValue(e.target.value) : null}
            />
            {
                hasError
                    ? (
                        <div className="label">
                            <span className="label-text-alt">Fill in the field correctly</span>
                        </div>
                    )
                    : null

            }
        </label>
    )
}

export default FormInput