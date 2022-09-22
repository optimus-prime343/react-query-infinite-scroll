import { ClipLoader } from 'react-spinners'
import style from './full-page-loader.module.css'

export const FullPageLoader = () => {
  return (
    <div className={style.container}>
      <ClipLoader size={100} color='#000' />
    </div>
  )
}
