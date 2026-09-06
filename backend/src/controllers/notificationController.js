const { db } = require("../config/database");

/**
 * Get notifications by role
 */
function getNotifications(req, res) {
  const { role } = req.query;

  let query = "SELECT * FROM notifications WHERE 1=1";
  const params = [];

  if (role) {
    query += " AND role = ?";
    params.push(role);
  }

  query += " ORDER BY id ASC";

  const notifications = db.prepare(query).all(...params);

  return res.json({
    success: true,
    notifications: notifications.map(n => ({
      ...n,
      unread: Boolean(n.unread)
    }))
  });
}

/**
 * Mark all notifications as read for a role
 */
function markAllRead(req, res) {
  const { role } = req.body;

  if (role) {
    db.prepare("UPDATE notifications SET unread = 0 WHERE role = ?").run(role);
  } else {
    db.prepare("UPDATE notifications SET unread = 0").run();
  }

  return res.json({
    success: true,
    message: "All notifications marked as read"
  });
}

module.exports = {
  getNotifications,
  markAllRead
};
