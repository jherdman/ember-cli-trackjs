import Ember from 'ember';

const Logger = Ember.Logger;

class ErrorHandler {
  constructor(reporter) {
    this.reporter = reporter;
  }

  report(error) {
    // If you pass a POJO to TrackJS, you'll see "[object Object]"
    // in reports instead of object content. :(

    // If the error is an Error object, we pass it directly.
    if (error instanceof Error) {
      this.reporter.track(error);
      Logger.error(error.stack);

      return;
    }

    // Otherwise, we have to serialize it manually in order
    // to see something better than "[object Object]".
    let serializedError;

    try {
      // This will work for both primitives and POJOs:
      serializedError = JSON.stringify(error, null, 2);
    } catch (e) {
      // Protecting against circular reference errors
      if (e.message = "Converting circular structure to JSON") {
        // We have an object with circular references and thus
        // we can't serialize it into JSON. We have to extract
        // info from it manually.
        serializedError =
          `Object with circular references passed instead of an instance of Error.
            error.message: ${error.message}
            error.name:    ${error.name}
          `;
      } else {
        // Some other error happened in JSON.stringify, rethrowing.
        throw e;
      }
    }

    this.reporter.track(serializedError);
    Logger.error(error);
  }
}

export default ErrorHandler;
