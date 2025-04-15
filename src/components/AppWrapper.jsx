import { SafeAreaView } from 'react-native'

const AppWrapper = ({children}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        {children}
    </SafeAreaView>
  )
}

export default AppWrapper