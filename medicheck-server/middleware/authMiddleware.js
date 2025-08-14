// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ error: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId };
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        error: "Authorization header missing" 
      });
    }

    // 2. Extract token (handling both "Bearer <token>" and raw tokens)
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : authHeader;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: "Token not provided" 
      });
    }
console.log("Authorization header:", req.headers.authorization);
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], // Specify allowed algorithm
      ignoreExpiration: false // Explicitly check expiration
    });

    // 4. Attach user to request
    req.user = { 
      id: decoded.userId,
      role: decoded.role, // If you have roles
      sessionId: decoded.sessionId // Optional: for session management
    };

    // 5. Optional: Add security headers
    res.setHeader('X-Authenticated-User', decoded.userId);

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);

    // Specific error messages
    let errorMessage = "Invalid token";
    if (error.name === 'TokenExpiredError') {
      errorMessage = "Token expired";
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = "Malformed token";
    }

    res.status(401).json({ 
      success: false,
      error: errorMessage,
      // Optional: Add refresh token endpoint if available
      action: error.name === 'TokenExpiredError' 
        ? { refresh: "/api/auth/refresh" } 
        : undefined
    });
  }
};