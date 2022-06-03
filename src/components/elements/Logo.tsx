import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoDark from '../../../public/logos/petrolimex.png'

type Props = {}

const Logo = (props: Props) => {
  return (
      <Link href="/">
          <div>
              <a>
                  <Image src={LogoDark} alt="logo" />
              </a>
          </div>
      </Link>
  )
}
export default Logo