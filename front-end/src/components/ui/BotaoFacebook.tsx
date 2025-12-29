import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    Platform,
} from 'react-native';

interface BotaoFacebookProps {
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    label?: string;
}

export const BotaoFacebook: React.FC<BotaoFacebookProps> = ({
    onPress,
    loading = false,
    disabled = false,
    label = 'Continue com Facebook',
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={loading || disabled}
            activeOpacity={0.8}
            accessibilityLabel="Continuar com Facebook"
            accessibilityRole="button"
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Image
                            source={require('../../assets/img-facebook.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    )}
                </View>
                <Text style={styles.text}>
                    {loading ? 'Carregando...' : label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1877F2',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 24,
        height: 24,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        letterSpacing: 0.2,
    },
    disabled: {
        opacity: 0.6,
    },
});