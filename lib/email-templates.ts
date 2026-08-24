export interface InternalLeadEmailProps {
  name: string
  email: string
  phone?: string
  city?: string
  servicesText?: string
  budget?: string
  message: string
  createdAt?: string
}

export function renderInternalLeadEmailHTML(data: InternalLeadEmailProps): string {
  const dateFormatted = data.createdAt
    ? new Date(data.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Website Enquiry</title>
</head>
<body style="margin:0; padding:40px 16px; background-color:#FAF9F4; font-family:'Hanken Grotesk', -apple-system, BlinkMacSystemFont, Arial, sans-serif; color:#1C1D1A;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#FAF9F4; border:1px solid #E5E4E0; border-radius:12px; overflow:hidden; border-collapse:collapse;">
    
    <!-- Top Header Bar -->
    <tr>
      <td style="padding:20px 24px; background-color:#FAF9F4; border-bottom:1px solid #E5E4E0;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="font-size:20px; font-weight:700; color:#0C4651; letter-spacing:-0.02em;">
              KR Tasker Digital
            </td>
            <td align="right">
              <a href="https://www.krtaskerdigital.com" target="_blank" style="font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; text-decoration:none;">
                Visit Website →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Content Area -->
    <tr>
      <td style="padding:32px 24px;">
        
        <!-- Hero Title -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px; text-align:center;">
          <tr>
            <td>
              <h1 style="margin:0 0 8px 0; font-size:28px; font-weight:700; color:#0C4651; letter-spacing:-0.02em;">
                New Website Enquiry
              </h1>
              <p style="margin:0; font-size:15px; color:#464833;">
                A new client project lead has been submitted via the website contact form.
              </p>
            </td>
          </tr>
        </table>

        <!-- Lead Details Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#FFFFFF; border:1px solid #E5E4E0; border-radius:12px; padding:24px; margin-bottom:24px;">
          <tr>
            <td>
              <!-- Card Header -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom:1px solid #E5E4E0; padding-bottom:16px; margin-bottom:20px;">
                <tr>
                  <td style="font-size:18px; font-weight:700; color:#0C4651;">
                    👤 Lead Information
                  </td>
                </tr>
              </table>

              <!-- Details Grid -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" valign="top" style="padding-bottom:16px;">
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; opacity:0.7;">Client Name</span>
                    <strong style="font-size:15px; color:#0C4651;">${data.name}</strong>
                  </td>
                  <td width="50%" valign="top" style="padding-bottom:16px;">
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; opacity:0.7;">Email Address</span>
                    <a href="mailto:${data.email}" style="font-size:15px; color:#0C4651; text-decoration:underline; font-weight:600;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td width="50%" valign="top" style="padding-bottom:16px;">
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; opacity:0.7;">Phone Number</span>
                    <span style="font-size:15px; color:#0C4651;">${data.phone || 'N/A'}</span>
                  </td>
                  <td width="50%" valign="top" style="padding-bottom:16px;">
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; opacity:0.7;">City / Location</span>
                    <span style="font-size:15px; color:#0C4651;">${data.city || 'N/A'}</span>
                  </td>
                </tr>
                <tr>
                  <td width="50%" valign="top" style="padding-bottom:16px;">
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; opacity:0.7;">Services Requested</span>
                    <span style="font-size:15px; color:#0C4651; font-weight:600;">${data.servicesText || 'General Enquiry'}</span>
                  </td>
                  <td width="50%" valign="top" style="padding-bottom:16px;">
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; opacity:0.7;">Estimated Budget</span>
                    <span style="font-size:15px; color:#0C4651; font-weight:600;">${data.budget || 'Not specified'}</span>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid #E5E4E0; padding-top:20px; margin-top:8px;">
                <tr>
                  <td>
                    <span style="display:block; font-size:11px; font-weight:700; color:#0C4651; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px; opacity:0.7;">Project Message / Requirements</span>
                    <div style="background-color:#FAF9F4; border:1px solid #E5E4E0; border-radius:8px; padding:16px; font-size:14px; color:#0C4651; line-height:1.6; font-style:italic;">
                      "${data.message}"
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Meta Footer -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:20px;">
                <tr>
                  <td style="font-size:12px; color:#777960;">
                    <strong style="color:#0C4651;">Date Received:</strong> ${dateFormatted}
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

        <!-- CTA Action Button -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="text-align:center;">
          <tr>
            <td>
              <a href="https://www.krtaskerdigital.com/admin/enquiries" target="_blank" style="display:inline-block; background-color:#E6FF2A; color:#191E00; font-size:15px; font-weight:700; text-decoration:none; padding:14px 32px; border-radius:8px; border:1px solid #C7E600; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                View Lead in Admin Dashboard →
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#0C4651; color:#FFFFFF; padding:28px 24px; text-align:center; font-size:12px;">
        <div style="font-size:18px; font-weight:700; color:#FFFFFF; margin-bottom:12px;">
          KR Tasker Digital
        </div>
        <div style="margin-bottom:16px; opacity:0.8;">
          <a href="https://www.krtaskerdigital.com/privacy" style="color:#FAF9F4; text-decoration:none; margin:0 8px;">Privacy Policy</a> |
          <a href="https://www.krtaskerdigital.com/terms" style="color:#FAF9F4; text-decoration:none; margin:0 8px;">Terms of Service</a>
        </div>
        <div style="opacity:0.6; font-size:11px;">
          © ${new Date().getFullYear()} KR Tasker Digital Ltd. All rights reserved.
        </div>
      </td>
    </tr>

  </table>
</body>
</html>
  `
}

export function renderClientConfirmationEmailHTML(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Enquiry Received - KR Tasker Digital</title>
</head>
<body style="margin:0; padding:40px 16px; background-color:#FAF9F4; font-family:'Hanken Grotesk', -apple-system, BlinkMacSystemFont, Arial, sans-serif; color:#1C1D1A;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background-color:#FAF9F4; border:1px solid #E5E4E0; border-radius:12px; overflow:hidden; border-collapse:collapse;">
    
    <!-- Top Header Bar -->
    <tr>
      <td style="padding:24px; background-color:#0C4651; text-align:center;">
        <h1 style="margin:0; font-size:24px; font-weight:700; color:#E6FF2A; letter-spacing:-0.02em;">
          KR Tasker Digital
        </h1>
        <p style="margin:4px 0 0 0; font-size:13px; color:#D2E7EB; text-transform:uppercase; letter-spacing:0.06em;">
          Web Engineering & Digital Growth Agency
        </p>
      </td>
    </tr>

    <!-- Body Content Area -->
    <tr>
      <td style="padding:36px 28px; background-color:#FFFFFF;">
        <h2 style="margin:0 0 16px 0; font-size:22px; font-weight:700; color:#0C4651;">
          Thank you for reaching out, ${name}!
        </h2>
        <p style="margin:0 0 16px 0; font-size:15px; color:#464833; line-height:1.6;">
          We have successfully received your project inquiry. Our technical strategy team is currently reviewing your requirements and will get back to you within <strong>24 business hours</strong>.
        </p>
        <p style="margin:0 0 24px 0; font-size:15px; color:#464833; line-height:1.6;">
          In the meantime, feel free to explore our recent client case studies and digital transformation projects on our official website.
        </p>

        <!-- CTA Action Button -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
          <tr>
            <td align="center">
              <a href="https://www.krtaskerdigital.com/work" target="_blank" style="display:inline-block; background-color:#0C4651; color:#E6FF2A; font-size:14px; font-weight:700; text-decoration:none; padding:14px 28px; border-radius:8px;">
                Explore Recent Case Studies →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#0C4651; color:#FFFFFF; padding:24px; text-align:center; font-size:12px;">
        <div style="font-size:16px; font-weight:700; color:#FFFFFF; margin-bottom:8px;">
          KR Tasker Digital
        </div>
        <div style="opacity:0.6; font-size:11px;">
          © ${new Date().getFullYear()} KR Tasker Digital Ltd. All rights reserved.
        </div>
      </td>
    </tr>

  </table>
</body>
</html>
  `
}
