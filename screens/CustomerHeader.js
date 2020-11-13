import React from "react";
import {Body, Button, Header, Icon, Left, Right, Title, Item} from "native-base";
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";

/**
 * The Header bar of following, repo, and follower page, extracted out to be independent component
 * @param setFilterCriteriaHandler
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CustomerHeader({setFilterCriteriaHandler, ...props}) {
    const [value, onChangeText] = React.useState('');

    return (
        <Header searchBar>
            <Left style={{flex: 0.4, marginLeft: 3}}>
                <TouchableOpacity testID='Profile' transparent onPress={() => {
                    props.navigation.navigate('Profile')
                }}>
                    <Icon name='arrow-back'/>
                </TouchableOpacity>
            </Left>
            <Body style={{flex: 1.5}}>
                <Title>{props.title}</Title>
            </Body>
            {props.title === 'Repositories' ? <View style={{flex: 0.25}}></View> : <View style={{flex: 0.25}}></View>}
            <View style={{flexDirection: 'row', flex: 1.5}}>
                <Item style={{flex: 1}}>
                    {props.title === 'Repositories' ? <Icon name='repo' type='Octicons'/> : <Icon name='ios-people'/>}
                    <TextInput style={{width:120}} value={value} onChangeText={text => {
                        if (setFilterCriteriaHandler != null){
                            setFilterCriteriaHandler(text)
                        }
                        onChangeText(text)
                    }}/>
                </Item>
                <TouchableOpacity transparent>
                    <Icon style={{marginTop: 16, marginLeft: 7}} name="ios-search"/>
                </TouchableOpacity>
            </View>
        </Header>
    )
}