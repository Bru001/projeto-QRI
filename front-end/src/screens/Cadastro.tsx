import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useWindowDimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../components/ui/Input';
import { Loading } from '../components/ui/loading';

// Importe seus novos componentes de botão
import { BotaoFacebook } from '../components/ui/BotaoFacebook';
import { BotaoGoogle } from '../components/ui/BotaoGoogle';

// ===== TIPOS =====
type FormInputProps = {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

// ===== COMPONENTE REUTILIZÁVEL =====
const FormInput: React.FC<FormInputProps> = React.memo(({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  placeholderTextColor = '#ffffff99',
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      containerStyle={[
        styles.inputField,
        error && styles.inputError,
      ]}
      placeholderTextColor={placeholderTextColor}
      style={styles.inputText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
));

// ===== COMPONENTE PRINCIPAL =====
export default function Cadastro({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  
  // Cálculos responsivos
  const isSmall = height < 700;
  const isLarge = height > 800;
  
  // Estados
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Estados de erro
  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmarSenhaError, setConfirmarSenhaError] = useState('');
  
  // Estados de loading
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  // Configurações responsivas
  const layoutStyles = {
    container: {
      paddingTop: isSmall ? 30 : isLarge ? 60 : 50,
      paddingBottom: isSmall ? 30 : isLarge ? 50 : 40,
    },
    logo: {
      width: isSmall ? 90 : isLarge ? 140 : 120,
      height: isSmall ? 90 : isLarge ? 140 : 120,
    },
    title: {
      fontSize: isSmall ? 26 : isLarge ? 34 : 30,
      marginBottom: isSmall ? 20 : isLarge ? 30 : 25,
    },
    cadastroButton: {
      height: isSmall ? 50 : isLarge ? 60 : 55,
      marginTop: isSmall ? 20 : isLarge ? 30 : 25,
    },
    loginLink: {
      marginTop: isSmall ? 15 : isLarge ? 25 : 20,
    },
    socialButtons: {
      marginTop: isSmall ? 15 : isLarge ? 25 : 20,
      marginBottom: isSmall ? 15 : isLarge ? 25 : 20,
    }
  };
  
  // Validação em tempo real
  useEffect(() => {
    if (nome && nome.length < 2) {
      setNomeError('Nome deve ter pelo menos 2 caracteres');
    } else {
      setNomeError('');
    }
  }, [nome]);
  
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Digite um e-mail válido');
    } else {
      setEmailError('');
    }
  }, [email]);
  
  useEffect(() => {
    if (senha && senha.length < 6) {
      setSenhaError('Senha deve ter pelo menos 6 caracteres');
    } else {
      setSenhaError('');
    }
  }, [senha]);
  
  useEffect(() => {
    if (confirmarSenha && senha !== confirmarSenha) {
      setConfirmarSenhaError('As senhas não coincidem');
    } else {
      setConfirmarSenhaError('');
    }
  }, [confirmarSenha, senha]);
  
  // Animação de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  function validateEmail(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }
  
  const handleCadastro = useCallback(async () => {
    // Reset erros
    setNomeError('');
    setEmailError('');
    setSenhaError('');
    setConfirmarSenhaError('');
    
    // Validações
    let hasError = false;
    
    if (!nome.trim()) {
      setNomeError('Nome é obrigatório');
      hasError = true;
    } else if (nome.length < 2) {
      setNomeError('Nome muito curto');
      hasError = true;
    }
    
    if (!email.trim()) {
      setEmailError('E-mail é obrigatório');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Digite um e-mail válido');
      hasError = true;
    }
    
    if (!senha) {
      setSenhaError('Senha é obrigatória');
      hasError = true;
    } else if (senha.length < 6) {
      setSenhaError('Senha deve ter pelo menos 6 caracteres');
      hasError = true;
    }
    
    if (!confirmarSenha) {
      setConfirmarSenhaError('Confirme sua senha');
      hasError = true;
    } else if (senha !== confirmarSenha) {
      setConfirmarSenhaError('As senhas não coincidem');
      hasError = true;
    }
    
    if (hasError) return;
    
    setLoading(true);
    
    setTimeout(async () => {
      try {
        // Verificar se o usuário já existe
        const usuariosExistentes = await AsyncStorage.getItem('usuarios');
        let usuarios = usuariosExistentes ? JSON.parse(usuariosExistentes) : [];
        
        // Verificar se email já está cadastrado
        const emailExistente = usuarios.find((u: any) => u.email === email);
        if (emailExistente) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado');
          setLoading(false);
          return;
        }
        
        // Criar novo usuário
        const novoUsuario = {
          id: Date.now().toString(),
          nome: nome.trim(),
          email: email.toLowerCase().trim(),
          senha, // Em produção, criptografe a senha!
          dataCadastro: new Date().toISOString(),
        };
        
        // Adicionar ao array de usuários
        usuarios.push(novoUsuario);
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Salvar como usuário logado
        await AsyncStorage.setItem('usuario', JSON.stringify({ 
          email: email.toLowerCase().trim(), 
          nome: nome.trim() 
        }));
        
        Alert.alert(
          'Sucesso!',
          'Cadastro realizado com sucesso!',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.replace('Home') 
            }
          ]
        );
        
      } catch (error) {
        console.error('Erro no cadastro:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  }, [nome, email, senha, confirmarSenha, navigation]);
  
  const handleGoogleCadastro = useCallback(async () => {
    setGoogleLoading(true);
    setTimeout(() => {
      Alert.alert('Info', 'Cadastro com Google em desenvolvimento');
      setGoogleLoading(false);
    }, 1000);
  }, []);
  
  const handleFacebookCadastro = useCallback(async () => {
    setFacebookLoading(true);
    setTimeout(() => {
      Alert.alert('Info', 'Cadastro com Facebook em desenvolvimento');
      setFacebookLoading(false);
    }, 1000);
  }, []);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={{ flex: 1, backgroundColor: '#FF0000' }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View 
          style={[
            styles.container, 
            layoutStyles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/img-logo.png')}
              style={[styles.logo, layoutStyles.logo]}
              resizeMode="contain"
              accessibilityLabel="Logo do aplicativo"
            />
          </View>

          {/* Título */}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, layoutStyles.title]}>
              Cadastro
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            {/* Input Nome */}
            <FormInput
              label="Nome"
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome completo"
              error={nomeError}
              placeholderTextColor="#ffffff99"
              autoCapitalize="words"
            />

            {/* Input E-mail */}
            <FormInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              error={emailError}
              placeholderTextColor="#ffffff99"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Input Senha */}
            <FormInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              error={senhaError}
              placeholderTextColor="#ffffff99"
              autoCapitalize="none"
            />

            {/* Input Confirmar Senha */}
            <FormInput
              label="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              placeholder="Digite a senha novamente"
              secureTextEntry
              error={confirmarSenhaError}
              placeholderTextColor="#ffffff99"
              autoCapitalize="none"
            />

            {/* Divisor "ou" */}
            <View style={[styles.dividerContainer, { marginTop: 5 }]}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Botões sociais - NOVOS COMPONENTES */}
            <View style={[styles.socialButtonsContainer, layoutStyles.socialButtons]}>
              <BotaoFacebook
                onPress={handleFacebookCadastro}
                loading={facebookLoading}
                label="Continua com Facebook"
              />
              
              <View style={{ height: 12 }} />
              
              <BotaoGoogle
                onPress={handleGoogleCadastro}
                loading={googleLoading}
                label="Continua com Google"
              />
            </View>
          </View>

          {/* Botão Cadastrar */}
          <TouchableOpacity
            style={[
              styles.cadastroButton,
              layoutStyles.cadastroButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleCadastro}
            disabled={loading}
            accessibilityLabel="Cadastrar conta"
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            {loading ? (
              <Loading color="#fff" />
            ) : (
              <Text style={styles.cadastroButtonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          {/* Já tem conta? */}
          <View style={[styles.loginContainer, layoutStyles.loginLink]}>
            <Text style={styles.loginText}>
              Já tem conta?{' '}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
                accessibilityLabel="Fazer login"
                accessibilityRole="link"
              >
                Fazer login!
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ===== ESTILOS =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },

  logo: {
    marginBottom: 0,
  },

  titleContainer: {
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontWeight: '700',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'center',
  },

  formContainer: {
    width: '100%',
    marginBottom: 10,
  },

  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 5,
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  inputField: {
    backgroundColor: '#ffffff22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffffff44',
    width: '100%',
    height: 48,
  },

  inputError: {
    borderColor: '#FFCCCC',
    borderWidth: 1.5,
  },

  inputText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    paddingHorizontal: 12,
  },

  errorText: {
    color: '#FFCCCC',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff55',
  },

  dividerText: {
    marginHorizontal: 12,
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  socialButtonsContainer: {
    width: '100%',
    alignItems: 'center',
  },

  cadastroButton: {
    backgroundColor: '#000',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  cadastroButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  loginLink: {
    color: '#fff',
    fontWeight: '700',
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});