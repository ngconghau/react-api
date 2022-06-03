import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Container } from 'reactstrap'
import { State } from '../../redux/reducers'
import LoadingFetch from '../elements/LoadingFetch'
import Header from '../Header'
import Sidebar from '../SideBar'

type Props = { children: React.ReactNode }

const MainLayout = ({ children }: Props) => {
  const [open, setOpen] = React.useState(false)
  const loading = useSelector( (state:State) => state.loadingReducer)


  const showMobilemenu = () => {
    setOpen(!open)
  }

  return (
    <div>
      <main>
        <div className="pageWrapper d-md-block d-lg-flex">
          {/******** Sidebar **********/}
          <aside
            className={`sidebarArea shadow bg-white ${
              !open ? '' : 'showSidebar'
            }`}
          >
            <Sidebar showMobilemenu={showMobilemenu} />
          </aside>
          {/********Content Area**********/}

          <div className="contentArea">
            {/********header**********/}
            <Header showMobmenu={showMobilemenu} />

            {/********Middle Content**********/}
            <div className="wrapper-content">
              {loading.isLoading && <LoadingFetch />}
              <Container className="p-4 wrapper" fluid>
                <div>{children}</div>
              </Container>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainLayout
