import postsArr from '../../sampleData'
import './home.css'
import Topbar from '../../components/topbar/topbar'
import Feed from '../../components/feed/feed'

export default function Home() {

     return (
          <div className="home">
               <Topbar/>
               <Feed postsArray={postsArr} />
          </div>
     )
}