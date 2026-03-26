# Claude Code Prompt — Delete Account Page (fitbyconnect.in)

## Context

fitbyconnect is a gym management and fitness social platform. The landing website lives at `https://www.fitbyconnect.in/`. A new static page must be added at `/delete-account` to satisfy Google Play Store's account deletion policy requirement.

This page is **public-facing** (no login required) and is purely informational + request-initiation. It is not an authenticated in-app flow.

---

## Task

Add a new page at `/delete-account` on the fitbyconnect.in website that:

1. Explains what data can be deleted (profile data only — not gym membership data)
2. Explains what is retained and why
3. Provides a way for the user to submit a deletion request (email-based for now)
4. Meets Google Play Store's account deletion policy requirements

Match the existing website's design language, fonts, and color palette exactly.

---

## Design


### Typography
- Match whatever font the existing website uses
- Section headings: Bold, 22–26px
- Body text: Regular, 15–16px, line-height 1.6
- Captions/labels: Medium, 12–13px, letter-spacing +0.3px

### Layout
- Reuse the existing website's header and footer components
- Page max-width: 720px, centered
- Horizontal padding: 24px
- Use card-style sections with white/cream background, 16px border-radius, subtle shadow

---

## Page Structure

#### Please add option to navigate to this page on Footer, not on header 

### 1. Hero / Header Section
- Headline: **"Delete Your Account"**
- Subtext: `"We're sorry to see you go. Here's everything you need to know before submitting your request."`
- Small "fitbyconnect" branding reference so Google can verify developer name
- No hero image needed — clean white/peach background

---

### 2. "What Will Be Deleted" Section

Title: **What gets deleted**

List the following data that will be permanently removed when a deletion request is processed:

- Full name
- Email address
- Date of birth
- Gender
- Height and weight
- Fitness goals
- Profile photo / avatar
- Location preferences (last known city, coordinates)
- Account credentials (phone number used to sign in)

Present as a clean checklist-style list with a ✓ or trash icon beside each item. Use danger/red accent (`#D94F4F`) sparingly — only on the section label, not every row.

---

### 3. "What Is NOT Deleted" Section

Title: **What we are required to keep**

Explain clearly that the following is **not** under the user's control to delete because it belongs to the gym, not fitbyconnect:

> Membership records, payment history, attendance logs, and any information you provided directly to a gym (such as your name and phone number given at the time of enrollment) are managed by the gym owner — not fitbyconnect. We are not able to delete this data on your behalf. Please contact your gym directly for requests related to gym records.

Present this in a neutral info-style callout box (light amber/stone background, no red). Keep the tone matter-of-fact, not defensive.

Also add:

> For legal and financial compliance, anonymized transaction records may be retained for up to 7 years as required under applicable Indian law.

---

### 4. "How to Request Deletion" Section

Title: **How to submit your request**

Steps (numbered list):
1. Send an email to **support@fitbyconnect.in** from the email address registered on your account
2. Use subject line: **"Account Deletion Request"**
3. Include your registered phone number in the email body so we can identify your account
4. You will receive a confirmation email within **3 business days**
5. Your account and profile data will be permanently deleted within **30 days** of confirmation

Add a prominent CTA button:
- Label: **"Send Deletion Request"**
- Action: `mailto:support@fitbyconnect.in?subject=Account%20Deletion%20Request`
- Style: Salmon fill (`#E8907A`), white text, pill shape, 52px height

---

### 5. Footer Note

Small caption text below the button:

> Deletion requests are processed manually. Once confirmed, this action is permanent and cannot be undone. If you have an active gym membership, deleting your fitbyconnect account will not cancel your membership with the gym.

---

## Technical Requirements

- Page route: `/delete-account`
- Must be publicly accessible without login (no auth gate)
- Page must be indexable (no `noindex` meta tag) so Google Play can link to it
- Page title tag: `"Delete Account — fitbyconnect"`
- Meta description: `"Learn how to request deletion of your fitbyconnect account and personal profile data."`
- The URL `https://www.fitbyconnect.in/delete-account` must return a 200 status — not a redirect

---

## What NOT to Build

- Do not build any backend deletion API or Supabase RPC
- Do not add any authentication or login wall
- Do not include any form submission logic — the CTA is a `mailto:` link only
- Do not include any gym membership data management — that is out of scope for this page
- Do not add any cookie banners or analytics tracking to this page