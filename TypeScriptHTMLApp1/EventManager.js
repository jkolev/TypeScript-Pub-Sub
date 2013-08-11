var Events;
(function (Events) {
    var Subscription = (function () {
        function Subscription(id, callback) {
            this.id = id;
            this.callback = callback;
        }
        return Subscription;
    })();

    var Message = (function () {
        function Message(message) {
            this.message = message;
            this._subscriptions = [];
            this._nextId = 0;
        }
        Message.prototype.Subscribe = function (callback) {
            var subscription = new Subscription(this._nextId++, callback);
            this._subscriptions[subscription.id] = subscription;
            return subscription.id;
        };

        Message.prototype.Unsubscribe = function (id) {
            this._subscriptions[id] = undefined;
        };

        Message.prototype.Notify = function (payload) {
            var index;
            for (index = 0; index < this._subscriptions.length; index++) {
                if (this._subscriptions[index]) {
                    this._subscriptions[index].callback(payload);
                }
            }
        };
        return Message;
    })();

    var EventManager = (function () {
        function EventManager() {
            this._messages = {};
        }
        EventManager.prototype.Subscribe = function (message, callback) {
            var msg;
            msg = this._messages[message] || (this._messages[message] = new Message(message));

            return msg.Subscribe(callback);
        };

        EventManager.prototype.Unsubscribe = function (message, token) {
            if (this._messages[message]) {
                this._messages[message].Unsubscribe(token);
            }
        };

        EventManager.prototype.Publish = function (message, payload) {
            if (this._messages[message]) {
                this._messages[message].Notify(payload);
            }
        };
        return EventManager;
    })();
    Events.EventManager = EventManager;
})(Events || (Events = {}));
//# sourceMappingURL=EventManager.js.map
