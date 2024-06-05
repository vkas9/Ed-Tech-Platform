const ButtonUse=({
    onClick,
    type,
    className,
    children,
    text,
    disabled,
})=>{
    return (
        <button
            disabled={disabled}
            onClick={onClick} type={type}
            className={className}>
            {
                children?<><span>{text}</span> {children}</> :text
            }
        </button>
    );
}
export default ButtonUse;