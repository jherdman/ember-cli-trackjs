import Service from '@ember/service';
import { TrackJS } from 'trackjs';

/**
 * Proxies all the agent methods, see https://docs.trackjs.com/browser-agent/sdk-reference/agent-methods/.
 */
export default class TrackJSService extends Service {
  console = {
    error() {
      return TrackJS.isInstalled() && TrackJS.console.error(...arguments);
    },

    warn() {
      return TrackJS.isInstalled() && TrackJS.console.warn(...arguments);
    },

    info() {
      return TrackJS.isInstalled() && TrackJS.console.info(...arguments);
    },

    log() {
      return TrackJS.isInstalled() && TrackJS.console.log(...arguments);
    },

    debug() {
      return TrackJS.isInstalled() && TrackJS.console.debug(...arguments);
    },
  };

  get version() {
    return TrackJS.version;
  }

  track() {
    return TrackJS.isInstalled() && TrackJS.track(...arguments);
  }

  install() {
    return !TrackJS.isInstalled() && TrackJS.install(...arguments);
  }

  isInstalled() {
    return TrackJS.isInstalled();
  }

  configure() {
    return TrackJS.isInstalled() && TrackJS.configure(...arguments);
  }

  attempt() {
    return TrackJS.isInstalled() && TrackJS.attempt(...arguments);
  }

  watch() {
    return TrackJS.isInstalled() && TrackJS.watch(...arguments);
  }

  watchAll() {
    return TrackJS.isInstalled() && TrackJS.watchAll(...arguments);
  }

  addMetadata() {
    return TrackJS.isInstalled() && TrackJS.addMetadata(...arguments);
  }

  removeMetadata() {
    return TrackJS.isInstalled() && TrackJS.removeMetadata(...arguments);
  }
}
