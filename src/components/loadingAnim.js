import { TrinitySpinner } from "loading-animations-react"

export default function Loading(){
    return (
        <div style={{display:"grid",justifyContent:"center",alignItems:"center",margin:"auto",height:"fit-content"}}>
                    <div style={{ height: "200px", width: "200px",padding:"50px"}}>
                        <TrinitySpinner color="#202124" text="" />
                    </div>
                </div>
    )
}