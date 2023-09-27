import "./styles/productstyle.css"

const Message = (props) => {
  return (
    <div className="attr">
      <div style={{
        margin:"10px",
        fontSize:"18px",
      }}>{props.message}</div>
    </div>
  )
}
export default Message;