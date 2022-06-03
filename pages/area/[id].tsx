import React from 'react'
import { useRouter } from 'next/router'
import UpdateArea from '../../src/components/area/UpdateArea'

type Props = {}

const edit = (props:any) => {
    const router = useRouter();
    let idArea:any = router.query.id;
  return (
    <div>
       <UpdateArea idArea={idArea}></UpdateArea>
    </div>
  )
}
export default edit