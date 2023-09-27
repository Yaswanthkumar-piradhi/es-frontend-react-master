export default function AccountCard(props) {
  return (
    <div style={{
      // width: "100vw",
      // backgroundColor: "#fff000",
      height: "fit-content",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      // maxWidth:"800px"
    }}>
      <div style={style.cardCont}>
        <div style={style.txt}>
          <b>Name : </b>{props.name}
        </div>
        <div style={style.txt}>
          <b>Phone : </b>{props.phone}
        </div>
      </div>
    </div>
  )
}

const style = {
  cardCont:{
    margin:"10px",
    width:"95%",
    borderRadius:"10px",
    border:"1px solid #808080",
    boxShadow:"1px 1px 10px 1px #00000080",
    maxWidth:"800px",
  },
  txt:{
    borderBottom:"1px solid #808080",
    padding:"20px",
    fontSize:"20px",
  }
}
