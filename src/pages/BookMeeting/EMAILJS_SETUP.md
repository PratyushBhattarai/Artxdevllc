# Book a Meeting – EmailJS setup

Every booking is sent by email through [EmailJS](https://www.emailjs.com) (free plan: 200 emails/month).
The code is already done – you only need to create the EmailJS account, two templates, and paste 4 values into `.env`.

## 1. Create the account and connect an email

1. Sign up at **emailjs.com** (use the company account, e.g. the ArtX Gmail).
2. **Email Services → Add New Service → Gmail** → connect the inbox that should *send* the emails.
3. Copy the **Service ID** (looks like `service_xxxxxxx`).

## 2. Template 1 – booking notification to the team (required)

**Email Templates → Create New Template**, then fill in:

| Field | Value |
|---|---|
| **To Email** | `Artxdevllc@gmail.com` (the inbox that should receive bookings) |
| **From Name** | `ArtX Booking` |
| **Reply To** | `{{reply_to}}` ← so you can reply straight to the customer |
| **Subject** | `New booking: {{meeting_type}} – {{name}} ({{date}})` |

**Content** (paste into the template body):

```
New meeting booked 🎉   Ref: {{reference}}

MEETING
Type:      {{meeting_type}} ({{duration}})
Where:     {{meeting_mode}}
Date:      {{date}}
Time:      {{time_nepal}}
Customer:  {{time_customer}} – {{customer_timezone}}

CUSTOMER
Name:      {{name}}
Email:     {{email}}
Phone:     {{phone}}
Company:   {{company}}

PROJECT
Service:   {{service}}
Budget:    {{budget}}
Heard via: {{source}}
Details:
{{details}}
```

Save and copy the **Template ID** (`template_xxxxxxx`).

## 3. Template 2 – confirmation to the customer (optional, recommended)

Create a second template:

| Field | Value |
|---|---|
| **To Email** | `{{email}}` |
| **From Name** | `ArtX Dev` |
| **Reply To** | `Artxdevllc@gmail.com` |
| **Subject** | `Your meeting with ArtX Dev is booked – {{date}}` |

```
Hi {{name}},

Thanks for booking a {{meeting_type}} with ArtX Dev!

  Date:  {{date}}
  Time:  {{time_customer}} ({{customer_timezone}})
  Where: {{meeting_mode}}
  Ref:   {{reference}}

We'll send the meeting link / call details before the meeting.
Need to reschedule? Just reply to this email.

– The ArtX Dev team
```

Copy this **Template ID** too. (If you skip this template, the success page simply says
"Our team will email you to confirm" instead.)

## 4. Public key

**Account → General → API Keys** → copy the **Public Key**.

> Tip: in **Account → Security**, add your website domain to the allow-list so nobody
> else can use your keys.

## 5. Put the values in `.env`

Copy `.env.example` (project root) to `.env` and fill it in:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_yyyyyyy
```

**Restart `npm run dev`** after editing `.env` (Vite only reads it on start).
When you deploy (Vercel / Netlify etc.), add the same 4 variables in the hosting dashboard.

## How it behaves

| Situation | What happens |
|---|---|
| Keys set, email sent | Success screen + team gets the booking (+ customer gets confirmation) |
| EmailJS error (offline, limit reached…) | Red message asking the customer to try again or email you |
| Keys missing, `npm run dev` | Booking still "succeeds" so you can test the page; a warning appears in the browser console |
| Keys missing, live website | Shows the error message – bookings are never silently lost |

All variables available in templates: `reference, meeting_type, duration, meeting_mode, date,
time_customer, customer_timezone, time_nepal, start_utc, name, email, reply_to, phone, company,
service, budget, details, source`.
