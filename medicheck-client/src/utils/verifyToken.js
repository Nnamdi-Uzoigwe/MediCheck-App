export const verifyToken = () => {
  const token = sessionStorage.getItem('token');
  
  if (!token) {
    return { isValid: false, message: 'No token found' };
  }

  try {
    // If you need to decode the token to check expiration
    const decoded = jwt.decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      sessionStorage.removeItem('token');
      return { isValid: false, message: 'Token expired' };
    }
    
    return { isValid: true, user: decoded };
  } catch (error) {
    console.error('Token verification error:', error);
    return { isValid: false, message: 'Invalid token' };
  }
};