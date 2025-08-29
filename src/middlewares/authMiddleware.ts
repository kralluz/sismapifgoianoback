export const validateAdminCredentials = (adminEmail: string, adminSenha: string): boolean => {
  return adminEmail === 'admin' && adminSenha === 'admin';
};