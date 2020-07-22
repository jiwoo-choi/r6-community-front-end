import { CommentDataType } from "../Component/R6Comment";
import { RANKBYREGION, ListType, ContentType } from "../Util/Entity";

export const commentMockup : CommentDataType[] = [
    {
        id:"안녕",
        content: "반가워요",
        meta: "어제 2시"
    },
    {
        id:"와우",
        content: "진짜요? 바로 갑니다",
        meta: "2015-05-01"
    },
    {
        id:"사실?",
        content: "사실임??",
        meta: "어제 2시"
    },

]
    
export const searchResultMockUp : RANKBYREGION[]  =  [
    {
        region: "global",
        rankStat: {
            "maxMmr": 0,
            "death": 0,
            "rank": 0,
            "maxRank": 0,
            "kills": 0,
            "abandons": 0,
            "mmr": 2500,
            "wins": 0,
            "region": "ncsa",
            "season": 17,
            "losses": 0,
            "createdTime": "2020-05-19T18:19:30.0502837",
            "maxRankString": "UNRANK",
            "rankString": "UNRANK",
            nextRankMmr : 100,
            nextRankString : "ABC",                
        }
    }
]



export const listResultMockup : ListType[] = 
    [
        {
            "postId": 1,
            "recommendCnt": 0, // 추천 수
            "viewCnt": 2, // 
            "createdTime": "2020-01-01T00:00:00", // 올린 시간 
            "title": "공지입니다", // 제목
            "author": "test1", // 글쓴 아이디
            "hasImg": true, // 이미지가 존재하는지
            "notice": true // 글이 공지사항인지
        },
        {
            "postId": 2,
            "recommendCnt": 0,
            "viewCnt": 0,
            "createdTime": "2020-01-01T00:00:00",
            "title": "title1",
            "author": "test1",
            "hasImg": true,
            "notice": false
        }
    ]




export const postResultMockup : ContentType = 
{
    "postId": 2,
    "author": "user1",
    "title": "title1",
    "content": "conetne1",
    "viewCnt": 0,
    "recommendCnt": 0,
    "commentList": [
        {
            "commentId": 1,
            "username": "user2",
            "content": "댓글입니다",
            "childComment": [
                {
                    "commentId": 2,
                    "username": "user1",
                    "content": "대댓글입니다",
                    "childComment": [],
                    "createdTime": "2020-01-01T00:00:00"
                },
                {
                    "commentId": 3,
                    "username": "user2",
                    "content": "대대ㅡㅅ글입니다",
                    "childComment": [],
                    "createdTime": "2020-01-01T00:00:00"
                }
            ],
            "createdTime": "2020-01-01T00:00:00"
        },
        {
            "commentId": 4,
            "username": "user1",
            "content": "새로운 댓글입니다",
            "childComment": [],
            "createdTime": "2020-01-01T00:00:00"
        }
    ],
    "createdTime": "2020-01-01T00:00:00",
    "recommend": false // 로그인한 사용자가 추천을 눌렀으면 true 
}



