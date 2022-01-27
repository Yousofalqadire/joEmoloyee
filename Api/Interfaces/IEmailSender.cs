using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces;

    public interface IEmailSender
    {
        void SendEmailAsync(string to , string subject, string body);
    }
