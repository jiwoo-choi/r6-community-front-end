import { CommentDataType } from "../Component/R6Comment";
import { RANKBYREGION } from "../Util/Entity";

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


