export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET não está definido.');
  }

  try {

    return Buffer.from(secret, 'base64');
  } catch (e) {
    // Fallback menos seguro se a chave não for Base64 pura
    console.error("Erro ao decodificar Base64, usando TextEncoder.", e);
    return new TextEncoder().encode(secret); 
  }
}