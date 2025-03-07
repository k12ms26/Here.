import React, {useState, useEffect} from 'react';
import {View, TextInput, Image, ScrollView, Pressable, StyleSheet} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {useTheme} from '@react-navigation/native';
import NavigationTop from '../../components/NavigationTop';
import SearchIcon from '../../assets/images/search-icon.svg';
import ScreenContainerView from '../../components/ScreenContainerView';
import ScreenDivideLine from '../../components/ScreenDivideLine';
import Star from '../../assets/images/search/star.svg';
import AppText from '../../components/AppText';
import {useSearchKeyword} from '../../contexts/SearchkeywordContextProvider';
import SearchPlaceForAdd from './SearchPlaceForAdd';
import ShowRecommendPlace from '../../components/ShowRecommendPlace';

const SearchScreenForAdd = ({route, navigation}) => {
    const {colors} = useTheme();
    const { pk, placeData, day, replace } = route.params;
    const [searchKeyword, setSearchKeyword] = useSearchKeyword();
    useEffect(() => {setSearchKeyword('')}, []);

    const styles = StyleSheet.create({
        search_box: {
            borderBottomWidth: 1,
            borderColor: colors.gray[5],
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 4
        },
        score_line: {
            width: 1,
            height: '80%',
            backgroundColor: colors.gray[4],
            marginHorizontal: 4
        },
        ad_sticker: {
            backgroundColor: colors.gray[5],
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            marginLeft: 8
        },
        dirType: {
            borderWidth: 1,
            paddingVertical: 1,
            paddingHorizontal: 8,
            borderRadius: 14,
            shadowColor: colors.red_gray[7],
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            height: 22,
            marginRight: 9,
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dirFreeText: {
            color: colors.gray[3],
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
        },
    });

    const RecommendedPlace = ({name, address}) => {
        return (
            <View style={{marginRight: 8}}>
                <Image source={require('../../assets/images/here_default.png')}
                    style={{width: 141, height: 101, borderRadius: 10}}/>
                <View style={{height: 62, justifyContent: 'space-between', marginVertical: 8}}>
                    <View flexDirection="row" style={{alignItems: 'center'}}>
                        <AppText style={{fontSize: 10, color: colors.mainColor}}>음식점</AppText>
                        <View style={styles.score_line}></View>
                        <Star width={14} height={14}/>
                        <AppText style={{fontSize: 10, color: colors.mainColor, marginLeft: 2}}>4.84</AppText>
                    </View>
                    <AppText style={{fontSize: 16, fontWeight: '700', color: colors.mainColor}}>{name}</AppText>
                    <AppText style={{fontSize: 12, fontWeight: '400', color: colors.gray[4]}}>{address}</AppText>
                </View>
            </View>
        );
    };

    const RecommendedCollection = () => {
        return (
            <View style={{
                width: 162,
                height: 249,
                shadowColor: colors.red_gray[7],
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.27,
                shadowRadius: 6,
                marginRight : 8,
                borderRadius : 10,
                overflow: 'hidden'
            }}>
                <View flexDirection="row" style={{
                    flexWrap: 'wrap',
                    height: 162,
                    width: 162,
                }}>
                    <Image source={require('../../assets/images/here_default.png')} style={{width: 162, height: 162}}/>
                </View>
                <View flex={1} style={{backgroundColor : colors.defaultColor, padding : 8}}>
                    <AppText style={{color : colors.mainColor, fontSize : 14, fontWeight : '700'}}>
                        종로 25년 토박이가 알려주는 종로 사진스팟
                    </AppText>
                    <AppText style={{flexDirection : 'row', fontSize : 10, color : colors.gray[5]}}>
                        <AppText># 힐링</AppText>
                        <AppText># 뚜벅</AppText>
                        <AppText># 여유</AppText>
                    </AppText>
                </View>
            </View>
        );
    };

    const SearchBar = () => {
        const [k, setK] = useState('');

        return (
            <View flexDirection="row" style={styles.search_box}>
                <TextInput flex={1} style={{fontSize: 16}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="원하는 공간/보관함/유저를 검색해보세요"
                    placeholderTextColor={colors.gray[5]}
                    onChangeText={(text) => setK(text)}
                    onSubmitEditing={()=> setSearchKeyword(k)}
                />
                <Pressable style={{marginLeft: 5}} onPress={() => setSearchKeyword(k)}>
                    <SearchIcon width={26} height={26} style={{color: colors.gray[5]}}/>
                </Pressable>
            </View>
        )
    };
    return (
        <ScreenContainer backgroundColor={colors.backgroundColor}>
            <NavigationTop title="검색" navigation={navigation}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScreenContainerView>
                    <SearchBar />
                    {searchKeyword !== '' && 
                    <SearchPlaceForAdd pk={pk} placeData={placeData} day={day} navigation={navigation} replace={replace} />}
                </ScreenContainerView>

                {searchKeyword !== '' && <ScreenDivideLine/>}

                <ScreenContainerView>
                    <View style={{marginTop: 24, marginBottom: 12}}>
                        <View flexDirection="row" style={{alignItems: 'center', marginBottom: 12}}>
                            <AppText style={{color: colors.mainColor, fontSize: 20, fontWeight: '700'}}>추천하는 공간</AppText>
                            {/* <View style={styles.ad_sticker}>
                                <AppText style={{color: colors.defaultColor, fontSize: 12, fontWeight: '700'}}>AD</AppText>
                            </View> */}
                        </View>
                        <ShowRecommendPlace navigation={navigation}/>
                    </View>
                </ScreenContainerView>
            </ScrollView>
        </ScreenContainer>
    );
};

export default SearchScreenForAdd;