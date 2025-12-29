import api from './api';

export async function gerarQRCode(link: string): Promise<string> {
  try {
    const response = await api.post('/generate_qrcode/', { content: link });

    if (!response.data) {
      throw new Error('Resposta da API vazia');
    }
    
    if (response.data instanceof Blob) {
      return URL.createObjectURL(response.data);
    }
    
    if (typeof response.data === 'string') {
      return `data:image/png;base64,${response.data}`;
    }
    
    throw new Error('Formato de resposta não suportado');
    
  } catch (error: any) {
   
    const apiError = error.response?.data?.detail || 
                     error.response?.data?.message || 
                     'Erro na comunicação com o servidor';
    
    throw new Error(apiError);
  }
}