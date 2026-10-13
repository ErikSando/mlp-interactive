class EngineEvent {
    handlers = new Map();

    hasHandler(handler) {
        return this.handlers.has(handler);
    }

    addHandler(handler) {
        this.handlers.set(handler, { once: false });
    }

    removeHandler(handler) {
        if (!this.handlers.delete(handler)) {
            console.error("Event handler does not exist, cannot remove.");
        }
    }

    once(handler) {
        this.handlers.set(handler, { once: true });
    }

    trigger = (...args) => {
        for (const [handler, info] of [...this.handlers]) {
            try {
                handler(...args);
            }
            catch (err) {
                console.error("Event handler error:", err);
            }

            if (info.once) {
                this.handlers.delete(handler);
            }
        }
    }
}