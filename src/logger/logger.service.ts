import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { stat, appendFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { cwd } from 'node:process';

@Injectable()
export class EnhancedLoggingService extends ConsoleLogger {
  private readonly logLevel: number;
  private readonly logFileMaxSizeBytes: number;
  private readonly logsFolderPath: string;
  private logFileName = 'application.log';
  private errorLogFileName = 'errors.log';

  constructor(private configService: ConfigService) {
    super();
    this.logLevel = parseInt(this.configService.get<string>('LOG_LEVEL'), 10);
    this.logFileMaxSizeBytes = parseInt(
      this.configService.get<string>('LOG_SIZE'),
      10,
    );

    this.logsFolderPath = path.join(
      cwd(),
      this.configService.get<string>('LOGS_DIR'),
    );
    this.initializeLogFiles();
  }

  private initializeLogFiles(): void {
    mkdirSync(this.logsFolderPath, { recursive: true });
    this.rotateLogFile(this.logFileName);
    this.rotateLogFile(this.errorLogFileName);
  }

  private rotateLogFile(fileName: string): void {
    const newFileName = this.generateFileName(fileName);
    const filePath = path.join(this.logsFolderPath, newFileName);
    appendFile(filePath, '', { flag: 'w' }).catch((error) =>
      console.error('Failed to create log file:', error),
    );
    if (fileName.includes('error')) {
      this.errorLogFileName = newFileName;
    } else {
      this.logFileName = newFileName;
    }
  }
  private timeStamp(): string {
    const now = new Date();
    const date = now
      .toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '-');

    const time = now
      .toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/:/g, '-');
    return `${date} ${time}`;
  }

  private generateFileName(baseName: string): string {
    const time = this.timeStamp();

    return `${time}-${baseName}`;
  }

  private async appendLogMessage(
    filePath: string,
    message: string,
  ): Promise<void> {
    const fileStats = await stat(filePath).catch(() => null);
    const isFileTooLarge = fileStats?.size > this.logFileMaxSizeBytes;

    if (isFileTooLarge) {
      this.rotateLogFile(
        filePath.includes('error') ? 'errors.log' : 'application.log',
      );
    }

    await appendFile(filePath, message, { encoding: 'utf-8' }).catch((error) =>
      console.error('Failed to append to log file:', error),
    );
  }

  override log(message: any, context?: string): void {
    if (this.logLevel >= 2) {
      context !== undefined ? super.log(message, context) : super.log(message);
      const formattedMsg = `[${this.timeStamp().replace(/-/g, ':')}] [${
        context || 'Not provided'
      }] ${message}\n`;

      this.appendLogMessage(
        path.join(this.logsFolderPath, this.logFileName),
        formattedMsg,
      );
    }
  }

  override error(message: any, trace?: string, context?: string): void {
    if (this.logLevel >= 0) {
      const formattedMessage = message
        ? typeof message === 'object'
          ? JSON.stringify(message, null, 2)
          : message
        : 'No message provided';
      const formattedTrace = trace || 'No trace';
      const formattedContext = context || 'Not provided';

      super.error(formattedMessage, formattedTrace, formattedContext);

      const logMessage = `[${this.timeStamp().replace(
        /-/g,
        ':',
      )}] [ERROR] [${formattedContext}] ${formattedMessage} - Trace: ${formattedTrace}\n`;

      this.appendLogMessage(
        path.join(this.logsFolderPath, this.errorLogFileName),
        logMessage,
      );
    }
  }

  override warn(message: any, context?: string): void {
    if (this.logLevel >= 1) {
      super.warn(message, context);
      const formattedMsg = `[${this.timeStamp().replace(/-/g, ':')}] [WARN] [${
        context || 'Context not provided'
      }] ${message}\n`;
      this.appendLogMessage(
        path.join(this.logsFolderPath, this.logFileName),
        formattedMsg,
      );
    }
  }
}