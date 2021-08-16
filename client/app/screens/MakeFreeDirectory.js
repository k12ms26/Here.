import React, {createRef, useEffect, useState, useRef, useCallback} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
    Switch,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    Platform
} from 'react-native';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import ScreenContainer from '../components/ScreenContainer';

export const navigationRef = React.createRef();

export default function MakeFreeDirectory({route, navigation}) {
    //자유보관함이므로 type은 0
    //TODO 키워드 어떻게 받지
    const toastRef = useRef();
    const showCopyToast = useCallback(() => {
        toastRef.current.show('비어있는 필드가 있습니다.', 2000);
        console.log('완료')
      }, []);
    const [isEnabled, setIsEnabled] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [keywordData, setKeywordData] = useState([]);
    //키워드 수 만큼 press 여부를 만든다
    const [isPress, setIsPress] = useState([]);
    const [putKeywords, setPutKeywords] = useState('');
    const postCollections = () => {
        var datas = '';
        for(let i=0;i<keywordData.length;i++) {
            if(isPress[i] === true) {
                datas = datas.concat(keywordData[i].keyword_title+',')
            }
        }
        try {
            // ! localhost 로 보내면 굳이 ip 안 찾아도 됩니다~!! 확인 후 삭제해주세요 :)
            console.log(datas)
<<<<<<< HEAD
            fetch('http://localhost:3000/collections/collections_free', {
=======
            fetch('http://172.30.1.38:3000/collections/collections_free', {
>>>>>>> feature/edit-mvp
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    collection_name: collectionName,
                    collection_private: (isEnabled===true) ? 1: 0,
                    collection_keywords: datas,
                    collection_type: 1,
                })
            }).then((res) => res.text())
                .then((responsedata) => {
                    // console.log(responsedata)
                })
                .catch((err) => {
                    console.error(err)
                });

        } catch (err) {
            console.error(err);
        }
    }
    // const Keyword = ({keyword, idx, pressFunc}) => {
    const Keyword = ({keyword, idx}) => {
        return (
            <View key={idx}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                
            >
                {/* <TouchableOpacity style={styles.selectType} onPress={pressFunc}> */}
                <TouchableOpacity onPress={()=>{
                    let newArr = [...isPress];
                    if(isPress[keyword.keyword_pk-1]) {
                        newArr[keyword.keyword_pk-1] = false;
                        setIsPress(newArr);
                    } else {
                        newArr[keyword.keyword_pk-1] = true;
                        setIsPress(newArr);
                    }
                    }} style={isPress[keyword.keyword_pk-1] ? styles.selectTypeClicked : styles.selectType}>
                    <Text style={isPress[keyword.keyword_pk-1] ? styles.selectTypeTextClicked : styles.selectTypeText}>{keyword.keyword_title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const DATA = {
        collection_name: collectionName,
        collection_private: (isEnabled===true) ? 1: 0,
        collection_keywords: putKeywords,
        collection_type: 1,
    }

    const getKeywords = useCallback(() => {
        try {
    
<<<<<<< HEAD
            fetch('http://localhost:3000/keyword/keywords', {
=======
            fetch('http://172.30.1.38:3000/keyword/keywords', {
>>>>>>> feature/edit-mvp
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json())
                .then((responsedata) => {
                    setKeywordData(responsedata)
                    setFalse()
                    // console.log(keywordData)
                })
                .catch((err) => {
                    console.error(err)
                });
    
        } catch (err) {
            console.error(err);
        }
    }, []);
    //TODO 추가한 키워드들 화면 안쪽으로 쌓일 수 있도록 css 수정
    //TODO 임의로 사진 넣어준거고 실제로는 유저의 프로필 사진?? 넣어야함
    const users = [
        {
            id: '1',
            image: '../assets/images/image1',
        },
        {
            id: '2',
            key: '../assets/images/image2',
        },
        {
            id: '3',
            key: '../assets/images/image3',
        }
    ]

    const showUsers = ({item}) => (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {/* <TouchableOpacity style={styles.selectType}><Image style={styles.selectTypeText} source={item.key}></Image></TouchableOpacity> */}
        </View>
    )

    const setFalse = () => {
        var pressed = [];
        for(let i=0;i<keywordData.length;i++) {
            pressed.push(false)
        }
        setIsPress(pressed)
    }

    useEffect(() => {
        getKeywords();
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
          Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, [])
    const [showText, setShowText] = useState(true);
    const _keyboardDidShow = () => setShowText(false);
  const _keyboardDidHide = () => setShowText(true);

    function makeDir(bottom) {
        return {
            backgroundColor: ((DATA.collection_name.length >= 2) && (isPress.filter((value) => value === true).length > 0 && isPress.filter((value) => value === true).length <= 3)) ? '#7B9ACC' : '#CDD0D7',
            height: 48, borderRadius: 10, margin: 16,
            marginBottom: bottom
        }
    }

    return (
        <>
            <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})} flex={1} style={{backgroundColor:'#FCF6F5'}}>

                <View flex={1} style={{backgroundColor: '#FCF6F5'}}>
                    <View style={{paddingHorizontal: 10, backgroundColor: '#FCF6F5'}}>
                    <View flexDirection="row" style={{paddingTop: 20, alignItems: 'center', justifyContent : 'center', backgroundColor: '#FCF6F5'}}>
                    <View style={{position: 'absolute', left : 0}}>
                    <TouchableOpacity onPress={() => {navigation.setOptions({tabBarVisible: true}); navigation.goBack();}} style={{marginTop: 20}}>
                       <Image source={require('../assets/images/back-icon.png')} width={24} height={24}/>
                   </TouchableOpacity>
               </View>
               <Text style={{color: '#40516E', fontSize: 16, fontWeight: 'bold'}}>자유보관함 만들기</Text>
           </View>
            </View>
           <View style={styles.rankingContainer}>
               <View style={{marginVertical: 14}}>
                   <TextInput
                       style={{paddingHorizontal: 14, fontSize: 20,color: '#40516E', fontWeight: 'bold'}}
                       placeholder={"보관함 이름을 입력해주세요 (2~25자)"}
                       onChangeText={(name) => setCollectionName(name)}>
                   </TextInput>
               </View>
           </View>
           <View style={{marginTop: 37, left: 24}}>
               <View style={{flexDirection:'row'}}>
               <Text style={{marginVertical: 8, fontSize: 16, fontWeight: 'bold', color: '#40516E'}}>보관함 해시태그</Text>
               <Text style={{fontSize: 12, color: '#BDC2CA', alignSelf: 'center', marginLeft: 6}}>* 최대 3개</Text>
               </View>
               <View style={{
                   flexDirection: 'row',
                   marginTop: 16
               }}>
                   
                   <View flexDirection="row">
                       <Image source={require('../assets/images/add_keyword.png')} style={{width: 32, height: 32, marginEnd: 8.5}}></Image>
                       {keywordData.map((keyword, idx) => (
                           <Keyword keyword={keyword} key={idx}/>
                       ))}
                       {/*{버튼 추가 가능하도록 만들었음.}*/}
                       {/* <Keyword keyword={{keyword: '+'}} key={0} pressFunc={() => {
                           setKeywords((addedKeywords) => {
                               return [...addedKeywords, {keyword: '추가됨'}]
                           })
                       }}/> */}
                       {/* <View style={{paddingEnd: 18}}><TouchableOpacity style={styles.selectTypeIcon}><Icon type="ionicon" name={"add-outline"} size={16} style={styles.selectTypeIconDetail} ></Icon></TouchableOpacity></View> */}
                   </View>
               </View>
           </View>
           {/* <View style={{marginTop: 37, left: 24}}>
               <Text style={{marginVertical: 8, fontSize: 20, fontWeight: 'bold'}}>공동 작성자</Text>
               <View style={{flexDirection: 'row', marginTop: 16}}>
                   <SafeAreaView>
                       <FlatList data={users} renderItem={showUsers} keyExtractor={(item) => item.id}
                                 contentContainerStyle={{paddingBottom: 20}} horizontal={true}
                                 nestedScrollEnabled/>
                   </SafeAreaView>
               </View>
           </View> */}
                                                                       {/* marginBottom은 일단 퍼블리싱때문에 */}
           <View style={{marginTop: 37, left: 24, flexDirection: 'row'}}>
               <Text style={{marginVertical: 8, fontSize: 16, fontWeight: 'bold', color: '#40516E', marginEnd: '60%'}}>비공개 설정</Text>
               <Switch
                       trackColor={{false: "#CDD0D7", true: "#7B9ACC"}}
                       thumbColor={isEnabled ? "#fff" : "#fff"}
                       ios_backgroundColor="#3e3e3e"
                       onValueChange={toggleSwitch}
                       value={isEnabled}
                   />
           </View>
           {/* <View style={{marginTop: 37, left: 24}}>
               <Text style={{marginVertical: 8, fontSize: 16, fontWeight: 'bold'}}>보관함 사진</Text>
               <View style={{flexDirection: 'row', marginTop: 16}}>
               </View>
           </View> */}

       {/* </ScrollView> */}
   {/* </TouchableWithoutFeedback> */}
   </View>
           <TouchableOpacity
               testID="completed"
               style={Platform.OS === 'ios' ? makeDir('5%') : makeDir('5%')}
               onPress={() => {
                   if((DATA.collection_name.length >= 2) && (isPress.filter((value) => value === true).length > 0 && isPress.filter((value) => value === true).length <= 3)) {
                       postCollections();
                       navigation.setOptions({tabBarVisible: true});
                       navigation.goBack(null);
                       Alert.alert('', '자유보관함이 생성되었습니다')
                   }
               }}
               disabled={DATA.collection_name.length < 2 && (isPress.filter((value) => value === true).length == 0 || isPress.filter((value) => value === true).length > 3)? true : false}
           ><Text
               style={{
                   textAlign: 'center',
                   padding: 14,
                   fontSize: 16,
                   color: '#fff',
                   fontWeight: 'bold'
               }}
               >보관함 만들기</Text>
           </TouchableOpacity>
           </KeyboardAvoidingView>
        </>
    )

}

const styles = StyleSheet.create({
    selectType: {
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12,
        marginRight: 10,
<<<<<<< HEAD
        // shadowColor: '#470000',
        // shadowOffset: {width: 0, height: 10},
        // shadowOpacity: 0.2,
=======
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
>>>>>>> feature/edit-mvp
        elevation: 1,
        backgroundColor: '#fff',
        width: 58, height: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectTypeClicked: {
        borderColor: '#7B9ACC',
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12,
        marginRight: 10,
<<<<<<< HEAD
        // shadowColor: '#470000',
        // shadowOffset: {width: 0, height: 10},
        // shadowOpacity: 0.2,
=======
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
>>>>>>> feature/edit-mvp
        elevation: 1,
        backgroundColor: '#7B9ACC',
        width: 58, height: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectTypeTextClicked: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginVertical: 2
    },
    selectTypeText: {
        color: '#40516E',
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginVertical: 2
    },
    selectTypeIcon: {
        backgroundColor: 'rgb(141, 141, 141)',
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12
    },
    selectTypeIconDetail: {
        color: '#40516E',
        paddingVertical: 1,
        borderRadius: 12
    },
    rankingContainer: {
        backgroundColor: '#FCF6F5',
        width: '100%',
        marginTop: 14,
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomColor: '#F0E7E7',
        borderBottomWidth: 6,
    },
    defaultImage: {
        backgroundColor: '#c4c4c4',
        width: 287,
        height: 243,
    }
});