const Button = (props) => {
    return (
        <button 
        onClick={props.onClick}
        style={{
            border: "none",
            borderRadius: "10px",
            padding: "10px",
            width: `${props.width}`,
            boxSizing: "border-box",
            margin: `${props.margin}`,
            backgroundColor: `${props.color}`,
            boxShadow: `0px 0px 8px 1px ${props.color}90`,
            color:props.textColor,
            cursor:"pointer"
        }}>{props.title}</button>

    )
}

export default Button