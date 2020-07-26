import React from 'react';
import * as rankicons from './@rank-icons'

export type RankType = keyof typeof rankicons;
export const rankIconTypes: RankType[] = Object.keys(rankicons) as any[];

export type R6RankIconProps = {
    /** 랭크 타입 */
    rank: string;
    /** 아이콘 사이즈 */
    size?: number;
    /** 랭크아이콘 다음이나 이전의 아이콘을 조회하기 위한 값 */
    forward?: number
};


//export => import string.

const R6RankIcon = ({ rank, size }: R6RankIconProps) => {
    
    //이제 rank에 들어오는 string은  받을 수 있습니다. 다만 확실하지 않을경우 
    try {
        let parsableRankString = rank.replace(" ", "_") as RankType;
        const src = rankicons[parsableRankString];
        return  <img src={src} alt={"rank"} style={{width:size, height:'auto'}}/>
    } catch {
        return <div style={{width:size, height:size}}></div>
    }  
}

R6RankIcon.defaultProps = {
    size : 20
}

export default R6RankIcon;
  