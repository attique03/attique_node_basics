const { Router } = require("express");
const {
  handleRegister,
  handleLogin,
  registerUser,
  authUser,
  logout,
} = require("../controllers/authController");

const router = Router();

router.route("/signup").get(handleRegister).post(registerUser);
router.route("/login").get(handleLogin).post(authUser);
router.get("/logout", logout);

// router.get("/signup", renderRegisterPage);
// router.post("/signup", registerUser);

// router.get("/login", renderLoginPage);
// router.post("/login", authUser);

module.exports = router;
