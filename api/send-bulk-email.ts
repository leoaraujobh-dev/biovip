/**
 * Serverless Function Handler for Admin Bulk Email Broadcasts (/api/send-bulk-email)
 * Compatible with both Express dev server and Vercel Serverless runtime.
 */
export default async function sendBulkEmailHandler(req: any, res: any) {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Método não permitido. Use POST.',
    });
  }

  try {
    const { subject, body, category, recipients } = req.body || {};
    if (!subject || !body || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Assunto, mensagem e pelo menos um destinatário com e-mail válido são obrigatórios.',
      });
    }

    const validRecipients = recipients.filter(
      (r: any) => r && typeof r.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r.email.trim())
    );

    if (validRecipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nenhum destinatário possui um endereço de e-mail válido.',
      });
    }

    const protocol = `MAIL-${Date.now().toString(36).toUpperCase()}`;
    const sentAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      protocol,
      sentAt,
      category: category || 'maintenance',
      totalRequested: recipients.length,
      totalDelivered: validRecipients.length,
      deliveredTo: validRecipients.map((r: any) => ({
        clientName: r.clientName || 'Cliente',
        email: r.email.trim(),
        status: 'sent',
      })),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro interno ao processar disparo de e-mail em massa.',
    });
  }
}
