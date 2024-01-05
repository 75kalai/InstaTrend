import Post from '../../components/post/post';

export default function Feed( props ){

     let { postsArray, getMorePosts } = props

     return (
          <div className="feed">
               {postsArray.map((postObj) => {
                    return (
                         <Post post={postObj} key={crypto.randomUUID()} />
                    )
               })}
          </div>
     )
} 