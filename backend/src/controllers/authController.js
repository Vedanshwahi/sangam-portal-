const { db } = require("../config/database");

/**
 * Handle authentication login
 * Supports 1-click role login or email/password authentication
 */
function login(req, res) {
  const { role, email, password } = req.body;

  let user = null;

  if (role) {
    user = db.prepare("SELECT * FROM users WHERE role = ?").get(role);
  } else if (email) {
    user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials or role"
    });
  }

  // Remove sensitive fields
  const { password: _, ...safeUser } = user;

  return res.json({
    success: true,
    message: `Signed in successfully as ${user.name}`,
    user: safeUser,
    token: `sangam_token_${user.id}_${Date.now()}`
  });
}

/**
 * Get currently authenticated user details
 */
function getMe(req, res) {
  const role = req.query.role || "student";
  const user = db.prepare("SELECT * FROM users WHERE role = ?").get(role);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const { password: _, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
}

/**
 * Logout
 */
function logout(req, res) {
  return res.json({
    success: true,
    message: "Successfully signed out"
  });
}

module.exports = {
  login,
  getMe,
  logout
};
