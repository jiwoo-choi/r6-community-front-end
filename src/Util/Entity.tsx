export interface SEASONAPI {
    season : number;
    seasonData : RANKBYREGION[];
}


function stringLiterals<T extends string>(...args: T[]): T[] { return args; }
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export const RegionTypeData = stringLiterals("ncsa", "apac", "emea", "global");
export type RegionType = ElementType<typeof RegionTypeData>;

const PlatformTypeData = stringLiterals("uplay","psn","xbl");
export type PlatformType= ElementType<typeof RegionTypeData>;



export type DataType = "generalpvp"

// 타입합치기 ReactorKit에 이쓴ㄴ것처럼.. 타입하
export interface RANKBYREGION {
    region: RegionType;
    rankStat: RANKAPI;
}

export interface ContentType {
     postId:number;
     author:string;
     title:string;
     content:string;
     viewCnt:number;
     recommendCnt:number;
     commentList:CommentType[];
     createdTime:string;
     recommend:boolean;
}

 export interface CommentType {
     commentId:number;
     username:string;
     content:string;
     childComment:CommentType[];
     createdTime:string;
}


export interface PostListType {
    meta : 
        {
            currentPage: number
            totalPage: number
        },
    postList : ListType[]
}
    
    
export interface ListType {
     postId:number;
     recommendCnt:number;
     viewCnt:number;
     createdTime:string;
     title:string;
     author:string;
     hasImg:boolean;
     notice:boolean;
     commentCnt: number;
}


export type errorMessageCode = 400 | 401 | 404 | 0 
export interface BasicErrorFormat {
    status: errorMessageCode;
    message: any;
}


export interface RANKAPI {
    maxMmr: number;
    death: number;
    rank: number;
    maxRank:number;
    kills:number;
    updateTime?: string|Date;
    abandons: number|string;
    mmr:number;
    wins:number;
    region:RegionType;
    season:number;
    losses:number;
    createdTime: string;
    /** 시즌 최고 랭크의 String 입니다. */
    maxRankString: string;
    rankString: string;
    /** 현재 랭크 기준 다음 랭크의 String 입니다. */
    nextRankString: string;
    /** 현재 랭크 기준 다음 랭크 시작 mmr 입니다. */
    nextRankMmr: number;
}

export interface GENERALAPI {
    matchLost:number,
    matchWon:number,
    matchPlayed:number,
    kills:number,
    death:number,
    penetrationKills:number,
    meleeKills:number,
    killAssists:number,
    revive:number,
    bulletHit:number,
    timePlayed:number,
    headShot:number
}

export interface PVPAPI {
    death: number,
    kills: number,
    matchLost: number,
    matchWon: number,
    matchPlayed: number,
    timePlayed: number
}

export interface PROFILEAPI {
    profileId : string
}
// export { dokkaebi,maverick,goyo,mira,montagne,ace,glaz,fuze,frost,finka,ela,echo,wamai,doc,clash,caveira,castle,capitao,oryx,iana,buck,blitz,bandit,kapkan,ash,amaru,alibi,melusi,tachanka,thatcher,thermite,kali,zofia,twitch,valkyrie,vigil,gridlock,hibana,iq,jackal,jager,kaid,lesion,blackbeard,lion,maestro,ying,smoke,mozzie,sledge,mute,rook,nomad,nokk,pulse,warden, nakk}
// export type operators = keyof typeof badges;

// export interface OPERATORAPI {
//     name:operators
//     operatorIndex: string,
//     kills: number,
//     death: number,
//     headShot: number,
//     meleeKills: number,
//     totalXp: number,
//     timePlayed: number,
//     roundWon: number,
//     roundLost: number,
//     createdTime: string
//     category: "atk" | "def"
// }
