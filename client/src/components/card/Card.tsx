import Typography from "@mui/material/Typography"
import { IFormData } from "../../App"
import "./card.style.css"

export interface ICard {
  data: IFormData
}

const CardItem: React.FC<ICard> = ({ data }) => {
  return (
    <div className="card_block">
      <h2>{data?.email}</h2>
      <p>{data?.number}</p>
    </div>
  )
}
export default CardItem
