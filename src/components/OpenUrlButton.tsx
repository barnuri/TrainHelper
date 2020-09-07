import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export default ({ url, title, color, text }: { url: string; title: string; color?: string | undefined; text: string }) => (
    <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{text}</Text>
        <TouchableOpacity
            style={{
                backgroundColor: color || 'blue',
                display: 'flex',
                alignItems: 'center',
                height: 100,
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
