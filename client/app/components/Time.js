import React from "react";
import {View, Text} from "react-native";
import { Icon } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import AppText from "./AppText";

const Time = (props) => {
    const { colors } = useTheme();
    return (
        <View style={{
            borderColor: colors.defaultColor,
            backgroundColor: colors.defaultColor,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginRight: 10,
            // 이부분은 placeScreen 보고 받은거라 props로 다시 바꿔도될듯
            flexDirection: 'row',
            width: 60,
        }}><AppText style={{fontSize: 14, paddingEnd: 4, color: colors.mainColor}}>{props.name}</AppText>
        <Icon type="ionicon" name={"sunny"} color={props.iconColor} size={props.iconSize}></Icon>
        </View>
    )
};

export default Time;