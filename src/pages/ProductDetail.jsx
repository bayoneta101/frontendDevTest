import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}
