module Events {

    class Subscription {
        constructor(
            public id: number,
            public callback: (payload?: any) => void) {
        }
    }

    interface IMessage {
        Subscribe(callback: (payload?: any) => void): number;
        Unsubscribe(id: number): void;
        Notify(payload?: any): void;
    }


    class Message implements IMessage {

        private _subscriptions: Array<Subscription>;
        private _nextId: number;

        constructor(public message: string) {
            this._subscriptions = [];
            this._nextId = 0;
        }

        public Subscribe(callback: (payload?: any) => void) {
            var subscription = new Subscription(this._nextId++, callback);
            this._subscriptions[subscription.id] = subscription;
            return subscription.id;
        }

        public Unsubscribe(id: number) {
            this._subscriptions[id] = undefined;
        }

        public Notify(payload?: any) {
            var index;
            for (index = 0; index < this._subscriptions.length; index++) {
                if (this._subscriptions[index]) {
                    this._subscriptions[index].callback(payload);
                }
            }
        }
    }

    interface IMessageMap {
        [message: string]: Message;
    }

    export class EventManager {
        private _messages: IMessageMap;

        constructor() {
            this._messages = {}
        }

        Subscribe(message: string, callback: (payload?: any) => void) {
            var msg: IMessage;
            msg = this._messages[message] ||
                (this._messages[message] = new Message(message));

            return msg.Subscribe(callback);
        }

        Unsubscribe(message: string, token: number) {
            if (this._messages[message]) {
                this._messages[message].Unsubscribe(token);
            }
        }

        Publish(message: string, payload?: any) {
            if (this._messages[message]) {
                this._messages[message].Notify(payload);
            }
        }
    }
}