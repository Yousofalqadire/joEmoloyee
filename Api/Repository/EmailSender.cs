using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Api.Interfaces;
using Api.Services;
using Microsoft.Extensions.Options;

namespace Api.Repository;

public class EmailSender:IEmailSender
{
        private readonly IOptions<EmailConfiguration> config;
    public EmailSender( IOptions<EmailConfiguration> _config)
    {
        this.config = _config;
    }

    public IOptions<EmailConfiguration> Config { get; }

    public void SendEmailAsync(string to, string subject, string body)
    {
        MailAddress  _to = new MailAddress(to);
        MailAddress from = new MailAddress(config.Value.From,"jordanian employee");
        MailMessage message = new MailMessage(from,_to);
        message.IsBodyHtml = true;
        message.Subject = subject;
            message.Body = body;
             SmtpClient smtpClient = new SmtpClient()
            {
                Host = config.Value.SmtpServer,
                Port = config.Value.Port,
                Credentials = new NetworkCredential(config.Value.Username,config.Value.Password),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Timeout = 20000

            };
            smtpClient.Send(message);
    }
}
