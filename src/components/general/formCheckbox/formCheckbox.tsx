interface FormCheckboxProps {
    value: boolean,
    setValue: (value: boolean) => any
}

const FormCheckbox = ({ value, setValue }: FormCheckboxProps) => {
    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-primary" checked={value} onChange={e => setValue(e.target.checked)} />
                <span className="label-text">I agree</span>
            </label>
        </div>
    )
}

export default FormCheckbox