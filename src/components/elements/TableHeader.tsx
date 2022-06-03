import React from 'react'

type Props = {
  theader: any
}

const TableHeader = ({ theader }: Props) => {
  return (
    <thead>
      <tr>
        {Object.keys(theader).map((el, index) => (
          <th style={{textTransform:"uppercase"}} key={index}>{el}</th>
        ))}
        <th style={{textTransform:"uppercase"}}>Actions</th>
      </tr>
    </thead>
  )
}

export default TableHeader
