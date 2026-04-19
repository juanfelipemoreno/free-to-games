import { AuthResponse, User } from '@/types/auth';

const VALID_USERS: Record<string, { password: string; user: User }> = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      username: 'admin'
    }
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@example.com',
      name: 'Test User',
      username: 'testuser'
    }
  },
  'demo@test.com': {
    password: 'demo123',
    user: {
      id: '3',
      email: 'demo@test.com',
      name: 'Demo Account',
      username: 'demo'
    }
  }
};

// Genercion de token ficticio
function generateToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    sub: userId, 
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 // 24 horas
  }));
  const signature = btoa('simulated_signature');
  return `${header}.${payload}.${signature}`;
}

// Llamada de autenticación simulada
export async function authenticateUser(email: string, password: string): Promise<AuthResponse> {
  // Simula latencia de red
  await new Promise(resolve => setTimeout(resolve, 800));

  //Aca se llamaria a una API real, 
  // pero para este ejemplo se valida contra un objeto local
  const userEntry = VALID_USERS[email];
  
  if (!userEntry) {
    throw new Error('El email no está registrado');
  }

  if (userEntry.password !== password) {
    throw new Error('Contraseña incorrecta');
  }

  const token = generateToken(userEntry.user.id);

  return {
    token,
    user: userEntry.user
  };
}

// Valida un token 
export function validateToken(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    return payload.exp > now;
  } catch {
    return false;
  }
}

// Obtiene el usuario desde el token (simulado)
export function getUserFromToken(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    const userEntry = Object.values(VALID_USERS).find(u => u.user.id === payload.sub);
    
    return userEntry?.user || null;
  } catch {
    return null;
  }
}
