export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const userRole = req.user.role;
    const userRoleAliases = [userRole];
    if (userRole === "club head" || userRole === "president") {
      userRoleAliases.push("president", "club head");
    }
    if (userRole === "club member" || userRole === "student") {
      userRoleAliases.push("student", "club member");
    }

    const hasPermission = roles.some((r) => userRoleAliases.includes(r));

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access requires one of the following roles: ${roles.join(", ")}.`,
      });
    }

    next();
  };
};
