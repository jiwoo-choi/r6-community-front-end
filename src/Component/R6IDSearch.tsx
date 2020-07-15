import { Search , SearchProps } from 'semantic-ui-react'
import React from 'react';
import {Subject} from 'rxjs'
import {distinctUntilChanged, debounceTime, debounce, throttleTime, throttle, flatMap} from 'rxjs/operators'
import { APIRequest } from '../Util/R6StatAPIRequest';
import { RANKAPI,GENERALAPI } from '../Util/Entity';

interface Props extends SearchProps {
}

interface State {
  value : string;
}

export default class R6IDSearch extends React.Component<Props, State> {

  private subject = new Subject<string>();

  constructor(props: Props){
    super(props);

    this.state = {
      value : ""
    }

    this.subject.asObservable().pipe(
      throttleTime(100),
      distinctUntilChanged(),
      flatMap( (value) => {
        return APIRequest<GENERALAPI>(value);
      })
    ).subscribe(
      res => console.log(res)
    )


  }

  render() {
      return(
        <>
          <Search
              onSearchChange={(event, {value} )=>{this.subject.next(value)}}
              placeholder={"아이디를 입력해주세요"}
              value={this.state.value}
              {...this.props}
          ></Search>
        </>
      )
    }
}


// {
//     "isLoading": false,
//     "results": {
//       "capacitor": {
//         "name": "capacitor",
//         "results": [
//           {
//             "title": "Ernser and Sons",
//             "description": "Grass-roots 3rd generation concept",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/renbyrd/128.jpg",
//             "price": "$95.52"
//           },
//           {
//             "title": "Bins, Braun and Franecki",
//             "description": "User-friendly actuating hardware",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/yayteejay/128.jpg",
//             "price": "$37.11"
//           },
//           {
//             "title": "Corkery and Sons",
//             "description": "Organized holistic access",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/gojeanyn/128.jpg",
//             "price": "$4.38"
//           },
//           {
//             "title": "Bahringer Inc",
//             "description": "Adaptive tangible paradigm",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg",
//             "price": "$58.57"
//           }
//         ]
//       },
//       "array": {
//         "name": "array",
//         "results": [
//           {
//             "title": "Botsford, Brakus and Feil",
//             "description": "Devolved tangible customer loyalty",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/marcomano_/128.jpg",
//             "price": "$45.41"
//           }
//         ]
//       },
//       "microchip": {
//         "name": "microchip",
//         "results": [
//           {
//             "title": "Connelly, Tillman and Leuschke",
//             "description": "Optimized didactic intranet",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/2fockus/128.jpg",
//             "price": "$79.68"
//           },
//           {
//             "title": "Baumbach - Luettgen",
//             "description": "User-friendly client-driven throughput",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/omnizya/128.jpg",
//             "price": "$54.44"
//           },
//           {
//             "title": "Blanda, Hickle and Satterfield",
//             "description": "Compatible human-resource productivity",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/cloudstudio/128.jpg",
//             "price": "$74.64"
//           },
//           {
//             "title": "Flatley, O'Conner and Hudson",
//             "description": "Business-focused multi-tasking initiative",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/nastya_mane/128.jpg",
//             "price": "$67.30"
//           },
//           {
//             "title": "Hoppe, Parisian and Little",
//             "description": "Multi-channelled coherent firmware",
//             "image": "https://s3.amazonaws.com/uifaces/faces/twitter/juangomezw/128.jpg",
//             "price": "$57.86"
//           }
//         ]
//       }
//     },
//     "value": "a"
//   }
  