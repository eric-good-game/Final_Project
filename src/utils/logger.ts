import { createLogger, format, transports } from 'winston';
const mode = process.env.NODE_ENV || 'dev';
const logger = createLogger({
  level: mode == 'dev' ? 'debug' : 'warning',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'your-service-name' },
  transports: [
    new transports.File({ filename: 'src/logs/error.log', level: 'error' }),
    new transports.File({ filename: 'src/logs/warning.log', level: 'warning' }),
    new transports.File({ filename: 'src/logs/info.log', level: 'info' }),
  ],
});

if (mode !== 'prod') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize({ level: true }),
        format.timestamp({
          format: 'DD/MM/YY HH:mm:ss',
        }),
        format.printf(
          (info) => `[${info.timestamp}] ${info.level}:  ${info.message}`,
        ),
      ),
    }),
  );
}

export default logger;
