import { PropsWithChildren } from 'react'

export default function Errormessage({children} : PropsWithChildren) {
  return (
    <div className='text-center bg-red-600 text-white font-bold p-3 uppercase my-3 '>
      {children}
    </div>
  )
}
