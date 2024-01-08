import profileImg from './assets/kalai_2.jpg'

// import profileImage from './assets/kalai_1.jpg'
import profileImage from './assets/catX.jfif'
import contentImg2 from './assets/cat.jpg'
import pic1 from './assets/pic1.jpg'
import pic2 from './assets/pic2.jpg'
import pic3 from './assets/pic3.jpg'
import pic4 from './assets/pic4.jpg'

import contentVid1 from './assets/sampleVideo.mp4'
import vid1 from './assets/vid1.mp4'
import vid2 from './assets/vid2.mp4'
import vid3 from './assets/vid3.mp4'

// ------------------------------------

import img1 from './assets/UserPosts/img1.jpg'
import img1Thumb from './assets/UserPosts/img1-thumb.jpg'
import img2 from './assets/UserPosts/img2.jpg'
import img2Thumb from './assets/UserPosts/img2-thumb.jpg'
import img3 from './assets/UserPosts/img3.jpg'
import img3Thumb from './assets/UserPosts/img3-thumb.jpg'
import img4 from './assets/UserPosts/img4.jpg'
import img4Thumb from './assets/UserPosts/img4-thumb.jpg'
import img5 from './assets/UserPosts/img5.jpg'
import img5Thumb from './assets/UserPosts/img5-thumb.jpg'
import img6 from './assets/UserPosts/img6.jpg'
import img6Thumb from './assets/UserPosts/img6-thumb.jpg'
import img7 from './assets/UserPosts/img7.jpg'
import img7Thumb from './assets/UserPosts/img7-thumb.jpg'
import img8 from './assets/UserPosts/img8.jpg'
import img8Thumb from './assets/UserPosts/img8-thumb.jpg'
import img9 from './assets/UserPosts/img9.jpg'
import img9Thumb from './assets/UserPosts/img9-thumb.jpg'
import img10 from './assets/UserPosts/img10.jpg'
import img10Thumb from './assets/UserPosts/img10-thumb.jpg'

// ------------------------------------



let post = {
     postID:1,
     profile:{
          profileId:"d3adm3a7",
          name:"Kalai",
          description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, possimus?",
          thumbnail:profileImg,
          profileImage: profileImage,
          postsCount:10,
          followers:100,
          following:200
     },
     content:{
          type:"image",
          image:contentImg2,
          video:null,
          postedTime:316463400000,  // new Date("12 Jan 1980").getTime()
          description: "cute cats, subscribe to watch more!"
     },
     contentResponse:{
          likesCount:3,
          likesBy:[
               {
                    profileId:1002,
                    name:"Tom",
                    thumbnail:null
               },
               {
                    profileId:1003,
                    name:"Jerry",
                    thumbnail:null
               },
               {
                    profileId:1003,
                    name:"Oggy",
                    thumbnail:null
               }
          ], 
          commentsCount:2,
          comments:[
               {
                    commentId:"COMMENT-1",
                    commentType:"PARENT",
                    profileId:1002,
                    thumbnail:null,
                    comment:"Hello World!",
                    likeCount:1,
                    replyCount:0,
                    replies:[]
               },
               {
                    commentId:"COMMENT-2",
                    commentType:"PARENT",
                    profileId:1003,
                    thumbnail:null,
                    comment:"Foo Bar",
                    likeCount:2,
                    replyCount:1,
                    replies:[
                         {
                              commentId:"COMMENT-3",
                              commentType:"CHILD",
                              profileId:1003,
                              thumbnail:null,
                              comment:"Foo Bar",
                              likeCount:2,
                         }         
                    ]
               }
          ]
     }
}

let post2 = structuredClone(post)
post2.postID=2
post2.content.type="video"
post2.content.image=null
post2.content.video=contentVid1
post2.content.description="oh my god, its sooo cute"

let post3 = structuredClone(post)
post2.postID=3
post3.content.type="image"
post3.content.image=pic1
post3.content.video=null
post3.content.description="oh my god, its sooo cute"

let post4 = structuredClone(post)
post4.content.type="video"
post4.content.image=null
post4.content.video=vid1
post4.content.description="oh my god, its sooo cute"

let post5 = structuredClone(post)
post5.content.type="image"
post5.content.image=pic2
post5.content.video=null
post5.content.description="oh my god, its sooo cute"

let post6 = structuredClone(post)
post6.content.type="video"
post6.content.image=null
post6.content.video=vid2
post6.content.description="oh my god, its sooo cute"

let post7 = structuredClone(post)
post7.content.type="image"
post7.content.image=pic3
post7.content.video=null
post7.content.description="oh my god, its sooo cute"

let post8 = structuredClone(post)
post8.content.type="video"
post8.content.image=null
post8.content.video=vid3
post8.content.description="oh my god, its sooo cute"

let post9 = structuredClone(post)
post9.content.type="image"
post9.content.image=pic4
post9.content.video=null
post9.content.description="oh my god, its sooo cute"

let arr = [post9, post8, post, post2, post3, post4, post5, post6, post7];
export default arr;

// --------------------------------------------------------



let userPost1={
     postID:1,
     type:"image",
     thumbnail:img1Thumb,
     image:img1,
     video:null,
     likesCount:3,
     commentsCount:5,
     profile:{
          profileId:"d3adm3a7",
          thumbnail:profileImg,
     },
     content:{
          type:"image",
          image:contentImg2,
          video:null,
          postedTime:316463400000,  // new Date("12 Jan 1980").getTime()
          description: "cute cats, subscribe to watch more!"
     },
     contentResponse:{
          likesCount:3,
          likesBy:[
               {
                    profileId:1002,
                    name:"Tom",
                    thumbnail:null
               },
               {
                    profileId:1003,
                    name:"Jerry",
                    thumbnail:null
               },
               {
                    profileId:1003,
                    name:"Oggy",
                    thumbnail:null
               }
          ], 
          commentsCount:2,
          comments:[
               {
                    commentId:"COMMENT-1",
                    commentType:"PARENT",
                    profileId:1002,
                    thumbnail:null,
                    comment:"Hello World!",
                    likeCount:1,
                    replyCount:0,
                    replies:[]
               },
               {
                    commentId:"COMMENT-2",
                    commentType:"PARENT",
                    profileId:1003,
                    thumbnail:null,
                    comment:"Foo Bar",
                    likeCount:2,
                    replyCount:1,
                    replies:[
                         {
                              commentId:"COMMENT-3",
                              commentType:"CHILD",
                              profileId:1003,
                              thumbnail:null,
                              comment:"Foo Bar",
                              likeCount:2,
                         }         
                    ]
               }
          ]
     }
}

let userPost2=structuredClone(userPost1)
userPost2.postID=2
userPost2.image=img2
userPost2.thumbnail=img2Thumb

let userPost3=structuredClone(userPost1)
userPost3.postID=3
userPost3.image=img3
userPost3.thumbnail=img3Thumb

let userPost4=structuredClone(userPost1)
userPost4.postID=4
userPost4.image=img4
userPost4.thumbnail=img4Thumb

let userPost5=structuredClone(userPost1)
userPost5.postID=5
userPost5.image=img5
userPost5.thumbnail=img5Thumb 

let userPost6=structuredClone(userPost1)
userPost6.postID=6
userPost6.image=img6
userPost6.thumbnail=img6Thumb

let userPost7=structuredClone(userPost1)
userPost7.postID=7
userPost7.image=img7
userPost7.thumbnail=img7Thumb

let userPost8=structuredClone(userPost1)
userPost8.postID=8
userPost8.image=img8
userPost8.thumbnail=img8Thumb

let userPost9=structuredClone(userPost1)
userPost9.postID=9
userPost9.image=img9
userPost9.thumbnail=img9Thumb

let userPost10=structuredClone(userPost1)
userPost10.postID=10
userPost10.image=img10
userPost10.thumbnail=img10Thumb


let UserPosts = [userPost1, userPost2, userPost3, userPost4, userPost5, userPost6, userPost7, userPost8, userPost9, userPost10]
let SavedPosts = [userPost5, userPost10, userPost7, userPost9] 
export {UserPosts, SavedPosts}