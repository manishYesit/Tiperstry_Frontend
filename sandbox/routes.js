const routes = require('next-routes');


module.exports = routes()
  .add("index", "/")
  .add("Topic", "/topics/:topicId/:title")
  .add("Site", "/sites")
  .add("Domain", "/domain")
  .add("Login", "/login")
  .add("Forgot", "/forgot")
  .add("EmailVerification", "/email-verification")
  .add("ResetPassword", "/reset")
  .add("Recent", "/recent")
  .add("HashTag", "/hashtag/:tag")
  .add("Register", "/register")
  .add("Profile", "/p/:username")
  .add("WalletDetails", "/wallet")
  .add("Admin", "/admin")
  .add("EditProfile", "/edit/profile")
  .add("Whitepaper", "/whitepaper")
  .add("Contests", "/contests")
  .add("PrivacyPolicy", "/privacypolicy")
  .add("Faq", "/faq")
  .add("Terms", "/terms");