import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}
interface Attachments {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_KEY,
        }

    });

    constructor(    ) { }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const info = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });
            return true;
        } catch (error) {
            return false;
        }

    }
    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {

        const subject: string = 'Logs';
        const htmlBody = `<h3>Logs</h3>
            <p>Logs files</p>
            <p>Quis et minim non Lorem consequat officia fugiat cillum tempor quis. Enim nisi nostrud quis mollit nisi. Id duis ad qui deserunt duis enim nisi quis dolor laboris velit amet qui nostrud. Reprehenderit proident eiusmod proident non. Culpa laborum ex anim qui non pariatur tempor. Elit reprehenderit nulla id ex.</p>
            <P>Ver logs adjuntos</P>`


        const attachments: Attachments[] = [
            {
                filename: 'logs-low.log',
                path: 'logs/logs-low.log'
            },
            {
                filename: 'logs-medium.log',
                path: 'logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: 'logs/logs-high.log'
            },

        ]

        return this.sendEmail({ to, subject, htmlBody, attachments });
    }
}