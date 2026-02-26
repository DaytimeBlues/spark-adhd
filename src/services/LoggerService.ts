export type LogContext = Record<string, string | number | boolean | null | undefined>;

type ErrorLike = unknown;

const getErrorMessage = (error: ErrorLike): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unknown error';
};

const captureWithSentry = (error: ErrorLike, context?: LogContext) => {
  const sentry = (globalThis as {Sentry?: {captureException?: (exception: unknown, hint?: {tags?: LogContext}) => void}}).Sentry;

  if (sentry?.captureException) {
    sentry.captureException(error, {
      tags: context,
    });
  }
};

const LoggerService = {
  error(message: string, error?: ErrorLike, context?: LogContext) {
    const formattedContext = context ? ` | context: ${JSON.stringify(context)}` : '';
    const errorMessage = error ? ` | error: ${getErrorMessage(error)}` : '';

    console.error(`[Error] ${message}${errorMessage}${formattedContext}`);

    if (error) {
      captureWithSentry(error, context);
    }
  },

  warn(message: string, context?: LogContext) {
    const formattedContext = context ? ` | context: ${JSON.stringify(context)}` : '';
    console.warn(`[Warn] ${message}${formattedContext}`);
  },

  info(message: string, context?: LogContext) {
    const formattedContext = context ? ` | context: ${JSON.stringify(context)}` : '';
    console.info(`[Info] ${message}${formattedContext}`);
  },
};

export default LoggerService;
