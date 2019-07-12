import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import LoginBtn from '../loginBtn/loginBtn'

import './tabbar.scss'

const list = [
  {
    text: "资产",
    iconPath: require("../../asstes/imgs/icon/asset.png"),
    selectedIconPath: require("../../asstes/imgs/icon/asset@selected.png")
  },
  {
    text: "报表",
    iconPath: require("../../asstes/imgs/icon/report.png"),
    selectedIconPath: require("../../asstes/imgs/icon/report@selected.png")
  },
  {
    iconPath: require("../../asstes/imgs/icon/bookkeeping.png"),
    selectedIconPath: require("../../asstes/imgs/icon/bookkeeping.png"),
    isSpecial: true,
    text: "记账"
  },
  {
    text: "账单",
    iconPath: require("../../asstes/imgs/icon/bill.png"),
    selectedIconPath: require("../../asstes/imgs/icon/bill@selected.png")
  },
  {
    text: "我的",
    iconPath: require("../../asstes/imgs/icon/my.png"),
    selectedIconPath: require("../../asstes/imgs/icon/my@selected.png")
  }
]



export default props => {
  const { title, onNavigator } = props

  return <View className='tabbar'>
    {
      list.map(i => (<View className='wrapper' key={i.pagePath} >
        <LoginBtn isSpecial={i.isSpecial}>
          <View className={`item ${i.isSpecial ? 'special' : ''} ${i.text === title ? 'active' : ''}`} onClick={() => onNavigator(i)}>
            <Image mode='aspectFit' src={i.text === title ? i.selectedIconPath : i.iconPath} className='img'></Image>
            <Text className='name'>{ i.text }</Text>
          </View>
        </LoginBtn>
      </View>))
    }
  </View>
}

// export default class Tabber extends Component {
//   state = {
//     list: [
//       {
//         text: "资产",
//         iconPath: require("../../asstes/imgs/icon/asset.png"),
//         selectedIconPath: require("../../asstes/imgs/icon/asset@selected.png")
//       },
//       {
//         text: "报表",
//         iconPath: require("../../asstes/imgs/icon/report.png"),
//         selectedIconPath: require("../../asstes/imgs/icon/report@selected.png")
//       },
//       {
//         iconPath: require("../../asstes/imgs/icon/bookkeeping.png"),
//         selectedIconPath: require("../../asstes/imgs/icon/bookkeeping.png"),
//         isSpecial: true,
//         text: "记账"
//       },
//       {
//         text: "账单",
//         iconPath: require("../../asstes/imgs/icon/bill.png"),
//         selectedIconPath: require("../../asstes/imgs/icon/bill@selected.png")
//       },
//       {
//         text: "我的",
//         iconPath: require("../../asstes/imgs/icon/my.png"),
//         selectedIconPath: require("../../asstes/imgs/icon/my@selected.png")
//       }
//     ]
//   }

//   static defaultProps = {
//     onNavigator: () => { }
//   }

//   navigator = path => {
//     this.props.onNavigator(path)
//     // Taro.redirectTo({
//     //   url:path
//     // })
//   }

//   render () {
//     const { title } = this.props
//     return <View className='tabbar'>
//       {
//         this.state.list.map(i => (<View className='wrapper' key={ i.pagePath } >
//           <LoginBtn isSpecial={ i.isSpecial }>
//             <View className={ `item ${i.isSpecial ? 'special' : ''} ${i.text === title ? 'active' : ''}` } onClick={ () => this.navigator(i) }>
//               <Image mode='aspectFit' src={ i.text === title ? i.selectedIconPath : i.iconPath } className='img'></Image>
//               <Text className='name'>{ i.text }</Text>
//             </View>
//           </LoginBtn>
//         </View>))
//       }
//     </View>
//   }
// }