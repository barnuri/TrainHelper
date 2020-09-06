import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export default ({ url, title, color }: { url: string; title: string; color?: string | undefined }) => (
    <View>
        <TouchableOpacity
            style={{
                backgroundColor: color || 'blue',
                display: 'flex',
                alignItems: 'center',
                height: 100,
                margin: 10,
                alignContent: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            onPress={() => Linking.canOpenURL(url).then(() => Linking.openURL(url))}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>{title}</Text>
        </TouchableOpacity>
    </View>
);
