import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    Platform
} from 'react-native';

interface BotaoGoogleProps {
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    label?: string;
}

export const BotaoGoogle: React.FC<BotaoGoogleProps> = ({
    onPress,
    loading = false,
    disabled = false,
    label = 'Continue com Google',
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
            accessibilityLabel="Continuar com Google"
            accessibilityRole="button"
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#757575" />
                    ) : (
                        <Image
                            source={require('../../assets/img-google.png')}
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
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        borderWidth: 1,
        borderColor: '#E0E0E0',
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
        color: '#757575',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        letterSpacing: 0.2,
    },
    disabled: {
        opacity: 0.6,
    },
});