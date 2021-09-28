import {useTheme} from '@react-navigation/native';
import {Dimensions, FlatList, Image, SafeAreaView, ScrollView,
    StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppText from '../../components/AppText';
import {Icon} from 'react-native-elements';
import ScreenContainer from '../../components/ScreenContainer';
import ScreenContainerView from '../../components/ScreenContainerView';
import { useToken } from '../../contexts/TokenContextProvider';
import { useIsFocused } from '@react-navigation/native';

const PlaceTab = ({navigation}) => {
    const {colors} = useTheme();
    const [token, setToken] = useToken();
    const isFocused = useIsFocused();

    const [placeList, setPlaceList] = useState({});
    const [collectionList, setCollectionList] = useState({});
    const [directoryType, setDirectoryType] = useState([
        {
            name: '공간',
            isClicked: true
        },
        {
            name: '보관함',
            isClicked: false
        }
    ]);
    const [currentRendering, setCurrentRendering] = useState(0);


    useEffect(() => {
        getLikedPlace();
        getLikedCollection();
    }, [isFocused]);
    
    const getLikedPlace = () => {
        try {
            fetch('http://localhost:3000/like/placeList', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then((response) => {
                    setPlaceList(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });
    
        } catch (err) {
            console.error(err);
        }
    };

    const getLikedCollection = () => {
        try {
            fetch('http://localhost:3000/like/collectionList', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            }).then((res) => res.json())
                .then((response) => {
                    setCollectionList(response.data);
                })
                .catch((err) => {
                    console.error(err);
                });
    
        } catch (err) {
            console.error(err);
        }
    };

    const checkType = (type) => {
        if (type === 12) {
            return '관광지';
        } else if (type === 14) {
            return '문화시설';
        } else if (type === 15) {
            return '축제/공연/행사';
        } else if (type === 28) {
            return '레포츠';
        } else if (type === 32) {
            return '숙박';
        } else if (type === 38) {
            return '쇼핑';
        } else if (type === 39) {
            return '음식';
        } else {
            return '기타';
        }
    };

    const Keyword = ({type, idx}) => {
        return (
            <View style={styles.keyword}>
                <TouchableOpacity
                    style={type.isClicked ?
                        {...styles.selectTypeClicked, borderColor: colors.mainColor,
                            backgroundColor: colors.mainColor,
                            shadowColor: colors.red[7]} :
                        {...styles.selectType, borderColor: colors.defaultColor,
                            backgroundColor: colors.defaultColor,
                            shadowColor: colors.red[7]}}
                    onPress={() => {
                        // 클릭하면 색 바꾸기
                        setDirectoryType(dirType => dirType.map(
                            (val, i) =>
                                i === idx ? {name: val.name, isClicked: true} : {
                                    name: val.name,
                                    isClicked: false
                                })
                        );
                        directoryType.map((val, i) =>
                            (i === idx) &&
                            setCurrentRendering(i)
                        );
                    }}
                >
                    <AppText
                        style={type.isClicked ? {...styles.selectTypeTextClicked, color: colors.defaultColor} : {...styles.selectTypeText, color: colors.subColor}}>{type.name}</AppText>
                </TouchableOpacity>
            </View>
        );
    };

    const SetRendering = () => {
        if(currentRendering === 0) return (
            <FlatList contentContainerStyle={{justifyContent: 'space-between'}} numColumns={2}
                showsVerticalScrollIndicator={false}
                data={placeList} renderItem={PlaceContainer}
                keyExtractor={(item) => item.place_pk.toString()} nestedScrollEnabled/>
        );
        else return (
            <FlatList columnWrapperStyle={{justifyContent: 'space-between'}} numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{zIndex: 0}}
                data={collectionList} renderItem={CollectionContainer}
                keyExtractor={(item) => item.collection_pk.toString()} nestedScrollEnabled />
        );
    };

    const PlaceContainer = ({item}) => (
        <TouchableOpacity style={{...styles.placeContainer, shadowColor: colors.red_gray[6], backgroundColor: colors.backgroundColor}} onPress={() => {
            navigation.navigate('Place', {data : item});
        }}>
            <View flex={1} style={{overflow: 'hidden', borderRadius: 10, marginHorizontal: 4}}>
                <View style={{height: '50%'}}> 
                    {
                        item.place_img ?
                            <Image style={styles.defaultPlaceImage} source={{uri: item.place_img}}/> :
                            <Image style={styles.defaultPlaceImage} source={require('../../assets/images/here_default.png')}/> 
                    }
                </View>
                <View flex={1} style={{marginLeft: 5}}>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <AppText style={{
                            color: colors.mainColor,
                            fontSize: 10,
                            marginTop: 2
                        }}>{checkType(item.place_type)}</AppText>
                        <AppText style={{color: colors.mainColor, fontSize: 11, marginHorizontal: 6,}}>|</AppText>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Image source={require('../../assets/images/here_icon.png')}
                                style={{width: 11.36, height: 9.23, marginTop: 2, marginRight: 3.24}}></Image>
                            <AppText style={{color: colors.mainColor, fontSize: 10}}>4.8</AppText>
                        </View>
                    </View>
                    <View style={{width: '100%'}}>
                        <AppText style={{
                            color: colors.mainColor,
                            fontSize: 16,
                            fontWeight: 'bold',
                            lineHeight: 24.8
                        }}>{item.place_name}</AppText>
                    </View>
                    <View style={{width: '100%'}}>
                        <AppText style={{
                            color: colors.gray[4],
                            fontSize: 12,
                            lineHeight: 19.2
                        }}>{item.place_addr}</AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const CollectionContainer = ({item}) => {
        return (
            <TouchableOpacity style={{...styles.directoryContainer, shadowColor: colors.red_gray[6]}} onPress={() => {
                item.collection_type === 1 ?
                    navigation.navigate('PlanCollection', {data : item}) : navigation.navigate('FreeCollection', {data : item});
            }}>
                <View flex={1} style={{overflow: 'hidden', borderRadius: 10}}>
                    <View style={{height: '68%'}}> 
                        <View style={{zIndex: 10000, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={[styles.dirType, {
                                borderColor: colors.backgroundColor,
                                backgroundColor: colors.backgroundColor
                            }]}>
                                <AppText
                                    style={item.collection_type === 1 ? {...styles.dirPlanText, color: colors.red[3]} : {...styles.dirFreeText, color: colors.mainColor}}>{item.collection_type === 1 ? '일정' : '자유'}</AppText>
                            </View>
                            {item.collection_private === 1 &&
                        <View style={{marginRight: 9, marginTop: 8}}>
                            <Image style={{width: 20, height: 20}}
                                source={require('../../assets/images/lock_outline.png')}></Image>
                        </View>
                            }
                        </View>
                        <Image style={styles.defaultImage} source={item.collection_thumbnail ? {uri: item.collection_thumbnail} : require('../../assets/images/here_default.png')}/>
                    </View>
                    <View flex={1} style={{marginLeft: 10, marginTop: 8}}>
                        <AppText style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: colors.mainColor
                        }}>{item.collection_name}</AppText>
                        <View style={{marginTop: 4, flexDirection: 'row'}}>
                            {item.keywords.map((keyword, idx) => {
                                return (
                                    <AppText key={idx} style={{
                                        color: colors.gray[4],
                                        fontSize: 10,
                                        marginRight: 6.21
                                    }}># {keyword}</AppText>);
                            })}
                        </View>
                        <View flexDirection="row" style={{position: 'absolute', bottom: 10, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <AppText style={{fontSize: 8, width: '68%'}}>by {item.created_user_name}</AppText>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginRight: 8, flexDirection: 'row'}}>
                                    <Image source={require('../../assets/images/here_icon.png')}
                                        style={{width: 8, height: 8, margin: 2}}></Image>
                                    <AppText style={{fontSize: 8, color: colors.hashTagColor, fontWeight: 'bold'}}>{item.like_cnt}</AppText>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Icon type="ionicon" name={'location'} size={8} color={colors.gray[2]}
                                        style={{margin: 1}}></Icon>
                                    <AppText style={{
                                        fontSize: 8,
                                        color: colors.hashTagColor,
                                        fontWeight: 'bold'
                                    }}>{item.place_cnt}</AppText>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );};

    const [showMenu, setShowMenu] = useState(false);
    const [currentMenu, setCurrentMenu] = useState('최근 추가순');

    const SelectBox = () => {
        return (
            <>
                {
                    showMenu && <View style={{
                        position: 'absolute',
                        width: 100,
                        height: 80,
                        backgroundColor: '#fff',
                        flex: 1,
                        borderRadius: 10,
                        zIndex: 9900,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,

                        overflow: 'visible'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowMenu(false);
                                setCurrentMenu('최근 추가순');
                            }}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}><AppText>최근 추가순</AppText>
                        </TouchableOpacity>

                        <View style={{
                            height: 1,
                            borderColor: colors.gray[5],
                            borderWidth: 0.4,
                            borderRadius: 1,
                        }}></View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowMenu(false);
                                setCurrentMenu('인기순');
                            }}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}><AppText>인기순</AppText>
                        </TouchableOpacity>

                        <View style={{
                            height: 1,
                            borderColor: colors.gray[5],
                            borderWidth: 0.4,
                            borderRadius: 1,
                        }}></View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowMenu(false);
                                setCurrentMenu('리뷰순');
                            }}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}><AppText>리뷰순</AppText>
                        </TouchableOpacity>
                    </View>
                }
            </>
        );};

    return (
        <View style={{backgroundColor: colors.backgroundColor, flex: 1}}>
            <ScreenContainerView flex={1}>
                <View flexDirection="row" style={{alignItems: 'center', justifyContent: 'center', marginVertical: 4}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {directoryType.map(
                            (type, idx) => <Keyword type={type} key={idx} idx={idx}/>
                        )}
                    </ScrollView>
                </View>

                <View flexDirection="row" style={{justifyContent: 'space-between', marginVertical: 14, position: 'relative', zIndex: 1}}>
                    <TouchableWithoutFeedback onPress={()=>setShowMenu(false)}>
                        <View flexDirection="row" flex={1}>
                            <TouchableOpacity onPress={()=>{
                                setShowMenu(!showMenu);
                            }} style={{flexDirection: 'row'}}>
                                <AppText style={{color: colors.mainColor}}>{currentMenu}</AppText>
                                <Icon style={{color: colors.mainColor, paddingTop: 1, paddingLeft: 8}} type="ionicon"
                                    name={'chevron-down-outline'} size={16}></Icon>
                            </TouchableOpacity>
                            <SelectBox />
                        </View>
                    </TouchableWithoutFeedback>
                    <View flexDirection="row">
                        <View flexDirection="row">
                            <Icon style={{color: colors.mainColor, marginTop: 3, marginRight: 2}} type="ionicon"
                                name={'funnel'} size={13}></Icon>
                            <AppText style={{color: colors.mainColor}}>필터</AppText>
                        </View>
                        <View style={{marginHorizontal: 10}}><AppText
                            style={{color: colors.subColor}}>|</AppText></View>
                        <View flexDirection="row">
                            <Icon style={{color: colors.mainColor, marginTop: 3, marginRight: 2}} type="ionicon"
                                name={'pencil'} size={13}></Icon>
                            <AppText style={{color: colors.mainColor}}>편집</AppText>
                        </View>
                    </View>
                </View>
                <SafeAreaView flex={1}>
                    {/* <ScrollView> */}
                    <SetRendering />
                    {/* </ScrollView> */}
                </SafeAreaView>
            </ScreenContainerView>
        </View>
    );
};

const styles = StyleSheet.create({

    directoryContainer: {
        width: '49%',
        height: 249,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 11,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
    },
    placeContainer: {
        width: '49%',
        height: 250,
        borderRadius: 10,
        marginBottom: 11,
    },
    dirType: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 14,
        elevation: 1,
        width: 43,
        height: 22,
        marginLeft: 9,
        marginTop: 8,
        flexDirection: 'row',
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dirFreeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    dirPlanText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    defaultImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    defaultPlaceImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 10
    },
    selectType: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12,
        marginRight: 10,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        elevation: 1,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectTypeClicked: {
        borderWidth: 1,
        paddingVertical: 1,
        paddingHorizontal: 8.5,
        borderRadius: 12,
        marginRight: 10,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        elevation: 1,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectTypeTextClicked: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        marginVertical: 2
    },
    selectTypeText: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: 2
    },

    keyword: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});


export default PlaceTab;