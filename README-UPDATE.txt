# SmartSkillsAI.in Website Update

## Included updates
- English-only interface text across the landing page, login, package details, checkout, payment, user panel, and admin panel.
- Updated package names and Gold (XAUUSD)-focused package descriptions.
- Added an administrator referral-code manager. Codes created in Admin Panel > Referral Codes can be entered during sign-up.
- Added a Forgot password? link that opens an email request to the configured administrator email.
- Package payment proofs remain pending until an administrator approves them.
- When an administrator approves a package, WhatsApp opens with a pre-filled activation message addressed to the user's phone number.
- WhatsApp order/payment notifications open a pre-filled chat to the configured admin WhatsApp number/link.

## WhatsApp setup
In Admin Panel > Settings, enter the administrator's WhatsApp number with country code (for example, 919876543210) or a full `https://wa.me/...` link. The admin user's phone number should include the country code where possible.

## Important production requirements
This project currently stores users, orders, referral codes, and sessions in browser `localStorage`. This is suitable only for a local/demo prototype. It does not provide a shared database across different users/devices, secure authentication, server-side payment verification, or reliable admin approvals on a live multi-user website.

The password recovery link opens an email draft; it does not send a secure OTP or reset link automatically. WhatsApp messages are pre-filled in WhatsApp and must be sent by the person using WhatsApp. Automated email/WhatsApp delivery and production-grade account recovery require a backend, database, email provider, and WhatsApp Business API integration.

Before public launch, move authentication, referral codes, orders, approvals, and package activation to a secure server-side backend. Also replace the demo administrator credentials in `scripts/auth.js`.
