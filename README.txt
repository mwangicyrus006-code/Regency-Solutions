AUTOMATIC PRICING EMAILS (EmailJS, free tier, no server)
1. Sign up at emailjs.com, connect your company email under "Email Services" (copy the Service ID).
2. Create template "template_company": To = your company email; Subject = {{subject}};
   Body = {{name}} ({{email}}) | {{message}} | Page: {{page}} | Time: {{time}}
3. Create template "template_autoreply": To Email = {{email}}; Subject = Your Regency Solutions pricing plan;
   Body = Hi {{name}}, thank you for your interest in {{service}}. Our pricing plan: <link to your PDF>.
4. Account > API Keys: copy Public Key.
5. Paste Public Key, Service ID and company email into the CFG block at the top of script.js.
Every request then emails your team (so you see who asked) and auto-replies to the visitor.

All requests (pricing, project enquiries, newsletter) go to solutionsregency@gmail.com. Use this address as the company email when setting up EmailJS.
Update the WhatsApp/phone numbers in the floating icons and the social links in the footer.

Footer contact uses solutionsregency@gmail.com and +254 727 876577 (from your last draft). Edit in the footer of each page if needed.
