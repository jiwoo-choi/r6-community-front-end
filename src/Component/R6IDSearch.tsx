import { Search , SearchProps, Header, SearchResultProps, SearchCategoryProps } from 'semantic-ui-react'
import React from 'react';
import { Subject, from } from 'rxjs'


import { StoreAcceptable } from '../Util/Types';
import R6IDSearchStore from './R6IDSearchStore';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { toStream } from 'mobx-utils';
import { distinctUntilChanged, throttleTime, debounceTime } from 'rxjs/operators';
import { GENERALAPI, RANKAPI, SearchResultType } from '../Util/Entity';

interface Props extends SearchProps {
  dataClicked: (data: RANKAPI, platform: string, id : string) => void;
}

interface State {
  value : string;
}

const Result = () => {

}

//Math.random().toString(36).substr(2,11)} id={Math.random().toString(36).substr(2,11)}
const ResultRenderer = ({ title, description, rankstring } : any) => {  
  return (
    <div>
      <Header size={"medium"}> {rankstring} </Header>
      <Header.Subheader> {description} </Header.Subheader>
    </div>
  )
}

@observer
export default class R6IDSearch extends React.Component<Props & StoreAcceptable<R6IDSearchStore>> {

  // private subject = new Subject<string>();

  // constructor(props: Props & StoreAcceptable<R6IDSearchStore>){
  //   super(props);

  componentDidMount(){

    from(toStream(() => this.props.store.searchText))
    .pipe(
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(
      res => this.props.store.search(res)
    )
  }
  
    
  //   // this.subject.asObservable().pipe(
  //   //   distinctUntilChanged(),
  //   //   flatMap( (value) => {
  //   //     this.setState({value});
  //   //     return APIRequest<GENERALAPI>(value);
  //   //   }),
  //   //   catchError( (err, caught) => {
  //   //     return caught
  //   //   })
  //   // ).subscribe(
  //   //   res => console.log(res),
  //   //   err => console.log(err)
  //   // )
  // }
  

  

  render() {
      return(
        <>
          <Search
              noResultsMessage={"전적 결과가 없습니다"}
              loading={this.props.store.searchLoading}
              results={
                this.props.store.resultParsed
              }
              onResultSelect={(event, {result}) => {this.props.dataClicked(result.rankdata, result.description, this.props.store.searchText)}}
              resultRenderer={ResultRenderer}
              onSearchChange={(event, {value} )=>{ this.props.store.changeSearchText(value)}}
              placeholder={"본인의 랭크 전적을 검색하여 내용에 추가해보세요!"}
              value={this.props.store.searchText}
              {...this.props}
          ></Search>
        </>
      )
    }
}

// 
