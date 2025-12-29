import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Clipboard,
  Dimensions
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [link, setLink] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { colors } = useTheme();

  const handleGerarQRCode = () => {
    if (!link.trim()) {
      Alert.alert('Atenção', 'Por favor, insira um link válido');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setQrCode(link);
      setLoading(false);
    }, 500);
  };

  const handleCopyLink = async () => {
    if (!link) return;

    await Clipboard.setString(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setLink('');
    setQrCode(null);
  };

  const handleShare = () => {
    Alert.alert('Compartilhar', 'QR Code gerado com sucesso!');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Gerador de QR Code</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Transforme links e textos em códigos QR
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text
            }]}
            placeholder="Digite o link ou texto"
            placeholderTextColor="#999"
            value={link}
            onChangeText={setLink}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            returnKeyType="done"
            onSubmitEditing={handleGerarQRCode}
          />
          {link ? (
            <TouchableOpacity
              onPress={handleClear}
              style={styles.clearButton}
            >
              <Icon name="close" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.generateButton, {
            backgroundColor: colors.primary,
            opacity: link.trim() ? 1 : 0.6
          }]}
          onPress={handleGerarQRCode}
          disabled={loading || !link.trim()}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="qr-code" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Gerar QR Code</Text>
            </>
          )}
        </TouchableOpacity>

        {qrCode && (
          <View style={[styles.qrContainer, { backgroundColor: colors.card }]}>
            <QRCode
              value={qrCode}
              size={width * 0.7}
              color={colors.text}
              backgroundColor={colors.card}
              logoSize={60}
              logoMargin={5}
              logoBackgroundColor="transparent"
            />

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={handleCopyLink}
                disabled={!link}
              >
                <Icon
                  name={copied ? "check" : "content-copy"}
                  size={20}
                  color="#fff"
                />
                <Text style={[styles.actionText, { color: '#fff' }]}>
                  {copied ? "Copiado!" : "Copiar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={handleShare}
              >
                <Icon name="share" size={20} color="#fff" />
                <Text style={[styles.actionText, { color: '#fff' }]}>
                  Compartilhar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.tipContainer}>
          <Icon name="lightbulb" size={18} color={colors.primary} />
          <Text style={[styles.tip, { color: colors.text }]}>
            Você pode gerar QR Codes via URLs.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    paddingRight: 45,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  generateButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 30,
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
  },
  tip: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
});